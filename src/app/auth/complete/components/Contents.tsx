// src/app/auth/complete/components/Contents.tsx
import React from 'react';
import Link from 'next/link';

async function postUserData() {
  const response = await fetch(`${process.env.URL}/api/user/`, {
    method: 'POST'
  });
  if (!response.ok) throw new Error(`ユーザー登録時のAPIで失敗しました: ${response}`);
  return response.json();
}

export const Contents: React.FC = async () => {
  const result = await postUserData();

  if (result.status === 403) {
    return (
      <div>
        <h1>すでに登録済みです</h1>
        <p>下記よりHOMEに移動してください</p>
        <Link className='text-blue-300' href='/auth'>
          HOME
        </Link>
      </div>
    );
  }

  return (
    <div>
      登録完了いたしました。下記よりログインしてください。
      <Link className='text-blue-300' href='/auth'>
        ログイン
      </Link>
    </div>
  );
};
