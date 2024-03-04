// src/app/main/home/page.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { Posts } from '@/app/main/home/_components/posts/Posts';
import { Header } from '@/app/main/_components/Header';

export default function Page() {
  /*
  ここで自身のフォロー中イベントに関するつぶやきをfetchしてPostsコンポーネントに渡す
  自分のフォローイベントフェッチ→それを元にfindManyでpostsをフェッチ
  */

  return (
    <div>
      <Header />
      <h1 className='text-3xl'>ログインユーザーのHOME(つぶやき一覧ページ)</h1>
      <Link className='text-blue-300' href='/main/profile' target='_blank'>
        http://localhost:3000/main/profile（プロフィールページ）
      </Link>
      {/* <Posts /> */}
    </div>
  );
}
