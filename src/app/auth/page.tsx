'use client';
import React, { useState } from 'react';
import { Signin } from '@/app/auth/_components/Signin';
import { Signup } from '@/app/auth/_components/Signup';

export default function Page() {
  const [display, setDisplay] = useState<string>('login');
  const handleDisplay = (type: string) => {
    setDisplay(type);
  };

  //タブで表示切り替え　デフォルトはログイン
  return (
    <div>
      <div className='mt-3 flex justify-around'>
        <button className='bg-slate-900 p-2 text-white' onClick={() => handleDisplay('login')}>
          ログイン
        </button>
        <button className='bg-yellow-300 p-2' onClick={() => handleDisplay('signup')}>
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
