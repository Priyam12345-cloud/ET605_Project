/**
 * Gamification Types
 * Points, badges, levels, and achievements system
 */

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: number;
  requirement: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  unlockedAt?: number;
  category: 'mastery' | 'persistence' | 'speed' | 'exploration' | 'social';
}

export interface LevelInfo {
  level: number;
  title: string;
  pointsRequired: number;
  rewards: string[];
}

export interface GamificationState {
  totalPoints: number;
  currentLevel: number;
  badges: Badge[];
  achievements: Achievement[];
  streak: {
    current: number;
    longest: number;
    lastActivity: number;
  };
  dailyGoals: {
    questionsAnswered: number;
    questionsTarget: number;
    conceptsCompleted: number;
    conceptsTarget: number;
    timeSpent: number;
    timeTarget: number;
  };
}

// Bayesian Knowledge Tracing Parameters
export interface BKTParameters {
  pInit: number;      // Initial knowledge probability (P(L0))
  pLearn: number;     // Probability of learning (P(T))
  pGuess: number;     // Probability of guessing correctly (P(G))
  pSlip: number;      // Probability of slipping (making mistake despite knowing) (P(S))
}

export interface BKTState {
  conceptId: string;
  knowledgeProbability: number; // P(Ln) - current probability student knows concept
  parameters: BKTParameters;
  updateHistory: {
    timestamp: number;
    previousP: number;
    newP: number;
    wasCorrect: boolean;
  }[];
}
