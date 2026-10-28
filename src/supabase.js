import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = url && key ? createClient(url, key, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
}) : null;

export const hasSupabase = Boolean(supabase);

export async function signInWithPassword(email, password) {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi. Demo lokal tetap dapat digunakan.');
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUpWithPassword(email, password, fullName = '') {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi.');
  return supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
}

export async function signOut() {
  if (supabase) return supabase.auth.signOut();
}
