'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export const Error: React.FC = () => {
  const router = useRouter();

  const handleRefresh = async () => {
    router.refresh();
    router.replace('/');
  };

  return (
    <div className='p-4 text-white bg-red-600 flex flex-col items-center'>
      <h1 className='text-lg font-bold'>エラーが発生しました</h1>
      <p className='mb-4'>申し訳ございませんが、下のボタンよりホームページに戻るか、ページを更新してください。</p>
      <button onClick={handleRefresh} className='px-4 py-2 bg-white text-black rounded'>
        ホームに戻る
      </button>
    </div>
  );
};
