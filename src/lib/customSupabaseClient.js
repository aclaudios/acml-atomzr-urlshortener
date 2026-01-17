import { createClient } from '@supabase/supabase-js';

// Supabase configuration from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a fallback mock client for local development without Supabase
const createMockClient = () => {
  const mockAuth = {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: (callback) => {
      callback('SIGNED_OUT', null);
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
    signUp: async () => ({ data: null, error: { message: 'Supabase not configured. Using local storage only.' } }),
    signInWithPassword: async () => ({ data: null, error: { message: 'Supabase not configured. Using local storage only.' } }),
    signInWithOAuth: async () => ({ error: { message: 'Supabase not configured. Using local storage only.' } }),
    signOut: async () => ({ error: null }),
  };

  const mockFrom = (table) => ({
    select: (columns = '*') => ({
      eq: () => ({
        maybeSingle: async () => ({ data: null, error: null }),
        single: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      }),
      single: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
    }),
    insert: () => ({
      select: () => ({
        single: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      }),
    }),
    delete: () => ({
      eq: () => ({ eq: async () => ({ error: { message: 'Supabase not configured' } }) }),
    }),
    update: () => ({
      eq: () => ({ eq: async () => ({ error: { message: 'Supabase not configured' } }) }),
    }),
  });

  return {
    auth: mockAuth,
    from: mockFrom,
  };
};

// Check if Supabase is properly configured
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && 
  supabaseUrl.startsWith('http') && 
  supabaseAnonKey.length > 20;

// Create Supabase client or mock client
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient();

// Export a flag to check if using real Supabase
export const isUsingSupabase = isSupabaseConfigured;

// Log the mode for debugging
if (!isSupabaseConfigured) {
  console.warn('⚠️ Supabase not configured. Running in local-only mode with localStorage.');
  console.info('To enable Supabase, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}
