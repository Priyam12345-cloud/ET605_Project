/**
 * Learner Model Service
 * Comprehensive student state tracking and knowledge modeling
 */

import {
  LearnerState,
  StudentStateVector,
  InteractionRecord,
  ConceptMastery,
  ErrorPattern,
  ResponseTimeData,
  ReliabilityMetrics,
  KnowledgeUpdate,
  LearningSession
} from '../types/learner-model';

export class LearnerModelService {
  private static STORAGE_KEY = 'its_learner_state';
  private static instance: LearnerModelService;
  
  // Reliability thresholds based on response time
  private static readonly FAST_THRESHOLD = 30000; // 30 seconds
  private static readonly MEDIUM_THRESHOLD = 90000; // 90 seconds
  
  // Mastery calculation weights
  private static readonly ACCURACY_WEIGHT = 0.5;
  private static readonly CONSISTENCY_WEIGHT = 0.2;
  private static readonly SPEED_WEIGHT = 0.15;
  private static readonly HINT_PENALTY_WEIGHT = 0.15;

  private constructor() {}

  static getInstance(): LearnerModelService {
    if (!LearnerModelService.instance) {
      LearnerModelService.instance = new LearnerModelService();
    }
    return LearnerModelService.instance;
  }

  /**
   * Initialize a new learner state
   */
  initializeLearnerState(studentId: string): LearnerState {
    const now = Date.now();
    const initialState: LearnerState = {
      studentId,
      stateVector: this.createInitialStateVector(),
      interactionHistory: [],
      sessions: [],
      knowledgeUpdates: [],
      createdAt: now,
      lastUpdated: now
    };
    
    this.saveLearnerState(initialState);
    return initialState;
  }

  /**
   * Create initial state vector with default values
   */
  private createInitialStateVector(): StudentStateVector {
    return {
      masteryProbabilities: {
        dataUnderstanding: 0,
        frequencyTables: 0,
        graphicalRepresentation: 0,
        centralTendency: 0,
        dataInterpretation: 0,
        dataCollection: 0
      },
      averageResponseTime: 0,
      hintDependencyRate: 0,
      errorPatterns: [],
      reliabilityScore: {
        overallScore: 0.5,
        consistencyScore: 0.5,
        speedAccuracyRatio: 0.5,
        timeRangeReliability: {
          fast: 0.5,
          medium: 0.5,
          slow: 0.5
        }
      },
      conceptMasteryMap: {},
      learningVelocity: 0,
      engagementScore: 0.5,
      persistenceLevel: 0.5,
      totalTimeSpent: 0,
      sessionsCompleted: 0,
      lastActive: Date.now()
    };
  }

  /**
   * Record a student interaction and update state
   */
  recordInteraction(
    learnerState: LearnerState,
    conceptId: string,
    questionId: string,
    action: InteractionRecord['action'],
    response?: string,
    isCorrect?: boolean,
    responseTime?: number,
    errorType?: string
  ): LearnerState {
    const now = Date.now();
    
    // Get current concept mastery
    const currentMastery = learnerState.stateVector.conceptMasteryMap[conceptId];
    const attemptNumber = currentMastery ? currentMastery.attemptCount + 1 : 1;
    
    // Count hints used in recent interactions for this question
    const hintsUsed = learnerState.interactionHistory.filter(
      i => i.questionId === questionId && i.action === 'hint_requested'
    ).length;
    
    // Create interaction record
    const interaction: InteractionRecord = {
      id: `int_${now}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: now,
      conceptId,
      questionId,
      action,
      response,
      isCorrect,
      responseTime,
      hintsUsed,
      attemptNumber,
      errorType
    };
    
    // Add to history
    const updatedHistory = [...learnerState.interactionHistory, interaction];
    
    // Update state vector based on interaction
    const updatedStateVector = this.updateStateVector(
      learnerState.stateVector,
      interaction,
      updatedHistory
    );
    
    // Check for knowledge updates
    const knowledgeUpdate = this.checkKnowledgeUpdate(
      conceptId,
      currentMastery,
      updatedStateVector.conceptMasteryMap[conceptId]
    );
    
    const updatedKnowledgeUpdates = knowledgeUpdate
      ? [...learnerState.knowledgeUpdates, knowledgeUpdate]
      : learnerState.knowledgeUpdates;
    
    const updatedState: LearnerState = {
      ...learnerState,
      stateVector: updatedStateVector,
      interactionHistory: updatedHistory,
      knowledgeUpdates: updatedKnowledgeUpdates,
      lastUpdated: now
    };
    
    this.saveLearnerState(updatedState);
    return updatedState;
  }

  /**
   * Update the state vector based on new interaction
   */
  private updateStateVector(
    stateVector: StudentStateVector,
    interaction: InteractionRecord,
    fullHistory: InteractionRecord[]
  ): StudentStateVector {
    const conceptId = interaction.conceptId;
    
    // Update concept mastery
    const updatedConceptMastery = this.updateConceptMastery(
      stateVector.conceptMasteryMap[conceptId],
      interaction,
      fullHistory.filter(i => i.conceptId === conceptId)
    );
    
    const updatedConceptMap = {
      ...stateVector.conceptMasteryMap,
      [conceptId]: updatedConceptMastery
    };
    
    // Update global metrics
    const questionInteractions = fullHistory.filter(
      i => i.action === 'question_attempt' && i.responseTime
    );
    
    const avgResponseTime = questionInteractions.length > 0
      ? questionInteractions.reduce((sum, i) => sum + (i.responseTime || 0), 0) / questionInteractions.length
      : 0;
    
    const hintDependency = this.calculateHintDependency(fullHistory);
    const reliability = this.calculateReliabilityMetrics(questionInteractions);
    const errorPatterns = this.detectErrorPatterns(fullHistory);
    const learningVelocity = this.calculateLearningVelocity(fullHistory, updatedConceptMap);
    const engagementScore = this.calculateEngagementScore(fullHistory);
    const persistenceLevel = this.calculatePersistenceLevel(fullHistory);
    
    // Update domain-specific mastery probabilities
    const masteryProbabilities = this.calculateDomainMasteryProbabilities(updatedConceptMap);
    
    // Calculate total time spent
    const totalTimeSpent = questionInteractions.reduce(
      (sum, i) => sum + (i.responseTime || 0),
      0
    ) + fullHistory.filter(
      i => ['video_watched', 'example_viewed', 'game_played'].includes(i.action)
    ).length * 180000; // Estimate 3 min per content view
    
    return {
      ...stateVector,
      masteryProbabilities,
      averageResponseTime: avgResponseTime,
      hintDependencyRate: hintDependency,
      errorPatterns,
      reliabilityScore: reliability,
      conceptMasteryMap: updatedConceptMap,
      learningVelocity,
      engagementScore,
      persistenceLevel,
      totalTimeSpent,
      lastActive: Date.now()
    };
  }

  /**
   * Update concept mastery based on performance
   */
  private updateConceptMastery(
    currentMastery: ConceptMastery | undefined,
    interaction: InteractionRecord,
    conceptHistory: InteractionRecord[]
  ): ConceptMastery {
    const attempts = conceptHistory.filter(i => i.action === 'question_attempt');
    const correctAttempts = attempts.filter(i => i.isCorrect);
    
    const attemptCount = attempts.length;
    const correctCount = correctAttempts.length;
    const accuracy = attemptCount > 0 ? correctCount / attemptCount : 0;
    
    // Calculate average response time for this concept
    const timedAttempts = attempts.filter(i => i.responseTime);
    const avgResponseTime = timedAttempts.length > 0
      ? timedAttempts.reduce((sum, i) => sum + (i.responseTime || 0), 0) / timedAttempts.length
      : 0;
    
    // Calculate hint dependency for this concept
    const totalHints = conceptHistory.filter(i => i.action === 'hint_requested').length;
    const hintDependency = attemptCount > 0 ? totalHints / attemptCount : 0;
    
    // Calculate consistency score (lower variance = higher consistency)
    const consistencyScore = this.calculateConsistencyScore(timedAttempts);
    
    // Calculate speed-accuracy ratio
    const speedAccuracyRatio = this.calculateSpeedAccuracyRatio(
      avgResponseTime,
      accuracy
    );
    
    // Calculate overall mastery probability using multiple factors
    const masteryProbability = this.calculateMasteryProbability(
      accuracy,
      consistencyScore,
      speedAccuracyRatio,
      hintDependency
    );
    
    // Determine mastery level
    const masteryLevel = this.determineMasteryLevel(masteryProbability);
    
    return {
      conceptId: interaction.conceptId,
      masteryProbability,
      attemptCount,
      correctCount,
      avgResponseTime,
      hintDependency,
      lastAttempt: interaction.timestamp,
      masteryLevel,
      confidenceScore: consistencyScore
    };
  }

  /**
   * Calculate mastery probability using weighted factors
   */
  private calculateMasteryProbability(
    accuracy: number,
    consistency: number,
    speedAccuracy: number,
    hintDependency: number
  ): number {
    const accuracyScore = accuracy * LearnerModelService.ACCURACY_WEIGHT;
    const consistencyScore = consistency * LearnerModelService.CONSISTENCY_WEIGHT;
    const speedScore = speedAccuracy * LearnerModelService.SPEED_WEIGHT;
    const hintPenalty = (1 - hintDependency) * LearnerModelService.HINT_PENALTY_WEIGHT;
    
    const totalScore = accuracyScore + consistencyScore + speedScore + hintPenalty;
    return Math.max(0, Math.min(1, totalScore));
  }

  /**
   * Calculate consistency score based on response time variance
   */
  private calculateConsistencyScore(timedInteractions: InteractionRecord[]): number {
    if (timedInteractions.length < 2) return 0.5;
    
    const times = timedInteractions.map(i => i.responseTime || 0);
    const mean = times.reduce((a, b) => a + b, 0) / times.length;
    const variance = times.reduce((sum, time) => sum + Math.pow(time - mean, 2), 0) / times.length;
    const stdDev = Math.sqrt(variance);
    
    // Lower standard deviation = higher consistency
    // Normalize to 0-1 scale (assuming max stdDev of 60000ms = 1 minute)
    const normalizedStdDev = Math.min(stdDev / 60000, 1);
    return 1 - normalizedStdDev;
  }

  /**
   * Calculate speed-accuracy ratio
   */
  private calculateSpeedAccuracyRatio(avgTime: number, accuracy: number): number {
    if (avgTime === 0) return 0;
    
    // Ideal time range: 30-90 seconds
    let speedScore = 0;
    if (avgTime < LearnerModelService.FAST_THRESHOLD) {
      // Too fast might indicate guessing
      speedScore = 0.7;
    } else if (avgTime <= LearnerModelService.MEDIUM_THRESHOLD) {
      // Optimal speed
      speedScore = 1.0;
    } else {
      // Slower is okay if accurate
      speedScore = 0.8;
    }
    
    // Combine speed and accuracy
    return (speedScore + accuracy) / 2;
  }

  /**
   * Determine mastery level category
   */
  private determineMasteryLevel(probability: number): ConceptMastery['masteryLevel'] {
    if (probability < 0.3) return 'novice';
    if (probability < 0.6) return 'developing';
    if (probability < 0.85) return 'proficient';
    return 'mastered';
  }

  /**
   * Calculate hint dependency rate across all interactions
   */
  private calculateHintDependency(history: InteractionRecord[]): number {
    const attempts = history.filter(i => i.action === 'question_attempt');
    const hints = history.filter(i => i.action === 'hint_requested');
    
    return attempts.length > 0 ? hints.length / attempts.length : 0;
  }

  /**
   * Calculate reliability metrics based on response times
   */
  private calculateReliabilityMetrics(
    questionInteractions: InteractionRecord[]
  ): ReliabilityMetrics {
    if (questionInteractions.length === 0) {
      return {
        overallScore: 0.5,
        consistencyScore: 0.5,
        speedAccuracyRatio: 0.5,
        timeRangeReliability: { fast: 0.5, medium: 0.5, slow: 0.5 }
      };
    }
    
    // Separate by time range
    const fastResponses = questionInteractions.filter(
      i => i.responseTime && i.responseTime < LearnerModelService.FAST_THRESHOLD
    );
    const mediumResponses = questionInteractions.filter(
      i => i.responseTime && 
         i.responseTime >= LearnerModelService.FAST_THRESHOLD &&
         i.responseTime < LearnerModelService.MEDIUM_THRESHOLD
    );
    const slowResponses = questionInteractions.filter(
      i => i.responseTime && i.responseTime >= LearnerModelService.MEDIUM_THRESHOLD
    );
    
    // Calculate accuracy for each range
    const fastReliability = this.calculateRangeReliability(fastResponses);
    const mediumReliability = this.calculateRangeReliability(mediumResponses);
    const slowReliability = this.calculateRangeReliability(slowResponses);
    
    const consistencyScore = this.calculateConsistencyScore(questionInteractions);
    
    const correctAnswers = questionInteractions.filter(i => i.isCorrect).length;
    const accuracy = correctAnswers / questionInteractions.length;
    const avgTime = questionInteractions.reduce(
      (sum, i) => sum + (i.responseTime || 0), 0
    ) / questionInteractions.length;
    
    const speedAccuracyRatio = this.calculateSpeedAccuracyRatio(avgTime, accuracy);
    
    // Overall reliability is weighted average
    const overallScore = (
      fastReliability * 0.2 +
      mediumReliability * 0.5 +
      slowReliability * 0.3 +
      consistencyScore * 0.3 +
      speedAccuracyRatio * 0.2
    ) / 1.5;
    
    return {
      overallScore: Math.max(0, Math.min(1, overallScore)),
      consistencyScore,
      speedAccuracyRatio,
      timeRangeReliability: {
        fast: fastReliability,
        medium: mediumReliability,
        slow: slowReliability
      }
    };
  }

  /**
   * Calculate reliability for a specific time range
   */
  private calculateRangeReliability(interactions: InteractionRecord[]): number {
    if (interactions.length === 0) return 0.5;
    
    const correct = interactions.filter(i => i.isCorrect).length;
    const accuracy = correct / interactions.length;
    
    // Consider hint usage
    const avgHints = interactions.reduce((sum, i) => sum + i.hintsUsed, 0) / interactions.length;
    const hintPenalty = Math.max(0, 1 - (avgHints * 0.2));
    
    return (accuracy + hintPenalty) / 2;
  }

  /**
   * Detect error patterns in student responses
   */
  private detectErrorPatterns(history: InteractionRecord[]): ErrorPattern[] {
    const errors = history.filter(
      i => i.action === 'question_attempt' && !i.isCorrect && i.errorType
    );
    
    // Group errors by type and concept
    const errorMap = new Map<string, ErrorPattern>();
    
    errors.forEach(error => {
      const key = `${error.conceptId}_${error.errorType}`;
      const existing = errorMap.get(key);
      
      if (existing) {
        errorMap.set(key, {
          ...existing,
          frequency: existing.frequency + 1,
          lastOccurrence: error.timestamp
        });
      } else {
        errorMap.set(key, {
          conceptId: error.conceptId,
          errorType: error.errorType as ErrorPattern['errorType'],
          frequency: 1,
          lastOccurrence: error.timestamp,
          context: error.questionId
        });
      }
    });
    
    // Return patterns sorted by frequency (most common first)
    return Array.from(errorMap.values()).sort((a, b) => b.frequency - a.frequency);
  }

  /**
   * Calculate learning velocity (rate of improvement)
   */
  private calculateLearningVelocity(
    history: InteractionRecord[],
    conceptMap: Record<string, ConceptMastery>
  ): number {
    if (Object.keys(conceptMap).length === 0) return 0;
    
    // Calculate average mastery gain over time
    const concepts = Object.values(conceptMap);
    const totalMastery = concepts.reduce((sum, c) => sum + c.masteryProbability, 0);
    const avgMastery = totalMastery / concepts.length;
    
    // Calculate time span
    const attempts = history.filter(i => i.action === 'question_attempt');
    if (attempts.length < 2) return 0;
    
    const firstAttempt = attempts[0].timestamp;
    const lastAttempt = attempts[attempts.length - 1].timestamp;
    const timeSpan = (lastAttempt - firstAttempt) / 3600000; // Convert to hours
    
    // Velocity = mastery gained per hour
    return timeSpan > 0 ? avgMastery / timeSpan : 0;
  }

  /**
   * Calculate engagement score based on interaction patterns
   */
  private calculateEngagementScore(history: InteractionRecord[]): number {
    if (history.length === 0) return 0.5;
    
    // Factors: variety of interactions, consistency, question attempts
    const interactionTypes = new Set(history.map(i => i.action)).size;
    const varietyScore = Math.min(interactionTypes / 5, 1); // Max 5 types
    
    // Time between interactions (consistent engagement)
    const timestamps = history.map(i => i.timestamp).sort();
    const gaps = [];
    for (let i = 1; i < timestamps.length; i++) {
      gaps.push(timestamps[i] - timestamps[i - 1]);
    }
    
    const avgGap = gaps.length > 0
      ? gaps.reduce((a, b) => a + b, 0) / gaps.length
      : 0;
    
    // Prefer consistent engagement (gaps around 5-10 minutes in a session)
    const targetGap = 600000; // 10 minutes
    const gapScore = avgGap > 0
      ? Math.max(0, 1 - Math.abs(avgGap - targetGap) / targetGap)
      : 0.5;
    
    // Question attempt rate
    const attempts = history.filter(i => i.action === 'question_attempt').length;
    const attemptRate = Math.min(attempts / history.length, 1);
    
    return (varietyScore * 0.3 + gapScore * 0.3 + attemptRate * 0.4);
  }

  /**
   * Calculate persistence level (ability to work through difficulties)
   */
  private calculatePersistenceLevel(history: InteractionRecord[]): number {
    const attempts = history.filter(i => i.action === 'question_attempt');
    if (attempts.length === 0) return 0.5;
    
    // Count attempts on difficult questions (multiple attempts)
    const questionAttempts = new Map<string, number>();
    attempts.forEach(a => {
      const count = questionAttempts.get(a.questionId) || 0;
      questionAttempts.set(a.questionId, count + 1);
    });
    
    const multipleAttempts = Array.from(questionAttempts.values()).filter(c => c > 1).length;
    const persistenceRate = multipleAttempts / questionAttempts.size;
    
    // Higher score for trying again after mistakes
    const incorrectAttempts = attempts.filter(a => !a.isCorrect);
    const retriesAfterError = incorrectAttempts.filter(a => {
      // Check if there was a subsequent attempt on the same question
      const nextAttempts = attempts.filter(
        na => na.questionId === a.questionId && na.timestamp > a.timestamp
      );
      return nextAttempts.length > 0;
    }).length;
    
    const retryRate = incorrectAttempts.length > 0
      ? retriesAfterError / incorrectAttempts.length
      : 0.5;
    
    return (persistenceRate * 0.4 + retryRate * 0.6);
  }

  /**
   * Calculate domain-specific mastery probabilities
   */
  private calculateDomainMasteryProbabilities(
    conceptMap: Record<string, ConceptMastery>
  ): StudentStateVector['masteryProbabilities'] {
    // Map concepts to domains
    const domainConcepts = {
      dataUnderstanding: ['ch1-st1-c1', 'ch1-st1-c2'],
      dataCollection: ['ch2-st1-c1', 'ch2-st1-c2'],
      frequencyTables: ['ch3-st1-c1', 'ch3-st1-c2'],
      graphicalRepresentation: ['ch4-st1-c1', 'ch4-st1-c2'],
      centralTendency: ['ch5-st1-c1', 'ch5-st1-c2'],
      dataInterpretation: ['ch6-st1-c1', 'ch6-st1-c2']
    };
    
    const result: StudentStateVector['masteryProbabilities'] = {
      dataUnderstanding: 0,
      frequencyTables: 0,
      graphicalRepresentation: 0,
      centralTendency: 0,
      dataInterpretation: 0,
      dataCollection: 0
    };
    
    // Calculate average mastery for each domain
    Object.entries(domainConcepts).forEach(([domain, concepts]) => {
      const relevantConcepts = concepts
        .map(cId => conceptMap[cId])
        .filter(c => c !== undefined);
      
      if (relevantConcepts.length > 0) {
        const avgMastery = relevantConcepts.reduce(
          (sum, c) => sum + c.masteryProbability, 0
        ) / relevantConcepts.length;
        result[domain as keyof typeof result] = avgMastery;
      }
    });
    
    return result;
  }

  /**
   * Check if there was a significant knowledge update
   */
  private checkKnowledgeUpdate(
    conceptId: string,
    previousMastery: ConceptMastery | undefined,
    newMastery: ConceptMastery
  ): KnowledgeUpdate | null {
    if (!previousMastery) {
      return {
        conceptId,
        previousMastery: 0,
        newMastery: newMastery.masteryProbability,
        reason: 'Initial learning',
        timestamp: Date.now()
      };
    }
    
    const masteryChange = newMastery.masteryProbability - previousMastery.masteryProbability;
    
    // Significant change threshold
    if (Math.abs(masteryChange) >= 0.1) {
      return {
        conceptId,
        previousMastery: previousMastery.masteryProbability,
        newMastery: newMastery.masteryProbability,
        reason: masteryChange > 0 ? 'Mastery improved' : 'Mastery decreased',
        timestamp: Date.now()
      };
    }
    
    // Check for mastery level change
    if (previousMastery.masteryLevel !== newMastery.masteryLevel) {
      return {
        conceptId,
        previousMastery: previousMastery.masteryProbability,
        newMastery: newMastery.masteryProbability,
        reason: `Level changed from ${previousMastery.masteryLevel} to ${newMastery.masteryLevel}`,
        timestamp: Date.now()
      };
    }
    
    return null;
  }

  /**
   * Save learner state to localStorage
   */
  private saveLearnerState(state: LearnerState): void {
    try {
      localStorage.setItem(
        LearnerModelService.STORAGE_KEY,
        JSON.stringify(state)
      );
    } catch (error) {
      console.error('Failed to save learner state:', error);
    }
  }

  /**
   * Load learner state from localStorage
   */
  getLearnerState(studentId: string): LearnerState | null {
    try {
      const data = localStorage.getItem(LearnerModelService.STORAGE_KEY);
      if (!data) return null;
      
      const state = JSON.parse(data) as LearnerState;
      return state.studentId === studentId ? state : null;
    } catch (error) {
      console.error('Failed to load learner state:', error);
      return null;
    }
  }

  /**
   * Get or create learner state
   */
  getOrCreateLearnerState(studentId: string): LearnerState {
    const existing = this.getLearnerState(studentId);
    return existing || this.initializeLearnerState(studentId);
  }

  /**
   * Clear learner state (for testing/reset)
   */
  clearLearnerState(): void {
    localStorage.removeItem(LearnerModelService.STORAGE_KEY);
  }
}

export const learnerModelService = LearnerModelService.getInstance();
