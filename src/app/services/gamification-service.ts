/**
 * Gamification Service
 * Manages points, badges, achievements, and levels
 */

import { GamificationState, Badge, Achievement, LevelInfo } from '../types/gamification';
import confetti from 'canvas-confetti';

export class GamificationService {
  private static instance: GamificationService;

  private static readonly LEVELS: LevelInfo[] = [
    { level: 1, title: 'Data Novice', pointsRequired: 0, rewards: ['Welcome badge'] },
    { level: 2, title: 'Data Explorer', pointsRequired: 100, rewards: ['Explorer badge'] },
    { level: 3, title: 'Data Analyst', pointsRequired: 300, rewards: ['Analyst badge'] },
    { level: 4, title: 'Data Scientist', pointsRequired: 600, rewards: ['Scientist badge'] },
    { level: 5, title: 'Data Master', pointsRequired: 1000, rewards: ['Master badge', 'Certificate'] }
  ];

  private static readonly ALL_BADGES: Badge[] = [
    {
      id: 'first_question',
      name: 'First Steps',
      description: 'Answered your first question',
      icon: '🎯',
      requirement: 'Answer 1 question'
    },
    {
      id: 'streak_3',
      name: 'Hot Streak',
      description: '3 correct answers in a row',
      icon: '🔥',
      requirement: '3 consecutive correct'
    },
    {
      id: 'streak_5',
      name: 'Unstoppable',
      description: '5 correct answers in a row',
      icon: '⚡',
      requirement: '5 consecutive correct'
    },
    {
      id: 'no_hints',
      name: 'Independent Learner',
      description: 'Solved 5 questions without hints',
      icon: '🧠',
      requirement: '5 questions without hints'
    },
    {
      id: 'speed_master',
      name: 'Speed Master',
      description: 'Answered 10 questions in under 30 seconds each',
      icon: '⚡',
      requirement: '10 fast correct answers'
    },
    {
      id: 'persistent',
      name: 'Never Give Up',
      description: 'Attempted a difficult question 3 times until correct',
      icon: '💪',
      requirement: 'Persist on difficult question'
    },
    {
      id: 'concept_master',
      name: 'Concept Master',
      description: 'Achieved 90%+ mastery in any concept',
      icon: '🎓',
      requirement: '90% mastery in a concept'
    },
    {
      id: 'explorer',
      name: 'Curious Explorer',
      description: 'Viewed all content types (theory, examples, interactive)',
      icon: '🔍',
      requirement: 'Explore all content'
    },
    {
      id: 'daily_goal',
      name: 'Goal Crusher',
      description: 'Completed daily goals for 3 days straight',
      icon: '🏆',
      requirement: '3-day streak on goals'
    },
    {
      id: 'error_master',
      name: 'Learn from Mistakes',
      description: 'Improved accuracy by 30% after reviewing errors',
      icon: '📈',
      requirement: 'Show improvement'
    }
  ];

  private static readonly ACHIEVEMENTS: Achievement[] = [
    {
      id: 'ach_10_questions',
      title: 'Question Conqueror',
      description: 'Answered 10 questions correctly',
      points: 50,
      category: 'mastery'
    },
    {
      id: 'ach_25_questions',
      title: 'Quiz Champion',
      description: 'Answered 25 questions correctly',
      points: 100,
      category: 'mastery'
    },
    {
      id: 'ach_50_questions',
      title: 'Knowledge Seeker',
      description: 'Answered 50 questions correctly',
      points: 200,
      category: 'mastery'
    },
    {
      id: 'ach_perfect_concept',
      title: 'Perfect Score',
      description: 'Got all questions correct in a concept',
      points: 150,
      category: 'mastery'
    },
    {
      id: 'ach_study_1hour',
      title: 'Dedicated Learner',
      description: 'Studied for 1 hour total',
      points: 75,
      category: 'persistence'
    },
    {
      id: 'ach_fast_learner',
      title: 'Quick Thinker',
      description: 'Average response time under 30 seconds',
      points: 100,
      category: 'speed'
    },
    {
      id: 'ach_all_examples',
      title: 'Example Master',
      description: 'Viewed all examples in a chapter',
      points: 80,
      category: 'exploration'
    }
  ];

  private constructor() {}

  static getInstance(): GamificationService {
    if (!GamificationService.instance) {
      GamificationService.instance = new GamificationService();
    }
    return GamificationService.instance;
  }

  /**
   * Initialize gamification state
   */
  initializeState(): GamificationState {
    return {
      totalPoints: 0,
      currentLevel: 1,
      badges: [],
      achievements: [],
      streak: {
        current: 0,
        longest: 0,
        lastActivity: Date.now()
      },
      dailyGoals: {
        questionsAnswered: 0,
        questionsTarget: 10,
        conceptsCompleted: 0,
        conceptsTarget: 1,
        timeSpent: 0,
        timeTarget: 1800000 // 30 minutes
      }
    };
  }

  /**
   * Award points for an action
   */
  awardPoints(
    state: GamificationState,
    action: 'correct_answer' | 'concept_complete' | 'hint_used' | 'fast_answer' | 'first_try',
    difficulty?: 'easy' | 'medium' | 'hard'
  ): { state: GamificationState; pointsEarned: number; leveledUp: boolean } {
    let points = 0;

    switch (action) {
      case 'correct_answer':
        points = difficulty === 'easy' ? 10 : difficulty === 'hard' ? 30 : 20;
        break;
      case 'concept_complete':
        points = 100;
        break;
      case 'hint_used':
        points = -5; // Penalty for hint usage
        break;
      case 'fast_answer':
        points = 15; // Bonus for quick correct answer
        break;
      case 'first_try':
        points = 25; // Bonus for getting it right first try
        break;
    }

    const newTotalPoints = Math.max(0, state.totalPoints + points);
    const previousLevel = state.currentLevel;
    const newLevel = this.calculateLevel(newTotalPoints);
    const leveledUp = newLevel > previousLevel;

    if (leveledUp) {
      this.celebrateLevelUp(newLevel);
    }

    return {
      state: {
        ...state,
        totalPoints: newTotalPoints,
        currentLevel: newLevel
      },
      pointsEarned: points,
      leveledUp
    };
  }

  /**
   * Update streak
   */
  updateStreak(
    state: GamificationState,
    wasCorrect: boolean
  ): GamificationState {
    const now = Date.now();
    const timeSinceLastActivity = now - state.streak.lastActivity;
    const dayInMs = 86400000;

    let newStreak = state.streak;

    if (wasCorrect) {
      // Increment streak
      if (timeSinceLastActivity > dayInMs) {
        // Reset if more than a day passed
        newStreak = {
          current: 1,
          longest: Math.max(state.streak.longest, 1),
          lastActivity: now
        };
      } else {
        const newCurrent = state.streak.current + 1;
        newStreak = {
          current: newCurrent,
          longest: Math.max(state.streak.longest, newCurrent),
          lastActivity: now
        };
      }
    } else {
      // Reset streak on incorrect answer
      newStreak = {
        current: 0,
        longest: state.streak.longest,
        lastActivity: now
      };
    }

    return {
      ...state,
      streak: newStreak
    };
  }

  /**
   * Check and award badges
   */
  checkBadges(
    state: GamificationState,
    context: {
      consecutiveCorrect: number;
      questionsWithoutHints: number;
      fastAnswers: number;
      conceptMastery: number;
      contentTypesViewed: Set<string>;
      questionAttempts: Map<string, number>;
    }
  ): { state: GamificationState; newBadges: Badge[] } {
    const newBadges: Badge[] = [];
    const earnedBadgeIds = new Set(state.badges.map(b => b.id));

    // Check each badge condition
    GamificationService.ALL_BADGES.forEach(badge => {
      if (earnedBadgeIds.has(badge.id)) return;

      let shouldAward = false;

      switch (badge.id) {
        case 'streak_3':
          shouldAward = context.consecutiveCorrect >= 3;
          break;
        case 'streak_5':
          shouldAward = context.consecutiveCorrect >= 5;
          break;
        case 'no_hints':
          shouldAward = context.questionsWithoutHints >= 5;
          break;
        case 'speed_master':
          shouldAward = context.fastAnswers >= 10;
          break;
        case 'concept_master':
          shouldAward = context.conceptMastery >= 0.9;
          break;
        case 'explorer':
          shouldAward = context.contentTypesViewed.size >= 3;
          break;
        case 'persistent':
          shouldAward = Array.from(context.questionAttempts.values()).some(attempts => attempts >= 3);
          break;
      }

      if (shouldAward) {
        const earnedBadge = {
          ...badge,
          earnedAt: Date.now()
        };
        newBadges.push(earnedBadge);
      }
    });

    if (newBadges.length > 0) {
      this.celebrateBadge();
    }

    return {
      state: {
        ...state,
        badges: [...state.badges, ...newBadges]
      },
      newBadges
    };
  }

  /**
   * Check and unlock achievements
   */
  checkAchievements(
    state: GamificationState,
    context: {
      totalCorrect: number;
      totalTimeSpent: number;
      avgResponseTime: number;
      perfectConcepts: number;
      examplesViewed: number;
    }
  ): { state: GamificationState; newAchievements: Achievement[] } {
    const newAchievements: Achievement[] = [];
    const unlockedIds = new Set(state.achievements.map(a => a.id));

    GamificationService.ACHIEVEMENTS.forEach(achievement => {
      if (unlockedIds.has(achievement.id)) return;

      let shouldUnlock = false;

      switch (achievement.id) {
        case 'ach_10_questions':
          shouldUnlock = context.totalCorrect >= 10;
          break;
        case 'ach_25_questions':
          shouldUnlock = context.totalCorrect >= 25;
          break;
        case 'ach_50_questions':
          shouldUnlock = context.totalCorrect >= 50;
          break;
        case 'ach_perfect_concept':
          shouldUnlock = context.perfectConcepts > 0;
          break;
        case 'ach_study_1hour':
          shouldUnlock = context.totalTimeSpent >= 3600000;
          break;
        case 'ach_fast_learner':
          shouldUnlock = context.avgResponseTime < 30000;
          break;
        case 'ach_all_examples':
          shouldUnlock = context.examplesViewed >= 5;
          break;
      }

      if (shouldUnlock) {
        const unlockedAchievement = {
          ...achievement,
          unlockedAt: Date.now()
        };
        newAchievements.push(unlockedAchievement);
      }
    });

    // Award points for achievements
    const achievementPoints = newAchievements.reduce((sum, ach) => sum + ach.points, 0);
    const newTotalPoints = state.totalPoints + achievementPoints;
    const newLevel = this.calculateLevel(newTotalPoints);

    if (newAchievements.length > 0) {
      this.celebrateAchievement();
    }

    return {
      state: {
        ...state,
        totalPoints: newTotalPoints,
        currentLevel: newLevel,
        achievements: [...state.achievements, ...newAchievements]
      },
      newAchievements
    };
  }

  /**
   * Update daily goals
   */
  updateDailyGoals(
    state: GamificationState,
    update: {
      questionsAnswered?: number;
      conceptsCompleted?: number;
      timeSpent?: number;
    }
  ): GamificationState {
    return {
      ...state,
      dailyGoals: {
        ...state.dailyGoals,
        questionsAnswered: state.dailyGoals.questionsAnswered + (update.questionsAnswered || 0),
        conceptsCompleted: state.dailyGoals.conceptsCompleted + (update.conceptsCompleted || 0),
        timeSpent: state.dailyGoals.timeSpent + (update.timeSpent || 0)
      }
    };
  }

  /**
   * Check if daily goals are completed
   */
  areDailyGoalsComplete(state: GamificationState): boolean {
    const { dailyGoals } = state;
    return (
      dailyGoals.questionsAnswered >= dailyGoals.questionsTarget &&
      dailyGoals.conceptsCompleted >= dailyGoals.conceptsTarget &&
      dailyGoals.timeSpent >= dailyGoals.timeTarget
    );
  }

  /**
   * Calculate level from points
   */
  private calculateLevel(points: number): number {
    for (let i = GamificationService.LEVELS.length - 1; i >= 0; i--) {
      if (points >= GamificationService.LEVELS[i].pointsRequired) {
        return GamificationService.LEVELS[i].level;
      }
    }
    return 1;
  }

  /**
   * Get level info
   */
  getLevelInfo(level: number): LevelInfo | undefined {
    return GamificationService.LEVELS.find(l => l.level === level);
  }

  /**
   * Get next level info
   */
  getNextLevelInfo(currentLevel: number): LevelInfo | undefined {
    return GamificationService.LEVELS.find(l => l.level === currentLevel + 1);
  }

  /**
   * Get progress to next level
   */
  getProgressToNextLevel(points: number, currentLevel: number): number {
    const currentLevelInfo = this.getLevelInfo(currentLevel);
    const nextLevelInfo = this.getNextLevelInfo(currentLevel);

    if (!currentLevelInfo || !nextLevelInfo) return 100;

    const pointsIntoCurrentLevel = points - currentLevelInfo.pointsRequired;
    const pointsNeededForNextLevel = nextLevelInfo.pointsRequired - currentLevelInfo.pointsRequired;

    return Math.min(100, (pointsIntoCurrentLevel / pointsNeededForNextLevel) * 100);
  }

  /**
   * Celebration animations
   */
  private celebrateLevelUp(level: number) {
    confetti({
      particleCount: 150,
      spread: 180,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF6347']
    });
  }

  private celebrateBadge() {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#4169E1', '#00CED1', '#32CD32']
    });
  }

  private celebrateAchievement() {
    confetti({
      particleCount: 120,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#FF1493', '#9370DB', '#FFD700']
    });
  }
}

export const gamificationService = GamificationService.getInstance();
