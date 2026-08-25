import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Clés publiques du projet Supabase (configurées en dur comme fallback sécurisé pour les clients statiques)
const FALLBACK_SUPABASE_URL = 'https://vcwmimliszriqldnvvsr.supabase.co';
const FALLBACK_SUPABASE_KEY = 'sb_publishable__N-rqlctqKmt1QYzmUwsDw_n7ThWhEd';

export function getSupabaseClient(): SupabaseClient {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_SUPABASE_URL;

  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    FALLBACK_SUPABASE_KEY;

  return createClient(supabaseUrl, supabaseKey);
}

export const supabase = getSupabaseClient();
