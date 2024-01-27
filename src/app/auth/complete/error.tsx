'use client';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <div className='mx-auto text-center'>
        ------開発環境のみ使用---------
        <h2>{error.message}</h2>
        ----------------------------
      </div>
      <div className='p-4 text-white bg-red-600 flex flex-col items-center'>
        <h1 className='text-lg font-bold'>エラーが発生しました</h1>
        <p className='mb-4'>申し訳ございませんが、下のボタンよりホームページに戻るか、ページを更新してください。</p>
        <button onClick={() => reset()} className='px-4 py-2 bg-white text-black rounded'>
          再度試す
        </button>
      </div>
    </div>
  );
}
