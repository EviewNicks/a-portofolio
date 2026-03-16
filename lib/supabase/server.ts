import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Server-side Supabase client using service role key
// Use this in API routes and Server Components that need elevated access
export function createServerClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
