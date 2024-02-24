// src/app/page.tsx
import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layouts/Header';

export default function Home() {
  return (
    <div>
      <Header />
      <h1 className='text-3xl'>トップページ（LP）</h1>
      <p>
        未登録ユーザー、未ログインユーザーをここへ誘導 <br />
        ※ログイン中ならこのページへアクセスしてもmiddleware.tsによって「http://localhost:3000/main/home（ログインユーザーのhomeページ）」へリダイレクトされる
      </p>
      <Link href={'/auth'}>
        <div className='mx-auto mt-10 w-80 rounded border-2 border-black bg-orange-600 p-3 text-center font-bold'>
          ログインまたは会員登録はこちら
        </div>
      </Link>

      <p className='mt-5'>ログアウト中 or 未登録の場合は下記へアクセスしてもmiddleware.tsの処理でこのページへ戻ってきます。</p>
      <Link className='text-blue-300' href='/main/home' target='_blank'>
        http://localhost:3000/main/home（ログインユーザーのhomeページ）
      </Link>
    </div>
  );
}
