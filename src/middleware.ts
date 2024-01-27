import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { REDIRECT_PATHS } from './const/url';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
    error
  } = await supabase.auth.getSession();

  const token = session?.access_token;
  const path = req.nextUrl.pathname;

  if (error) console.log('ミドルウェアでのエラー: ', error);

  // ログインしていない場合、"/main"以下を"/"へリダイレクト
  if (!token && path.startsWith('/main')) {
    return NextResponse.redirect(new URL(REDIRECT_PATHS.unauthenticated, req.url));
  }

  if (path === '/auth/complete') {
    console.log('completeはバリデーションなしで通過');
    return res;
  }

  // ログインしている場合、"/auth"と"/"（トップページ）を"/main/home"へリダイレクト
  if (token && (path === '/auth' || path === '/')) {
    return NextResponse.redirect(new URL(REDIRECT_PATHS.authenticated, req.url));
  }

  return res;
}

export const config = {
  // "/usage"(アプリ使い方)と"contact"ページはmiddlewareなし。
  matcher: ['/', '/auth', '/main/:path*']
};
