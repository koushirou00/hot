'use client';
import React, { useState } from 'react';
import { Signin } from '@/features/auth/components/Signin';
import { Signup } from '@/features/auth/components/Signup';

export default function Page() {
  const [display, setDisplay] = useState<string>('login');
  const handleDisplay = (type: string) => {
    setDisplay(type);
  };

  //タブで表示切り替え　デフォルトはログイン
  return (
    <div>
      <div className='mt-3 flex justify-around'>
        <button className='p-2 bg-slate-900 text-white' onClick={() => handleDisplay('login')}>
          ログイン
        </button>
        <button className='p-2 bg-yellow-300' onClick={() => handleDisplay('signup')}>
          新規登録
        </button>
      </div>
      {display === 'login' ? (
        <div>
          <h1 className='mt-5 text-center text-3xl'>表示中：ログイン</h1>
          <Signin />
        </div>
      ) : (
        <div>
          <h1 className='mt-5 text-center text-3xl'>表示中：新規登録</h1>
          <Signup />
        </div>
      )}
    </div>
  );
}
