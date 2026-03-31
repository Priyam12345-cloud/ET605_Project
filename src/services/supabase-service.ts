import { getSupabaseClient, withRetry, isSupabaseConfigured } from './supabase-client';
import { LearnerState, ConceptMastery, InteractionRecord } from '@/types/learner-model';

/**
 * Supabase Learner Service
 * 
 * Extends the in-memory LearnerModelService with persistent storage
 * Acts as a sync layer between React Context and Supabase database
 * 
 * Key Features:
 * - Non-breaking: app works if Supabase is offline
 * - Async persistence: doesn't block UI updates
 * - Conflict resolution: Supabase wins on conflicts
 * - Type-safe: leverages existing TypeScript types
 * 
 * Usage:
 *   const service = new SupabaseLearnerService(userId);
 *   await service.syncInteraction(interaction); // Persist to DB
 *   const state = await service.loadLearnerState(); // Restore from DB
 */

export class SupabaseLearnerService {
  private learnerId: string;
  private supabase = getSupabaseClient();

  constructor(learnerId: string) {
    this.learnerId = learnerId;
  }

  /**
   * Load learner profile from Supabase
   * Returns null if not found or Supabase unavailable
   */
  async loadLearnerProfile() {
    if (!this.supabase) return null;

    try {
      const { data, error } = await withRetry(() =>
        this.supabase!.from('learners').select('*').eq('id', this.learnerId).single()
      );

      if (error) {
        console.warn('⚠️ Failed to load learner profile:', error.message);
        return null;
      }

      return data;
    } catch (error) {
      console.error('❌ Error loading learner profile:', error);
      return null;
    }
  }

  /**
   * Save learner profile to Supabase
   */
  async saveLearnerProfile(profile: { name: string; email: string; grade?: number }) {
    if (!this.supabase) return null;

    try {
      const { data, error } = await withRetry(() =>
        this.supabase!.from('learners').upsert(
          {
            id: this.learnerId,
            ...profile,
            last_active: new Date().toISOString(),
          },
          { onConflict: 'id' }
        )
      );

      if (error) {
        console.warn('⚠️ Failed to save learner profile:', error.message);
        return null;
      }

      return data;
    } catch (error) {
      console.error('❌ Error saving learner profile:', error);
      return null;
    }
  }

  /**
   * Record interaction (question attempt, hint, video watch, etc.) to Supabase
   * Called after each user action with learner state changes
   */
  async syncInteraction(interaction: InteractionRecord) {
    if (!this.supabase) return null;

    try {
      const { data, error } = await withRetry(() =>
        this.supabase!.from('interactions').insert({
          learner_id: this.learnerId,
          concept_id: interaction.conceptId,
          question_id: interaction.questionId || null,
          action: interaction.action,
          response: interaction.response || null,
          is_correct: interaction.isCorrect || null,
          response_time: interaction.responseTime || null,
          hints_used: interaction.hintsUsed || 0,
          attempt_number: interaction.attemptNumber || 1,
          error_type: interaction.errorType || null,
          created_at: new Date(interaction.timestamp).toISOString(),
        })
      );

      if (error) {
        console.warn('⚠️ Failed to sync interaction:', error.message);
        return null;
      }

      return data;
    } catch (error) {
      console.error('❌ Error syncing interaction:', error);
      return null;
    }
  }

  /**
   * Update concept mastery in Supabase
   * Called after concept BKT scores are recalculated
   */
  async updateConceptMastery(conceptId: string, mastery: ConceptMastery) {
    if (!this.supabase) return null;

    try {
      const { data, error } = await withRetry(() =>
        this.supabase!.from('concept_mastery').upsert(
          {
            learner_id: this.learnerId,
            concept_id: conceptId,
            mastery_probability: mastery.masteryProbability,
            attempt_count: mastery.attemptCount,
            correct_count: mastery.correctCount,
            avg_response_time: mastery.avgResponseTime,
            hint_dependency: mastery.hintDependency,
            mastery_level: mastery.masteryLevel,
            confidence_score: mastery.confidenceScore,
            last_attempt: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'learner_id,concept_id' }
        )
      );

      if (error) {
        console.warn('⚠️ Failed to update concept mastery:', error.message);
        return null;
      }

      return data;
    } catch (error) {
      console.error('❌ Error updating concept mastery:', error);
      return null;
    }
  }

  /**
   * Save assessment attempt to Supabase
   * Called when assessment is completed
   */
  async saveAssessmentAttempt(conceptId: string, attemptData: {
    totalQuestions: number;
    correctAnswers: number;
    accuracy: number;
    avgResponseTime: number;
    hintsUsed: number;
    totalTime: number;
    masteryGain: number;
    startedAt: Date;
  }) {
    if (!this.supabase) return null;

    try {
      const { data, error } = await withRetry(() =>
        this.supabase!.from('assessment_attempts').insert({
          learner_id: this.learnerId,
          concept_id: conceptId,
          total_questions: attemptData.totalQuestions,
          correct_answers: attemptData.correctAnswers,
          accuracy: attemptData.accuracy,
          avg_response_time: attemptData.avgResponseTime,
          hints_used: attemptData.hintsUsed,
          total_time: attemptData.totalTime,
          mastery_gain: attemptData.masteryGain,
          started_at: attemptData.startedAt.toISOString(),
          completed_at: new Date().toISOString(),
        })
      );

      if (error) {
        console.warn('⚠️ Failed to save assessment attempt:', error.message);
        return null;
      }

      return data;
    } catch (error) {
      console.error('❌ Error saving assessment attempt:', error);
      return null;
    }
  }

  /**
   * Record error pattern to Supabase
   * Tracks common mistakes by concept for remediation
   */
  async recordErrorPattern(conceptId: string, errorType: string, context?: string) {
    if (!this.supabase) return null;

    try {
      // Try to increment existing error pattern
      const { data: existing, error: selectError } = await this.supabase
        .from('error_patterns')
        .select('id, frequency')
        .eq('learner_id', this.learnerId)
        .eq('concept_id', conceptId)
        .eq('error_type', errorType)
        .single();

      if (existing) {
        // Update existing error pattern
        const { data, error } = await withRetry(() =>
          this.supabase!.from('error_patterns')
            .update({
              frequency: existing.frequency + 1,
              last_occurrence: new Date().toISOString(),
            })
            .eq('id', existing.id)
        );

        if (error) {
          console.warn('⚠️ Failed to update error pattern:', error.message);
          return null;
        }
        return data;
      }

      // Create new error pattern
      const { data, error } = await withRetry(() =>
        this.supabase!.from('error_patterns').insert({
          learner_id: this.learnerId,
          concept_id: conceptId,
          error_type: errorType,
          frequency: 1,
          context: context || null,
          last_occurrence: new Date().toISOString(),
        })
      );

      if (error) {
        console.warn('⚠️ Failed to record error pattern:', error.message);
        return null;
      }

      return data;
    } catch (error) {
      console.error('❌ Error recording error pattern:', error);
      return null;
    }
  }

  /**
   * Load concept mastery for a specific concept from Supabase
   */
  async loadConceptMastery(conceptId: string): Promise<ConceptMastery | null> {
    if (!this.supabase) return null;

    try {
      const { data, error } = await withRetry(() =>
        this.supabase!.from('concept_mastery')
          .select('*')
          .eq('learner_id', this.learnerId)
          .eq('concept_id', conceptId)
          .single()
      );

      if (error) {
        if (error.code === 'PGRST116') {
          // Not found - this is normal for new concepts
          return null;
        }
        console.warn('⚠️ Failed to load concept mastery:', error.message);
        return null;
      }

      // Map from database format to ConceptMastery type
      return {
        masteryProbability: data.mastery_probability,
        attemptCount: data.attempt_count,
        correctCount: data.correct_count,
        avgResponseTime: data.avg_response_time,
        hintDependency: data.hint_dependency,
        masteryLevel: data.mastery_level,
        confidenceScore: data.confidence_score,
      };
    } catch (error) {
      console.error('❌ Error loading concept mastery:', error);
      return null;
    }
  }

  /**
   * Load all interactions for a concept
   * Useful for analytics and remediation decisions
   */
  async loadConceptInteractions(conceptId: string) {
    if (!this.supabase) return [];

    try {
      const { data, error } = await withRetry(() =>
        this.supabase!.from('interactions')
          .select('*')
          .eq('learner_id', this.learnerId)
          .eq('concept_id', conceptId)
          .order('created_at', { ascending: false })
          .limit(100)
      );

      if (error) {
        console.warn('⚠️ Failed to load concept interactions:', error.message);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('❌ Error loading concept interactions:', error);
      return [];
    }
  }

  /**
   * Get recent interactions for dashboard
   */
  async loadRecentInteractions(limit: number = 20) {
    if (!this.supabase) return [];

    try {
      const { data, error } = await withRetry(() =>
        this.supabase!.from('interactions')
          .select('*')
          .eq('learner_id', this.learnerId)
          .order('created_at', { ascending: false })
          .limit(limit)
      );

      if (error) {
        console.warn('⚠️ Failed to load recent interactions:', error.message);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('❌ Error loading recent interactions:', error);
      return [];
    }
  }

  /**
   * Start a new learning session
   */
  async startSession(conceptsCovered: string[] = []) {
    if (!this.supabase) return null;

    try {
      const { data, error } = await withRetry(() =>
        this.supabase!.from('session_logs').insert({
          learner_id: this.learnerId,
          session_start: new Date().toISOString(),
          concepts_covered: conceptsCovered,
        })
      );

      if (error) {
        console.warn('⚠️ Failed to start session:', error.message);
        return null;
      }

      return data?.[0]?.id;
    } catch (error) {
      console.error('❌ Error starting session:', error);
      return null;
    }
  }

  /**
   * End a learning session
   */
  async endSession(sessionId: string, stats: {
    questionsAttempted: number;
    correctAnswers: number;
    hintsUsed: number;
    avgResponseTime: number;
    engagementScore: number;
  }) {
    if (!this.supabase) return null;

    try {
      const { data, error } = await withRetry(() =>
        this.supabase!.from('session_logs')
          .update({
            session_end: new Date().toISOString(),
            questions_attempted: stats.questionsAttempted,
            correct_answers: stats.correctAnswers,
            hints_used: stats.hintsUsed,
            avg_response_time: stats.avgResponseTime,
            engagement_score: stats.engagementScore,
          })
          .eq('id', sessionId)
      );

      if (error) {
        console.warn('⚠️ Failed to end session:', error.message);
        return null;
      }

      return data;
    } catch (error) {
      console.error('❌ Error ending session:', error);
      return null;
    }
  }
}

/**
 * Create a Supabase learner service instance
 * Safe to call even if Supabase is not configured
 */
export function createSupabaseLearnerService(learnerId: string): SupabaseLearnerService {
  return new SupabaseLearnerService(learnerId);
}

// Re-export from supabase-client for convenience
export { isSupabaseConfigured };
