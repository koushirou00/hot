'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/app/utils/supabase';

export const Signin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert('ログインに失敗しました');
    } else {
      router.replace('/main/home');
    }

    // 下記はユーザーがUserモデル上から取得するページ。
    // このログインページでは不要。

    // const response = await fetch('/api/user', {
    //   headers: { Authorization: `Bearer ${data.session.access_token}` }
    // });
    // const result = await response.json();
    // console.log(result);
    // if (result?.status === 401) return alert('認証に失敗しました。時間をおいてお試しください');
    // if (response.ok) return router.replace('/main/home');
  };

  return (
    <div className='flex justify-center pt-[240px]'>
      <form onSubmit={handleSubmit} className='space-y-4 w-full max-w-[400px]'>
        <div>
          <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900'>
            メールアドレス
          </label>
          <input
            type='email'
            name='email'
            id='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='name@company.com'
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900'>
            パスワード
          </label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='••••••••'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            required
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button
            type='submit'
            className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            ログイン
          </button>
        </div>
      </form>
    </div>
  );
};