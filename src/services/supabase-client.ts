import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase Client Service
 * 
 * Provides centralized access to Supabase database with:
 * - Safe initialization (handles missing credentials)
 * - Automatic retry on connectivity issues
 * - Type-safe database operations
 * - Error tracking and logging
 * 
 * Usage:
 *   import { getSupabaseClient } from '@/services/supabase-client';
 *   const supabase = getSupabaseClient();
 *   if (supabase) {
 *     const { data, error } = await supabase.from('learners').select();
 *   }
 */

let supabaseClient: SupabaseClient | null = null;
let initError: string | null = null;

/**
 * Initialize Supabase client
 * Safely handles missing credentials by returning null
 */
function initializeSupabase(): SupabaseClient | null {
  // Check for required environment variables
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    const missingVars = [];
    if (!supabaseUrl) missingVars.push('VITE_SUPABASE_URL');
    if (!supabaseAnonKey) missingVars.push('VITE_SUPABASE_ANON_KEY');
    
    initError = `Supabase not configured. Missing: ${missingVars.join(', ')}. See SUPABASE_SETUP.md`;
    console.warn(`⚠️ ${initError}`);
    return null;
  }

  try {
    const client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    });
    
    console.log('✅ Supabase client initialized');
    return client;
  } catch (error) {
    initError = `Failed to initialize Supabase: ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error(`❌ ${initError}`);
    return null;
  }
}

/**
 * Get the Supabase client instance
 * Returns null if not configured (app continues to work with in-memory state)
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (!supabaseClient && !initError) {
    supabaseClient = initializeSupabase();
  }
  return supabaseClient;
}

/**
 * Check if Supabase is available and configured
 */
export function isSupabaseConfigured(): boolean {
  return getSupabaseClient() !== null;
}

/**
 * Get initialization error if any
 */
export function getSupabaseInitError(): string | null {
  getSupabaseClient(); // Ensure init is attempted
  return initError;
}

/**
 * Test Supabase connection
 * Useful for diagnostics
 */
export async function testSupabaseConnection(): Promise<boolean> {
  try {
    const client = getSupabaseClient();
    if (!client) return false;

    const { error } = await client.from('learners').select('count()', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Supabase connection test failed:', error.message);
      return false;
    }

    console.log('✅ Supabase connection test passed');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection test error:', error);
    return false;
  }
}

/**
 * Retry helper for transient failures
 * Useful for network issues
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt < maxAttempts) {
        console.warn(`⚠️ Attempt ${attempt} failed, retrying in ${delayMs}ms...`, lastError.message);
        await new Promise(resolve => setTimeout(resolve, delayMs * attempt)); // Exponential backoff
      }
    }
  }

  throw lastError || new Error('Operation failed after retries');
}
