/**
 * Integration Guide: Connecting Supabase Service to LearnerContext
 * 
 * This file explains how to modify LearnerContext.tsx to use SupabaseLearnerService
 * for persistent data storage while maintaining the in-memory React Context as primary.
 * 
 * The integration is non-breaking: app works with or without Supabase.
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { LearnerState, InteractionRecord, ConceptMastery } from '@/types/learner-model';
import { LearnerModelService } from '@/services/learner-model-service';
import { 
  createSupabaseLearnerService, 
  SupabaseLearnerService,
  isSupabaseConfigured 
} from '@/services/supabase-service';

interface LearnerContextType {
  state: LearnerState;
  learnerId: string;
  recordInteraction: (interaction: InteractionRecord) => Promise<void>;
  updateConceptMastery: (conceptId: string, mastery: ConceptMastery) => Promise<void>;
  saveAssessmentAttempt: (conceptId: string, stats: any) => Promise<void>;
  isSupabaseReady: boolean;
}

const LearnerContext = createContext<LearnerContextType | undefined>(undefined);

export function LearnerProvider({ children, learnerId }: { children: React.ReactNode; learnerId: string }) {
  const [state, setState] = useState<LearnerState>(() => LearnerModelService.getInstance().getState());
  const [isSupabaseReady, setIsSupabaseReady] = useState(false);
  
  // Initialize services
  const learnerModelService = LearnerModelService.getInstance();
  const supabaseService = createSupabaseLearnerService(learnerId);

  // Track if Supabase is available
  useEffect(() => {
    setIsSupabaseReady(isSupabaseConfigured());
  }, []);

  /**
   * Enhanced recordInteraction that syncs to both memory and Supabase
   * Non-blocking: updates memory immediately, syncs to DB asynchronously
   */
  const recordInteraction = useCallback(
    async (interaction: InteractionRecord) => {
      // 1. Update in-memory state immediately (for UI responsiveness)
      learnerModelService.recordInteraction(interaction);
      
      // 2. Update component state
      setState(learnerModelService.getState());

      // 3. Sync to Supabase asynchronously (fire and forget)
      // This doesn't block the user - if Supabase is down, app still works
      if (isSupabaseReady) {
        try {
          await supabaseService.syncInteraction(interaction);
          
          // Record error patterns if answer was wrong
          if (!interaction.isCorrect && interaction.errorType) {
            await supabaseService.recordErrorPattern(
              interaction.conceptId,
              interaction.errorType,
              `Question ${interaction.questionId}`
            );
          }
        } catch (error) {
          // Fail silently - app continues to work
          console.error('Failed to sync interaction to Supabase:', error);
        }
      }
    },
    [learnerModelService, supabaseService, isSupabaseReady]
  );

  /**
   * Enhanced updateConceptMastery that syncs to both memory and Supabase
   */
  const updateConceptMastery = useCallback(
    async (conceptId: string, mastery: ConceptMastery) => {
      // 1. Update in-memory state
      learnerModelService.updateConceptMastery(conceptId, mastery);
      
      // 2. Update component state
      setState(learnerModelService.getState());

      // 3. Sync to Supabase asynchronously
      if (isSupabaseReady) {
        try {
          await supabaseService.updateConceptMastery(conceptId, mastery);
        } catch (error) {
          console.error('Failed to update concept mastery in Supabase:', error);
        }
      }
    },
    [learnerModelService, supabaseService, isSupabaseReady]
  );

  /**
   * Enhanced saveAssessmentAttempt that syncs to Supabase
   */
  const saveAssessmentAttempt = useCallback(
    async (conceptId: string, stats: any) => {
      if (isSupabaseReady) {
        try {
          await supabaseService.saveAssessmentAttempt(conceptId, stats);
        } catch (error) {
          console.error('Failed to save assessment attempt to Supabase:', error);
        }
      }
    },
    [supabaseService, isSupabaseReady]
  );

  const value: LearnerContextType = {
    state,
    learnerId,
    recordInteraction,
    updateConceptMastery,
    saveAssessmentAttempt,
    isSupabaseReady,
  };

  return <LearnerContext.Provider value={value}>{children}</LearnerContext.Provider>;
}

export function useLearner() {
  const context = useContext(LearnerContext);
  if (!context) {
    throw new Error('useLearner must be used within LearnerProvider');
  }
  return context;
}

/**
 * MIGRATION STEPS:
 * 
 * 1. Update LearnerContext.tsx:
 *    - Import SupabaseLearnerService: 
 *      import { 
 *        createSupabaseLearnerService, 
 *        isSupabaseConfigured 
 *      } from '@/services/supabase-service';
 *
 *    - Modify recordInteraction() to call:
 *      await supabaseService.syncInteraction(interaction); // non-blocking
 *
 *    - Modify updateConceptMastery() to call:
 *      await supabaseService.updateConceptMastery(conceptId, mastery);
 *
 * 2. Create .env.local with Supabase credentials
 *
 * 3. Run SQL schema in Supabase dashboard
 *
 * 4. Test:
 *    - Go through a concept
 *    - Check Supabase Table Editor → interactions → should see records
 *    - Check concept_mastery → should see scores
 *
 * 5. Monitor:
 *    - Check browser console: should see ✅ Supabase client initialized
 *    - Check Network tab: POST to supabase-service.ts endpoints
 *    - If errors, see TROUBLESHOOTING.md
 * 
 * BENEFITS:
 * ✅ Multi-device continuity: load progress on any device
 * ✅ Historical analysis: pedagogical service can query past mistakes
 * ✅ Analytics: teachers can view student dashboard
 * ✅ Offline fallback: app works without Supabase (uses React Context only)
 * ✅ Non-breaking: no changes to existing API
 * ✅ Async persistence: doesn't slow down UI
 * 
 * TESTING CHECKLIST:
 * □ Supabase credentials in .env.local
 * □ .env.local in .gitignore (never commit keys!)
 * □ SQL schema created in Supabase
 * □ @supabase/supabase-js installed
 * □ LearnerContext updated with sync calls
 * □ Browser console shows ✅ Supabase client initialized
 * □ Complete a concept exercise
 * □ Check Supabase Table Editor: interactions appear within seconds
 * □ Check concept_mastery: scores match React Context
 * □ Refresh page: progress still visible (loaded from Supabase)
 * □ Disable internet: app still works (falls back to React Context)
 * □ Re-enable internet: sync resumes (no data loss)
 */
