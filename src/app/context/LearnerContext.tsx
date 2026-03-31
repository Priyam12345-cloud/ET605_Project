import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LearnerState, InteractionRecord } from '../types/learner-model';
import { learnerModelService } from '../services/learner-model-service';
import { createSupabaseLearnerService, isSupabaseConfigured } from '../../services/supabase-service';

interface LearnerContextType {
  learnerState: LearnerState | null;
  updateLearnerState: (state: LearnerState) => void;
  recordInteraction: (
    conceptId: string,
    questionId: string,
    action: InteractionRecord['action'],
    response?: string,
    isCorrect?: boolean,
    responseTime?: number,
    errorType?: string
  ) => void;
  resetProgress: () => void;
  isSupabaseReady: boolean;
}

const LearnerContext = createContext<LearnerContextType | undefined>(undefined);

export const LearnerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [learnerState, setLearnerState] = useState<LearnerState | null>(null);
  const [isSupabaseReady, setIsSupabaseReady] = useState(false);
  const [supabaseService, setSupabaseService] = useState<any>(null);

  useEffect(() => {
    // Load or create learner state
    const state = learnerModelService.getOrCreateLearnerState('student_001');
    setLearnerState(state);

    // Initialize Supabase service
    setIsSupabaseReady(isSupabaseConfigured());
    if (isSupabaseConfigured()) {
      const service = createSupabaseLearnerService('student_001');
      setSupabaseService(service);
      console.log('✅ Supabase service initialized');
    } else {
      console.warn('⚠️ Supabase not configured - using in-memory storage only');
    }
  }, []);

  const updateLearnerState = (state: LearnerState) => {
    setLearnerState(state);
  };

  const recordInteraction = (
    conceptId: string,
    questionId: string,
    action: InteractionRecord['action'],
    response?: string,
    isCorrect?: boolean,
    responseTime?: number,
    errorType?: string
  ) => {
    if (!learnerState) return;

    const updatedState = learnerModelService.recordInteraction(
      learnerState,
      conceptId,
      questionId,
      action,
      response,
      isCorrect,
      responseTime,
      errorType
    );

    setLearnerState(updatedState);

    // Sync to Supabase asynchronously (non-blocking)
    if (supabaseService && isSupabaseReady) {
      const interaction: InteractionRecord = {
        conceptId,
        questionId,
        action,
        response,
        isCorrect,
        responseTime,
        errorType,
        timestamp: Date.now(),
        hintsUsed: 0,
        attemptNumber: 1
      };

      supabaseService.syncInteraction(interaction).catch((err: any) => {
        console.error('⚠️ Failed to sync interaction to Supabase:', err);
        // App continues to work - error is silent
      });

      // Record error pattern if answer was wrong
      if (!isCorrect && errorType) {
        supabaseService.recordErrorPattern(conceptId, errorType, `Question ${questionId}`).catch((err: any) => {
          console.error('⚠️ Failed to record error pattern:', err);
        });
      }
    }
  };

  const resetProgress = () => {
    learnerModelService.clearLearnerState();
    const newState = learnerModelService.initializeLearnerState('student_001');
    setLearnerState(newState);
  };

  return (
    <LearnerContext.Provider
      value={{
        learnerState,
        updateLearnerState,
        recordInteraction,
        resetProgress,
        isSupabaseReady
      }}
    >
      {children}
    </LearnerContext.Provider>
  );
};

export const useLearner = () => {
  const context = useContext(LearnerContext);
  if (context === undefined) {
    throw new Error('useLearner must be used within a LearnerProvider');
  }
  return context;
};
