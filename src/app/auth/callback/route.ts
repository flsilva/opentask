import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Database } from '@/lib/database.types';
import { createUser } from '@/app/app/shared/user/user-model';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    await supabase.auth.exchangeCodeForSession(code);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      const { user } = session;

      createUser({
        id: user.id,
        email: user.email as string,
        name: user.user_metadata.full_name as string,
        provider: user.app_metadata.provider as string,
      });
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${requestUrl.origin}/app`);
}
