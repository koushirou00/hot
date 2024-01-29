// src/app/main/home/page.tsx
import React from 'react';
import Link from 'next/link';
import { Posts } from '@/app/main/components/Posts';
import { Header } from '@/app/main/components/Header';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Page() {
  const response = await fetch(`${process.env.URL}/api/user`);
  if (!response.ok) throw new Error('データの取得に失敗しました。');
  const resultUser = await response.json();
  console.log('resultUser:', resultUser);

  //サーバーコンポーネント
  //ここでつぶやきをfetchしてPostsコンポーネントに渡す
  return (
    <div>
      <Header />
      <h1 className='text-3xl'>ログインユーザーのHOME(つぶやき一覧ページ)</h1>
      <p className='mt-5'>ログイン中は下記へアクセスしてもmiddleware.tsの処理でこのページへ戻ってきます。</p>
      <Link className='text-blue-300' href='/' target='_blank'>
        http://localhost:3000（トップページ）
      </Link>

      <p className='mt-5'>下記のページも同様に、ログイン中にクリックしてもここへ戻ってきます</p>
      <Link className='text-blue-300' href='/auth' target='_blank'>
        http://localhost:3000/auth（ログイン & 新規登録ページ）
      </Link>

      <Posts />
    </div>
  );
}
