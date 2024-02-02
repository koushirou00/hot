// src/app/auth/complete/page.tsx
import { Loading } from '@/components/layouts/Loading';
import React from 'react';
import Link from 'next/link';
import { postUser } from '@/functions/user/postUser';

export default async function Page() {
  const result = await postUser();
  if (result == null) return <Loading />;

  return result.status === 403 ? (
    <div>
      <h1>すでに登録済みです</h1>
      <p>下記よりHOMEに移動してください</p>
      <Link className='text-blue-300' href='/auth'>
        HOME
      </Link>
    </div>
  ) : (
    <div>
      登録完了いたしました。下記よりログインしてください。
      <Link className='text-blue-300' href='/auth'>
        ログイン
      </Link>
    </div>
  );
}
