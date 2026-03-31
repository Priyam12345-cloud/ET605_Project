import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LearnerState, InteractionRecord } from '../types/learner-model';
import { learnerModelService } from '../services/learner-model-service';
import { useAuth } from './AuthContext';
import { createSupabaseLearnerService, isSupabaseConfigured, SupabaseLearnerService } from '../../services/supabase-service';

const LEARNER_ID_MAP_KEY = 'its_learner_id_map';
const GUEST_LEARNER_ID_KEY = 'its_guest_learner_id';

function readLearnerIdMap(): Record<string, string> {
  try {
    const raw = localStorage.getItem(LEARNER_ID_MAP_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

function writeLearnerIdMap(map: Record<string, string>) {
  localStorage.setItem(LEARNER_ID_MAP_KEY, JSON.stringify(map));
}

function createUuid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getOrCreateLearnerId(email?: string): string {
  if (email) {
    const normalizedEmail = email.trim().toLowerCase();
    const map = readLearnerIdMap();

    if (!map[normalizedEmail]) {
      map[normalizedEmail] = createUuid();
      writeLearnerIdMap(map);
    }

    return map[normalizedEmail];
  }

  const existingGuestId = localStorage.getItem(GUEST_LEARNER_ID_KEY);
  if (existingGuestId) return existingGuestId;

  const guestId = createUuid();
  localStorage.setItem(GUEST_LEARNER_ID_KEY, guestId);
  return guestId;
}

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
  const { user } = useAuth();
  const [learnerState, setLearnerState] = useState<LearnerState | null>(null);
  const [learnerId, setLearnerId] = useState<string>('');
  const [isSupabaseReady, setIsSupabaseReady] = useState(false);
  const [supabaseService, setSupabaseService] = useState<SupabaseLearnerService | null>(null);

  useEffect(() => {
    const resolvedLearnerId = getOrCreateLearnerId(user?.email);
    setLearnerId(resolvedLearnerId);

    // Load or create learner state
    const state = learnerModelService.getOrCreateLearnerState(resolvedLearnerId);
    setLearnerState(state);

    // Initialize Supabase service
    setIsSupabaseReady(isSupabaseConfigured());
    if (isSupabaseConfigured()) {
      const service = createSupabaseLearnerService(resolvedLearnerId);
      setSupabaseService(service);

      // Ensure learner profile exists in Supabase so FK inserts can succeed.
      service
        .saveLearnerProfile({
          name: user?.name || 'Student',
          email: user?.email || 'guest@example.com',
          grade: 7,
        })
        .catch((err: unknown) => {
          console.error('Failed to save learner profile in Supabase:', err);
        });

      console.log('Supabase service initialized');
    } else {
      console.warn('Supabase not configured - using in-memory storage only');
    }
  }, [user?.email, user?.name]);

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
    const targetLearnerId = learnerId || getOrCreateLearnerId(user?.email);
    const newState = learnerModelService.initializeLearnerState(targetLearnerId);
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
