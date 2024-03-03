'use client';
import React from 'react';
import { supabaseClient } from '@/lib/supabaseClient';
import { useSWRConfig } from 'swr';
import { useRouter } from 'next/navigation';

export const Header: React.FC = () => {
  const { cache } = useSWRConfig();
  const router = useRouter();

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    cache.delete('userId'); //SWRのキャッシュも削除
    router.refresh();
    return router.replace('/');
  };

  return (
    <header className='flex items-center justify-around bg-blue-950 p-2 text-white'>
      <div>ログイン中のヘッダーです</div>
      <button onClick={handleLogout} className='rounded bg-white p-3 text-black'>
        ログアウト
      </button>
    </header>
  );
};
