/**
 * Pedagogical Service
 * Advanced instructional decision-making and adaptive learning logic
 */

import {
  PedagogicalContext,
  InstructionalDecision,
  StudentStateVector,
  InteractionRecord,
  ConceptMastery
} from '../types/learner-model';
import { Concept, Question } from '../types/domain-model';

export class PedagogicalService {
  private static instance: PedagogicalService;

  // Decision thresholds
  private static readonly MASTERY_THRESHOLD = 0.7;
  private static readonly STRUGGLING_THRESHOLD = 0.4;
  private static readonly HINT_THRESHOLD = 0.6; // Below this, offer hints
  private static readonly CONSECUTIVE_ERRORS_LIMIT = 3;
  private static readonly CONSECUTIVE_CORRECT_FOR_ADVANCE = 3;
  private static readonly LOW_ENGAGEMENT_THRESHOLD = 0.4;
  private static readonly FATIGUE_TIME = 2700000; // 45 minutes

  private constructor() {}

  static getInstance(): PedagogicalService {
    if (!PedagogicalService.instance) {
      PedagogicalService.instance = new PedagogicalService();
    }
    return PedagogicalService.instance;
  }

  /**
   * Main decision algorithm - determines what to do next
   */
  makeInstructionalDecision(context: PedagogicalContext): InstructionalDecision {
    // Check for fatigue first
    if (this.shouldTakeBreak(context)) {
      return this.createBreakDecision(context);
    }

    // Check for severe struggling - need remediation
    if (this.isSeverelyStruggling(context)) {
      return this.createRemediationDecision(context);
    }

    // Check if ready to advance
    if (this.isReadyToAdvance(context)) {
      return this.createAdvanceDecision(context);
    }

    // Check if needs hints
    if (this.needsHint(context)) {
      return this.createHintDecision(context);
    }

    // Check if needs more examples
    if (this.needsMoreExamples(context)) {
      return this.createExampleDecision(context);
    }

    // Check if needs more practice
    if (this.needsMorePractice(context)) {
      return this.createPracticeDecision(context);
    }

    // Default: continue with current difficulty
    return this.createContinueDecision(context);
  }

  /**
   * Check if student should take a break
   */
  private shouldTakeBreak(context: PedagogicalContext): boolean {
    // Check time spent
    if (context.timeInCurrentConcept >= PedagogicalService.FATIGUE_TIME) {
      return true;
    }

    // Check for signs of fatigue (decreasing accuracy, increasing response time)
    const recentInteractions = context.recentInteractions.slice(-5);
    if (recentInteractions.length >= 5) {
      const firstHalf = recentInteractions.slice(0, 3);
      const secondHalf = recentInteractions.slice(3);

      const firstAccuracy = firstHalf.filter(i => i.isCorrect).length / firstHalf.length;
      const secondAccuracy = secondHalf.filter(i => i.isCorrect).length / secondHalf.length;

      // Significant drop in accuracy
      if (firstAccuracy - secondAccuracy > 0.4) {
        return true;
      }
    }

    // Check engagement score
    if (context.studentState.engagementScore < PedagogicalService.LOW_ENGAGEMENT_THRESHOLD) {
      return true;
    }

    return false;
  }

  /**
   * Check if student is severely struggling
   */
  private isSeverelyStruggling(context: PedagogicalContext): boolean {
    // Multiple consecutive errors
    if (context.consecutiveErrors >= PedagogicalService.CONSECUTIVE_ERRORS_LIMIT) {
      return true;
    }

    // Low mastery with high hint dependency
    const conceptMastery = context.studentState.conceptMasteryMap[context.currentConcept];
    if (conceptMastery) {
      if (
        conceptMastery.masteryProbability < PedagogicalService.STRUGGLING_THRESHOLD &&
        conceptMastery.hintDependency > 0.7
      ) {
        return true;
      }
    }

    // Consistent error patterns in this concept
    const conceptErrors = context.studentState.errorPatterns.filter(
      p => p.conceptId === context.currentConcept
    );
    if (conceptErrors.length > 0 && conceptErrors[0].frequency >= 3) {
      return true;
    }

    return false;
  }

  /**
   * Check if student is ready to advance
   */
  private isReadyToAdvance(context: PedagogicalContext): boolean {
    // Consecutive correct answers
    if (context.consecutiveCorrect >= PedagogicalService.CONSECUTIVE_CORRECT_FOR_ADVANCE) {
      const conceptMastery = context.studentState.conceptMasteryMap[context.currentConcept];
      if (conceptMastery && conceptMastery.masteryProbability >= PedagogicalService.MASTERY_THRESHOLD) {
        return true;
      }
    }

    return false;
  }

  /**
   * Check if student needs a hint
   */
  private needsHint(context: PedagogicalContext): boolean {
    // Recent error without hint
    const lastInteraction = context.recentInteractions[context.recentInteractions.length - 1];
    if (lastInteraction && !lastInteraction.isCorrect && lastInteraction.hintsUsed === 0) {
      const conceptMastery = context.studentState.conceptMasteryMap[context.currentConcept];
      if (!conceptMastery || conceptMastery.masteryProbability < PedagogicalService.HINT_THRESHOLD) {
        return true;
      }
    }

    return false;
  }

  /**
   * Check if student needs more examples
   */
  private needsMoreExamples(context: PedagogicalContext): boolean {
    const conceptMastery = context.studentState.conceptMasteryMap[context.currentConcept];
    
    // Low mastery but not making progress with practice
    if (conceptMastery && conceptMastery.masteryProbability < 0.5) {
      // Check if accuracy hasn't improved in last few attempts
      const recentAttempts = context.recentInteractions
        .filter(i => i.action === 'question_attempt')
        .slice(-4);
      
      if (recentAttempts.length >= 4) {
        const correctCount = recentAttempts.filter(i => i.isCorrect).length;
        if (correctCount <= 1) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Check if student needs more practice
   */
  private needsMorePractice(context: PedagogicalContext): boolean {
    const conceptMastery = context.studentState.conceptMasteryMap[context.currentConcept];
    
    if (conceptMastery) {
      // Moderate mastery - needs consolidation
      if (
        conceptMastery.masteryProbability >= 0.5 &&
        conceptMastery.masteryProbability < PedagogicalService.MASTERY_THRESHOLD
      ) {
        return true;
      }

      // Good accuracy but low confidence (high variance)
      if (
        conceptMastery.masteryProbability >= 0.6 &&
        conceptMastery.confidenceScore < 0.5
      ) {
        return true;
      }
    }

    return false;
  }

  /**
   * Create break decision
   */
  private createBreakDecision(context: PedagogicalContext): InstructionalDecision {
    return {
      action: 'take_break',
      reason: 'You\'ve been working hard! Time for a quick break to stay fresh.',
      difficulty: 'easy',
      estimatedTime: 300, // 5 min break
      supportLevel: 'minimal'
    };
  }

  /**
   * Create remediation decision
   */
  private createRemediationDecision(context: PedagogicalContext): InstructionalDecision {
    const conceptMastery = context.studentState.conceptMasteryMap[context.currentConcept];
    const errorPatterns = context.studentState.errorPatterns.filter(
      p => p.conceptId === context.currentConcept
    );

    let reason = 'Let\'s review the basics to build a stronger foundation.';
    if (errorPatterns.length > 0) {
      reason = `I notice you're having trouble with ${errorPatterns[0].errorType} errors. Let's work on that together.`;
    } else if (conceptMastery && conceptMastery.hintDependency > 0.7) {
      reason = 'Let\'s go through some examples step-by-step to build your confidence.';
    }

    return {
      action: 'remediate',
      reason,
      nextContent: `remedial_${context.currentConcept}`,
      difficulty: 'easy',
      estimatedTime: 600, // 10 minutes
      supportLevel: 'substantial'
    };
  }

  /**
   * Create advance decision
   */
  private createAdvanceDecision(context: PedagogicalContext): InstructionalDecision {
    return {
      action: 'advance',
      reason: 'Excellent work! You\'ve mastered this concept. Let\'s move forward!',
      difficulty: 'medium',
      estimatedTime: 420, // 7 minutes
      supportLevel: 'minimal'
    };
  }

  /**
   * Create hint decision
   */
  private createHintDecision(context: PedagogicalContext): InstructionalDecision {
    return {
      action: 'provide_hint',
      reason: 'Let me give you a hint to guide your thinking.',
      difficulty: 'medium',
      estimatedTime: 60, // 1 minute
      supportLevel: 'moderate'
    };
  }

  /**
   * Create example decision
   */
  private createExampleDecision(context: PedagogicalContext): InstructionalDecision {
    return {
      action: 'show_example',
      reason: 'Let\'s look at a detailed example to clarify this concept.',
      nextContent: `example_${context.currentConcept}`,
      difficulty: 'easy',
      estimatedTime: 300, // 5 minutes
      supportLevel: 'substantial'
    };
  }

  /**
   * Create practice decision
   */
  private createPracticeDecision(context: PedagogicalContext): InstructionalDecision {
    const conceptMastery = context.studentState.conceptMasteryMap[context.currentConcept];
    
    let difficulty: InstructionalDecision['difficulty'] = 'medium';
    if (conceptMastery) {
      if (conceptMastery.masteryProbability < 0.5) {
        difficulty = 'easy';
      } else if (conceptMastery.masteryProbability >= 0.65) {
        difficulty = 'hard';
      }
    }

    return {
      action: 'practice_more',
      reason: 'You\'re making good progress! Let\'s practice a bit more to strengthen your understanding.',
      difficulty,
      estimatedTime: 180, // 3 minutes
      supportLevel: 'moderate'
    };
  }

  /**
   * Create continue decision
   */
  private createContinueDecision(context: PedagogicalContext): InstructionalDecision {
    const conceptMastery = context.studentState.conceptMasteryMap[context.currentConcept];
    
    let difficulty: InstructionalDecision['difficulty'] = 'medium';
    if (conceptMastery) {
      if (conceptMastery.masteryProbability < 0.4) {
        difficulty = 'easy';
      } else if (conceptMastery.masteryProbability >= 0.6) {
        difficulty = 'hard';
      }
    }

    return {
      action: 'continue',
      reason: 'Keep going! You\'re learning well.',
      difficulty,
      estimatedTime: 240, // 4 minutes
      supportLevel: 'moderate'
    };
  }

  /**
   * Select appropriate question based on current mastery and decision
   */
  selectNextQuestion(
    availableQuestions: Question[],
    conceptMastery: ConceptMastery | undefined,
    decision: InstructionalDecision,
    attemptedQuestions: Set<string>
  ): Question | null {
    // Filter out already attempted questions
    const unattempted = availableQuestions.filter(q => !attemptedQuestions.has(q.id));
    
    if (unattempted.length === 0) {
      // All questions attempted - choose based on performance
      return this.selectReviewQuestion(availableQuestions, conceptMastery);
    }

    // Filter by difficulty
    const difficulty = decision.difficulty;
    let candidates = unattempted.filter(q => q.difficulty === difficulty);
    
    if (candidates.length === 0) {
      // No questions at exact difficulty - be flexible
      candidates = unattempted;
    }

    // Prefer questions that match common error patterns
    if (conceptMastery && decision.action === 'remediate') {
      // Select easier questions first
      candidates.sort((a, b) => {
        const difficultyOrder = { easy: 0, medium: 1, hard: 2 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      });
    }

    // Return first matching question
    return candidates[0] || availableQuestions[0];
  }

  /**
   * Select a question for review
   */
  private selectReviewQuestion(
    questions: Question[],
    conceptMastery: ConceptMastery | undefined
  ): Question | null {
    if (questions.length === 0) return null;

    // Select questions based on mastery level
    if (!conceptMastery || conceptMastery.masteryProbability < 0.5) {
      // Focus on easy questions for struggling students
      const easyQuestions = questions.filter(q => q.difficulty === 'easy');
      return easyQuestions[Math.floor(Math.random() * easyQuestions.length)] || questions[0];
    } else if (conceptMastery.masteryProbability >= 0.7) {
      // Challenge advanced students
      const hardQuestions = questions.filter(q => q.difficulty === 'hard');
      return hardQuestions[Math.floor(Math.random() * hardQuestions.length)] || questions[0];
    }

    // Medium difficulty for moderate mastery
    const mediumQuestions = questions.filter(q => q.difficulty === 'medium');
    return mediumQuestions[Math.floor(Math.random() * mediumQuestions.length)] || questions[0];
  }

  /**
   * Determine appropriate support level for content display
   */
  determineSupportLevel(
    conceptMastery: ConceptMastery | undefined,
    errorPatterns: number
  ): InstructionalDecision['supportLevel'] {
    if (!conceptMastery || conceptMastery.masteryProbability < 0.3 || errorPatterns >= 3) {
      return 'substantial';
    } else if (conceptMastery.masteryProbability < 0.6 || errorPatterns >= 1) {
      return 'moderate';
    }
    return 'minimal';
  }

  /**
   * Calculate optimal difficulty for next content
   */
  calculateOptimalDifficulty(
    conceptMastery: ConceptMastery | undefined,
    recentPerformance: InteractionRecord[]
  ): InstructionalDecision['difficulty'] {
    // No mastery data - start easy
    if (!conceptMastery) return 'easy';

    // Check recent performance
    const recentAttempts = recentPerformance.filter(i => i.action === 'question_attempt');
    if (recentAttempts.length >= 3) {
      const recentCorrect = recentAttempts.filter(i => i.isCorrect).length;
      const recentAccuracy = recentCorrect / recentAttempts.length;

      // Recent performance overrides historical if very different
      if (recentAccuracy >= 0.8 && conceptMastery.masteryProbability >= 0.6) {
        return 'hard';
      } else if (recentAccuracy <= 0.3) {
        return 'easy';
      }
    }

    // Use mastery level
    if (conceptMastery.masteryProbability < 0.4) return 'easy';
    if (conceptMastery.masteryProbability >= 0.7) return 'hard';
    return 'medium';
  }

  /**
   * Determine if concept prerequisites are met
   */
  checkPrerequisites(
    prerequisites: string[],
    conceptMasteryMap: Record<string, ConceptMastery>
  ): { met: boolean; missing: string[] } {
    const missing: string[] = [];

    prerequisites.forEach(prereqId => {
      const mastery = conceptMasteryMap[prereqId];
      if (!mastery || mastery.masteryProbability < 0.6) {
        missing.push(prereqId);
      }
    });

    return {
      met: missing.length === 0,
      missing
    };
  }

  /**
   * Generate personalized encouragement message
   */
  generateEncouragement(
    conceptMastery: ConceptMastery | undefined,
    consecutiveCorrect: number,
    consecutiveErrors: number
  ): string {
    if (consecutiveCorrect >= 3) {
      return '🌟 You\'re on fire! Great job!';
    } else if (consecutiveCorrect >= 2) {
      return '👍 Excellent! Keep it up!';
    } else if (consecutiveErrors >= 2) {
      return '💪 Don\'t give up! Learning takes practice.';
    } else if (conceptMastery && conceptMastery.masteryLevel === 'mastered') {
      return '🎉 You\'ve mastered this concept!';
    } else if (conceptMastery && conceptMastery.masteryLevel === 'proficient') {
      return '⭐ You\'re doing really well!';
    } else if (conceptMastery && conceptMastery.masteryLevel === 'developing') {
      return '📈 You\'re making steady progress!';
    }
    return '🎯 Keep learning! You\'re doing great!';
  }
}

export const pedagogicalService = PedagogicalService.getInstance();
