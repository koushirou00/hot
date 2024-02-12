// src/app/main/home/page.tsx
import React from 'react';
import Link from 'next/link';
import { Posts } from '@/features/main/home/components/Posts';
import { Header } from '@/features/main/components/Header';

export default function Page() {
  // const response = await fetch(`${process.env.URL}/api/user`);
  // if (!response.ok) throw new Error('データの取得に失敗しました。');
  // const resultUser = await response.json();
  // console.log('resultUser:', resultUser);

  //サーバーコンポーネント
  //ここでつぶやきをfetchしてPostsコンポーネントに渡す
  return (
    <div>
      <Header />
      <h1 className='text-3xl'>ログインユーザーのHOME(つぶやき一覧ページ)</h1>

      <Link className='text-blue-300' href='/main/profile' target='_blank'>
        http://localhost:3000/main/profile（プロフィールページ）
      </Link>

      <Posts />
    </div>
  );
}
