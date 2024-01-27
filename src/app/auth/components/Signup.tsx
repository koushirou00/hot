'use client';

import React from 'react';
import { supabaseClient } from '@/utils/supabaseClient';
import { useState } from 'react';

export const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
      options: { emailRedirectTo: `http://localhost:3000/auth/complete` }
    });

    // 登録されているメールアドレスの場合、空の配列が返る
    const identities = data.user?.identities;

    if (error) return alert('登録に失敗しました');
    console.log(error);

    if (identities?.length === 0) {
      alert('既に登録済みのメールアドレスです。');
    } else {
      setEmail('');
      setPassword('');
      alert('確認メールを送信しました。');
    }
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
            value={email}
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
            value={password}
          />
        </div>

        <div>
          <button
            type='submit'
            className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            登録
          </button>
        </div>
      </form>
    </div>
  );
};
