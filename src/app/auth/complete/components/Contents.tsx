// src/app/auth/complete/components/Contents.tsx
import React from 'react';
import { getAuthUser } from '@/utils/supabaseServer';
import Link from 'next/link';

async function postUserData(userId: string) {
  const response = await fetch(`${process.env.URL}/api/user/${userId}`, {
    method: 'POST'
  });
  if (!response.ok) throw new Error(`ユーザー登録時のAPIで失敗しました: ${response}`);
  return response.json();
}

export const Contents: React.FC = async () => {
  const data = await getAuthUser();
  const userId = data?.userData.id;
  if (!userId) throw new Error(`ユーザーIDが見つかりません: ${userId}`);
  const result = await postUserData(userId);

  if (result.status === 200) {
    return (
      <div>
        登録完了いたしました。下記よりログインしてください。
        <Link className='text-blue-300' href='/auth'>
          ログインページ
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>すでに登録済みです</h1>
      <p>下記よりHOMEに移動してください</p>
      <Link className='text-blue-300' href='/auth'>
        HOME
      </Link>
    </div>
  );
};
