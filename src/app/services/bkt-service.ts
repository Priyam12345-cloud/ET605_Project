/**
 * Bayesian Knowledge Tracing Service
 * Probabilistic modeling of student knowledge
 */

import { BKTParameters, BKTState } from '../types/gamification';

export class BayesianKnowledgeTracingService {
  private static instance: BayesianKnowledgeTracingService;

  // Default BKT parameters (can be tuned per concept)
  private static readonly DEFAULT_PARAMS: BKTParameters = {
    pInit: 0.1,    // Initially 10% chance student knows concept
    pLearn: 0.3,   // 30% chance of learning with each practice
    pGuess: 0.25,  // 25% chance of guessing correctly (for 4-option MCQ)
    pSlip: 0.1     // 10% chance of making mistake despite knowing
  };

  private constructor() {}

  static getInstance(): BayesianKnowledgeTracingService {
    if (!BayesianKnowledgeTracingService.instance) {
      BayesianKnowledgeTracingService.instance = new BayesianKnowledgeTracingService();
    }
    return BayesianKnowledgeTracingService.instance;
  }

  /**
   * Initialize BKT state for a new concept
   */
  initializeBKT(conceptId: string, customParams?: Partial<BKTParameters>): BKTState {
    const params = {
      ...BayesianKnowledgeTracingService.DEFAULT_PARAMS,
      ...customParams
    };

    return {
      conceptId,
      knowledgeProbability: params.pInit,
      parameters: params,
      updateHistory: []
    };
  }

  /**
   * Update knowledge probability based on student response
   * Uses standard BKT update equations
   */
  updateKnowledge(
    currentState: BKTState,
    wasCorrect: boolean,
    hintsUsed: number = 0
  ): BKTState {
    const { knowledgeProbability: pLn, parameters } = currentState;
    const { pLearn, pGuess, pSlip } = parameters;

    // Adjust guess probability based on hints used
    // More hints = higher effective guess probability
    const effectivePGuess = Math.min(0.9, pGuess + (hintsUsed * 0.15));

    // Step 1: Calculate P(Ln+1 | Ln) - probability of knowing after this opportunity
    // P(Ln+1 | Ln) = P(Ln) + (1 - P(Ln)) * P(T)
    const pLnPlus1GivenLn = pLn + (1 - pLn) * pLearn;

    // Step 2: Calculate P(correct | Ln) using law of total probability
    // P(correct) = P(correct | knows) * P(knows) + P(correct | doesn't know) * P(doesn't know)
    // P(correct | knows) = 1 - P(slip)
    // P(correct | doesn't know) = P(guess)
    const pCorrect = (1 - pSlip) * pLn + effectivePGuess * (1 - pLn);

    // Step 3: Update based on observed response using Bayes' theorem
    let pLnPlus1: number;

    if (wasCorrect) {
      // P(Ln+1 | correct) = P(correct | Ln+1) * P(Ln+1) / P(correct)
      // Simplified: P(Ln+1 | correct) = [(1 - pSlip) * pLnPlus1GivenLn] / pCorrect
      pLnPlus1 = ((1 - pSlip) * pLnPlus1GivenLn) / pCorrect;
    } else {
      // P(Ln+1 | incorrect) = P(incorrect | Ln+1) * P(Ln+1) / P(incorrect)
      // P(incorrect) = 1 - P(correct)
      // P(incorrect | knows) = P(slip)
      // P(incorrect | doesn't know) = 1 - P(guess)
      const pIncorrect = pSlip * pLn + (1 - effectivePGuess) * (1 - pLn);
      pLnPlus1 = (pSlip * pLnPlus1GivenLn) / pIncorrect;
    }

    // Ensure probability stays in valid range [0, 1]
    pLnPlus1 = Math.max(0, Math.min(1, pLnPlus1));

    // Create updated state
    return {
      ...currentState,
      knowledgeProbability: pLnPlus1,
      updateHistory: [
        ...currentState.updateHistory,
        {
          timestamp: Date.now(),
          previousP: pLn,
          newP: pLnPlus1,
          wasCorrect
        }
      ]
    };
  }

  /**
   * Predict probability of correct answer
   */
  predictCorrectness(state: BKTState): number {
    const { knowledgeProbability, parameters } = state;
    const { pGuess, pSlip } = parameters;

    // P(correct) = P(knows) * P(correct|knows) + P(doesn't know) * P(correct|doesn't know)
    return knowledgeProbability * (1 - pSlip) + (1 - knowledgeProbability) * pGuess;
  }

  /**
   * Check if concept is mastered based on BKT probability
   */
  isMastered(state: BKTState, threshold: number = 0.95): boolean {
    return state.knowledgeProbability >= threshold;
  }

  /**
   * Get learning progress as percentage
   */
  getLearningProgress(state: BKTState): number {
    // Scale from pInit to 1.0
    const { knowledgeProbability, parameters } = state;
    const range = 1.0 - parameters.pInit;
    const progress = (knowledgeProbability - parameters.pInit) / range;
    return Math.max(0, Math.min(100, progress * 100));
  }

  /**
   * Estimate questions needed to reach mastery
   */
  estimateQuestionsToMastery(
    state: BKTState,
    targetProbability: number = 0.95
  ): number {
    const { knowledgeProbability, parameters } = state;
    const { pLearn } = parameters;

    if (knowledgeProbability >= targetProbability) {
      return 0;
    }

    // Simplified estimation assuming consistent performance
    // This is a rough approximation
    let currentP = knowledgeProbability;
    let questions = 0;
    const maxQuestions = 50; // Safety limit

    while (currentP < targetProbability && questions < maxQuestions) {
      currentP = currentP + (1 - currentP) * pLearn;
      questions++;
    }

    return questions;
  }

  /**
   * Adjust BKT parameters based on observed performance
   * (Adaptive parameter tuning)
   */
  tuneParameters(state: BKTState): BKTParameters {
    const history = state.updateHistory;
    
    if (history.length < 5) {
      return state.parameters;
    }

    // Analyze recent performance
    const recentHistory = history.slice(-10);
    const correctCount = recentHistory.filter(h => h.wasCorrect).length;
    const accuracy = correctCount / recentHistory.length;

    // Adjust pLearn based on improvement rate
    const improvements = recentHistory.filter(h => h.newP > h.previousP).length;
    const improvementRate = improvements / recentHistory.length;

    let newPLearn = state.parameters.pLearn;
    if (improvementRate > 0.7) {
      // Fast learner - increase learning rate slightly
      newPLearn = Math.min(0.5, state.parameters.pLearn * 1.1);
    } else if (improvementRate < 0.3) {
      // Slower progress - decrease learning rate
      newPLearn = Math.max(0.1, state.parameters.pLearn * 0.9);
    }

    // Adjust pGuess based on observed guessing patterns
    // If accuracy is around 0.25 with low knowledge, might be guessing
    let newPGuess = state.parameters.pGuess;
    if (state.knowledgeProbability < 0.3 && accuracy > 0.2 && accuracy < 0.35) {
      newPGuess = accuracy;
    }

    return {
      ...state.parameters,
      pLearn: newPLearn,
      pGuess: newPGuess
    };
  }

  /**
   * Get detailed BKT insights for display
   */
  getBKTInsights(state: BKTState): {
    knowledgeLevel: 'novice' | 'learning' | 'proficient' | 'mastered';
    confidence: number;
    predictedAccuracy: number;
    questionsToMastery: number;
    learningTrend: 'improving' | 'stable' | 'declining';
  } {
    const { knowledgeProbability, updateHistory } = state;

    // Determine knowledge level
    let knowledgeLevel: 'novice' | 'learning' | 'proficient' | 'mastered';
    if (knowledgeProbability < 0.3) knowledgeLevel = 'novice';
    else if (knowledgeProbability < 0.7) knowledgeLevel = 'learning';
    else if (knowledgeProbability < 0.95) knowledgeLevel = 'proficient';
    else knowledgeLevel = 'mastered';

    // Calculate confidence based on consistency
    const recentHistory = updateHistory.slice(-5);
    const variance = recentHistory.length > 1 
      ? recentHistory.reduce((sum, h) => {
          const avg = recentHistory.reduce((s, h2) => s + h2.newP, 0) / recentHistory.length;
          return sum + Math.pow(h.newP - avg, 2);
        }, 0) / recentHistory.length
      : 0;
    const confidence = Math.max(0, Math.min(1, 1 - Math.sqrt(variance)));

    // Predicted accuracy
    const predictedAccuracy = this.predictCorrectness(state);

    // Questions to mastery
    const questionsToMastery = this.estimateQuestionsToMastery(state);

    // Learning trend
    let learningTrend: 'improving' | 'stable' | 'declining' = 'stable';
    if (updateHistory.length >= 3) {
      const recent3 = updateHistory.slice(-3);
      const improvements = recent3.filter(h => h.newP > h.previousP).length;
      const declines = recent3.filter(h => h.newP < h.previousP).length;
      
      if (improvements >= 2) learningTrend = 'improving';
      else if (declines >= 2) learningTrend = 'declining';
    }

    return {
      knowledgeLevel,
      confidence,
      predictedAccuracy,
      questionsToMastery,
      learningTrend
    };
  }
}

export const bktService = BayesianKnowledgeTracingService.getInstance();
