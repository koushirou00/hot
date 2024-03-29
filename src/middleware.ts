import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, NextRequest } from 'next/server';
import { REDIRECT_PATHS } from '@/constants/url';

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

  if (path === '/auth/complete') return res;

  // ログインしている場合、"/auth"と"/"（トップページ）を"/main/home"へリダイレクト
  if (token && (path === '/auth' || path === '/')) {
    return NextResponse.redirect(new URL(REDIRECT_PATHS.authenticated, req.url));
  }

  // プロフィールページのURLのuserIdがログインユーザーと同じ場合リダイレクト
  if (token && path.includes(`profile/${session.user.id}`)) {
    const segments = path.split('/').filter(Boolean);
    if (segments.length === 3 && segments[2] === session.user.id) {
      return NextResponse.redirect(new URL(REDIRECT_PATHS.myProfile, req.url));
    }
  }

  return res;
}

export const config = {
  // "/usage"(アプリ使い方)と"contact"ページはmiddlewareなし。
  matcher: ['/', '/auth', '/main/:path*']
};
