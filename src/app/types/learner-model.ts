/**
 * Learner Model Type Definitions
 * Comprehensive state tracking for adaptive learning
 */

// Error pattern types
export interface ErrorPattern {
  conceptId: string;
  errorType: 'calculation' | 'interpretation' | 'conceptual' | 'procedural';
  frequency: number;
  lastOccurrence: number;
  context: string;
}

// Response time data
export interface ResponseTimeData {
  timestamp: number;
  duration: number; // in milliseconds
  questionId: string;
  conceptId: string;
  isCorrect: boolean;
  hintsUsed: number;
}

// Reliability score based on response time consistency
export interface ReliabilityMetrics {
  overallScore: number; // 0-1
  consistencyScore: number; // variance in response times
  speedAccuracyRatio: number; // balance between speed and correctness
  timeRangeReliability: {
    fast: number; // < 30s
    medium: number; // 30-90s
    slow: number; // > 90s
  };
}

// Concept mastery tracking
export interface ConceptMastery {
  conceptId: string;
  masteryProbability: number; // 0-1
  attemptCount: number;
  correctCount: number;
  avgResponseTime: number;
  hintDependency: number; // 0-1, percentage of questions requiring hints
  lastAttempt: number;
  masteryLevel: 'novice' | 'developing' | 'proficient' | 'mastered';
  confidenceScore: number; // 0-1, based on consistency
}

// Student state vector - core of the learner model
export interface StudentStateVector {
  // Mastery probabilities for key areas
  masteryProbabilities: {
    dataUnderstanding: number;
    frequencyTables: number;
    graphicalRepresentation: number;
    centralTendency: number;
    dataInterpretation: number;
    dataCollection: number;
  };
  
  // Behavioral metrics
  averageResponseTime: number;
  hintDependencyRate: number;
  
  // Pattern tracking
  errorPatterns: ErrorPattern[];
  
  // Reliability
  reliabilityScore: ReliabilityMetrics;
  
  // Detailed concept tracking
  conceptMasteryMap: Record<string, ConceptMastery>;
  
  // Learning characteristics
  learningVelocity: number; // rate of improvement
  engagementScore: number; // 0-1
  persistenceLevel: number; // ability to work through difficult problems
  
  // Session data
  totalTimeSpent: number;
  sessionsCompleted: number;
  lastActive: number;
}

// Individual interaction record
export interface InteractionRecord {
  id: string;
  timestamp: number;
  conceptId: string;
  questionId: string;
  action: 'question_attempt' | 'hint_requested' | 'video_watched' | 'example_viewed' | 'game_played';
  response?: string;
  isCorrect?: boolean;
  responseTime?: number;
  hintsUsed: number;
  attemptNumber: number;
  errorType?: string;
}

// Learning session
export interface LearningSession {
  sessionId: string;
  startTime: number;
  endTime?: number;
  conceptsCovered: string[];
  questionsAttempted: number;
  correctAnswers: number;
  hintsUsed: number;
  averageResponseTime: number;
  masteryGain: number; // improvement in mastery during session
}

// Knowledge state update
export interface KnowledgeUpdate {
  conceptId: string;
  previousMastery: number;
  newMastery: number;
  reason: string;
  timestamp: number;
}

// Complete learner state
export interface LearnerState {
  studentId: string;
  stateVector: StudentStateVector;
  interactionHistory: InteractionRecord[];
  sessions: LearningSession[];
  knowledgeUpdates: KnowledgeUpdate[];
  createdAt: number;
  lastUpdated: number;
}

// Pedagogical decision input
export interface PedagogicalContext {
  currentConcept: string;
  studentState: StudentStateVector;
  recentInteractions: InteractionRecord[];
  timeInCurrentConcept: number;
  consecutiveErrors: number;
  consecutiveCorrect: number;
}

// Pedagogical decision output
export interface InstructionalDecision {
  action: 'continue' | 'provide_hint' | 'show_example' | 'remediate' | 'advance' | 'practice_more' | 'take_break';
  reason: string;
  nextContent?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  supportLevel: 'minimal' | 'moderate' | 'substantial';
}
