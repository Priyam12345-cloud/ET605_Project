/**
 * Adaptive Question Selection Service
 * Selects appropriate questions based on student performance
 * Implements: same-level practice on error, escalation on success, help after 3 failures
 */

import { Question } from '../types/domain-model';
import { InteractionRecord } from '../types/learner-model';
import { allQuestionBanks } from '../data/comprehensive-questions';

export interface AdaptiveQuestionContext {
  conceptId: string;
  studentMasteryLevel: 'novice' | 'developing' | 'proficient' | 'mastered';
  recentInteractions: InteractionRecord[]; // Last 5-10 interactions on this concept
  consecutiveCorrect: number;
  consecutiveErrors: number;
  totalAttemptsOnConcept: number;
  previouslyUsedQuestionIds: Set<string>;
}

export interface QuestionSelectionResult {
  questions: Question[];
  action: 'provide_practice_same_level' | 'advance_difficulty' | 'provide_help_flashcard' | 'mastery_assessment';
  reason: string;
  recommendedDifficulty: 'easy' | 'medium' | 'hard';
}

export class AdaptiveQuestionSelectionService {
  private static instance: AdaptiveQuestionSelectionService;
  
  // Thresholds
  private static readonly ERRORS_BEFORE_HELP = 3; // After 3 errors at same level, provide help
  private static readonly SUCCESSES_FOR_ADVANCE = 2; // 2 consecutive correct to advance
  private static readonly MINIMUM_SIMILAR_QUESTIONS = 2; // At least 2 similar questions at same level

  private constructor() {}

  static getInstance(): AdaptiveQuestionSelectionService {
    if (!AdaptiveQuestionSelectionService.instance) {
      AdaptiveQuestionSelectionService.instance = new AdaptiveQuestionSelectionService();
    }
    return AdaptiveQuestionSelectionService.instance;
  }

  /**
   * Select next question(s) based on adaptive logic
   */
  selectNextQuestions(context: AdaptiveQuestionContext): QuestionSelectionResult {
    // Analyze recent performance
    const recentPerformance = this.analyzeRecentPerformance(context.recentInteractions);

    // Decision logic
    if (context.consecutiveErrors >= AdaptiveQuestionSelectionService.ERRORS_BEFORE_HELP) {
      // Student struggling - provide help/remediation
      return this.selectHelpQuestions(context, recentPerformance);
    }

    if (context.consecutiveCorrect >= AdaptiveQuestionSelectionService.SUCCESSES_FOR_ADVANCE) {
      // Student ready to advance
      return this.selectAdvancedQuestions(context, recentPerformance);
    }

    if (context.studentMasteryLevel === 'mastered' && context.totalAttemptsOnConcept >= 8) {
      // Student has mastered but completed few attempts - give mastery check question
      return this.selectMasteryAssessmentQuestion(context, recentPerformance);
    }

    // Default: provide similar question at current level
    return this.selectPracticeSameLevelQuestions(context, recentPerformance);
  }

  /**
   * Analyze recent performance pattern
   */
  private analyzeRecentPerformance(interactions: InteractionRecord[]): {
    recentAccuracy: number;
    errorPattern: string | null;
    performanceTrend: 'improving' | 'stable' | 'declining';
  } {
    if (interactions.length === 0) {
      return { recentAccuracy: 0.5, errorPattern: null, performanceTrend: 'stable' };
    }

    const recent = interactions.slice(-5);
    const correct = recent.filter(i => i.isCorrect).length;
    const recentAccuracy = correct / recent.length;

    // Detect pattern
    let errorPattern = null;
    const errors = recent.filter(i => !i.isCorrect && i.errorType);
    if (errors.length > 0) {
      const errorCounts: Record<string, number> = {};
      errors.forEach(e => {
        errorCounts[e.errorType || 'unknown'] = (errorCounts[e.errorType || 'unknown'] || 0) + 1;
      });
      errorPattern = Object.entries(errorCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
    }

    // Trend analysis
    let performanceTrend: 'improving' | 'stable' | 'declining' = 'stable';
    if (recent.length >= 3) {
      const first3 = recent.slice(0, 3).filter(i => i.isCorrect).length / 3;
      const last3 = recent.slice(-3).filter(i => i.isCorrect).length / 3;
      if (last3 > first3 + 0.2) performanceTrend = 'improving';
      else if (last3 < first3 - 0.2) performanceTrend = 'declining';
    }

    return { recentAccuracy, errorPattern, performanceTrend };
  }

  /**
   * Select practice questions at the same difficulty level
   */
  private selectPracticeSameLevelQuestions(
    context: AdaptiveQuestionContext,
    performance: { recentAccuracy: number; errorPattern: string | null; performanceTrend: string }
  ): QuestionSelectionResult {
    const difficulty = this.mapMasteryToDifficulty(context.studentMasteryLevel);
    const questions = this.getQuestionsForConcept(context.conceptId, difficulty);
    
    // Filter out already used questions
    const availableQuestions = questions.filter(q => !context.previouslyUsedQuestionIds.has(q.id));

    // If we've used most questions at this level, rotate back to used ones
    const questionsToReturn = availableQuestions.length > 0 
      ? availableQuestions.slice(0, AdaptiveQuestionSelectionService.MINIMUM_SIMILAR_QUESTIONS)
      : questions.slice(0, AdaptiveQuestionSelectionService.MINIMUM_SIMILAR_QUESTIONS);

    return {
      questions: questionsToReturn,
      action: 'provide_practice_same_level',
      reason: `Practice more similar questions at ${difficulty} level. You're making progress!`,
      recommendedDifficulty: difficulty
    };
  }

  /**
   * Select advanced questions (next difficulty level)
   */
  private selectAdvancedQuestions(
    context: AdaptiveQuestionContext,
    performance: { recentAccuracy: number; errorPattern: string | null; performanceTrend: string }
  ): QuestionSelectionResult {
    const currentDifficulty = this.mapMasteryToDifficulty(context.studentMasteryLevel);
    const nextDifficulty = this.getNextDifficulty(currentDifficulty);

    if (nextDifficulty === currentDifficulty) {
      // Already at highest difficulty
      return this.selectPracticeSameLevelQuestions(context, performance);
    }

    const questions = this.getQuestionsForConcept(context.conceptId, nextDifficulty);
    const availableQuestions = questions.filter(q => !context.previouslyUsedQuestionIds.has(q.id));

    const questionsToReturn = availableQuestions.length > 0
      ? availableQuestions.slice(0, 1)
      : questions.slice(0, 1);

    return {
      questions: questionsToReturn,
      action: 'advance_difficulty',
      reason: `Great job! You're ready for ${nextDifficulty} level questions. Challenge yourself!`,
      recommendedDifficulty: nextDifficulty
    };
  }

  /**
   * Select help/remediation questions
   */
  private selectHelpQuestions(
    context: AdaptiveQuestionContext,
    performance: { recentAccuracy: number; errorPattern: string | null; performanceTrend: string }
  ): QuestionSelectionResult {
    const difficulty = this.mapMasteryToDifficulty(context.studentMasteryLevel);
    
    // Get easier alternative if not already at easy
    const targetDifficulty = difficulty === 'easy' ? 'easy' : 'easy';
    const questions = this.getQuestionsForConcept(context.conceptId, targetDifficulty);
    
    const availableQuestions = questions.filter(q => !context.previouslyUsedQuestionIds.has(q.id));
    const questionsToReturn = availableQuestions.length > 0
      ? availableQuestions.slice(0, 2)
      : questions.slice(0, 2);

    return {
      questions: questionsToReturn,
      action: 'provide_help_flashcard',
      reason: `You've had difficulty with this concept. Let's review with simpler questions and study materials. Take your time!`,
      recommendedDifficulty: 'easy'
    };
  }

  /**
   * Select mastery assessment question (different from practice)
   * Used to verify student actually understands, not just memorized
   */
  private selectMasteryAssessmentQuestion(
    context: AdaptiveQuestionContext,
    performance: { recentAccuracy: number; errorPattern: string | null; performanceTrend: string }
  ): QuestionSelectionResult {
    const difficulty = this.mapMasteryToDifficulty(context.studentMasteryLevel);
    
    // Get questions at mastered level
    const allQuestions = this.getQuestionsForConcept(context.conceptId, difficulty);
    
    // Select questions that haven't been used yet for assessment
    const unusedForAssessment = allQuestions.filter(q => 
      !context.previouslyUsedQuestionIds.has(q.id) || context.previouslyUsedQuestionIds.size < 3
    );

    // If we've exhausted new questions, pick the hardest ones to verify mastery
    const questionsToReturn = unusedForAssessment.length > 0
      ? [unusedForAssessment[Math.floor(Math.random() * Math.min(3, unusedForAssessment.length))]].slice(0, 1)
      : [allQuestions[Math.floor(Math.random() * allQuestions.length)]].slice(0, 1);

    return {
      questions: questionsToReturn,
      action: 'mastery_assessment',
      reason: `Mastery verification: Answer this different question to confirm you truly understand the concept.`,
      recommendedDifficulty: difficulty
    };
  }

  /**
   * Map student mastery level to difficulty
   */
  private mapMasteryToDifficulty(masteryLevel: 'novice' | 'developing' | 'proficient' | 'mastered'): 'easy' | 'medium' | 'hard' {
    switch (masteryLevel) {
      case 'novice': return 'easy';
      case 'developing': return 'easy';
      case 'proficient': return 'medium';
      case 'mastered': return 'hard';
      default: return 'easy';
    }
  }

  /**
   * Get next difficulty level
   */
  private getNextDifficulty(current: 'easy' | 'medium' | 'hard'): 'easy' | 'medium' | 'hard' {
    switch (current) {
      case 'easy': return 'medium';
      case 'medium': return 'hard';
      case 'hard': return 'hard'; // Already at max
      default: return 'easy';
    }
  }

  /**
   * Get questions for a concept at a specific difficulty
   */
  private getQuestionsForConcept(conceptId: string, difficulty: 'easy' | 'medium' | 'hard'): Question[] {
    const key = `${conceptId}-${difficulty}`;
    return (allQuestionBanks[key as keyof typeof allQuestionBanks] as Question[]) || [];
  }

  /**
   * Get total available questions for a concept across all difficulties
   */
  getAvailableQuestionsForConcept(conceptId: string): Question[] {
    const questions: Question[] = [];
    const difficulties: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];
    
    difficulties.forEach(diff => {
      const key = `${conceptId}-${diff}`;
      const qs = (allQuestionBanks[key as keyof typeof allQuestionBanks] as Question[]) || [];
      questions.push(...qs);
    });

    return questions;
  }
}

export const adaptiveQuestionSelectionService = AdaptiveQuestionSelectionService.getInstance();
