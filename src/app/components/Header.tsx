'use client';
import React from 'react';
import { supabaseClient } from '../utils/supabase';
import { useRouter } from 'next/navigation';

export const Header: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    router.refresh();
    return router.replace('/');
  };

  return (
    <header className='p-2 text-white bg-blue-950 flex justify-around items-center'>
      <div>ここはヘッダーです</div>
      <button onClick={handleLogout} className='p-3 bg-white text-black rounded'>
        ログアウト
      </button>
    </header>
  );
};
