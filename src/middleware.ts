import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Database } from '@/lib/database.types';

/*
 * "Next.js Middleware runs immediately before each route is rendered.
 * We'll use Middleware to refresh the user's session before loading Server Component routes."
 * From:
 * https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
 */
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  await supabase.auth.getSession();
  return res;
}
