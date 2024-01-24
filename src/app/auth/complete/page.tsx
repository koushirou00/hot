'use client';
import React, { useEffect } from 'react';
import { useSupabaseSession } from '@/app/hooks/useSupabaseSession';
import useSWR from 'swr';
import { Loading } from '@/app/components/Loading';
import Link from 'next/link';

const fetcher = async ([url, token]: Array<string>) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('データの取得に失敗しました。');
  return await response.json();
};

export default function Page() {
  const { token, isLoading } = useSupabaseSession();
  const { data, error } = useSWR(token ? ['/api/user', token] : null, fetcher);

  useEffect(() => {
    if (isLoading) return;
    if (data) {
      if (data.status === 401) return alert('認証に失敗しました。時間をおいてお試しください');
    }
    if (error) return console.log('エラー：', error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, data, error]);

  if (isLoading) return <Loading />;

  return (
    <div>
      登録完了の旨を伝え、ログインページへ誘導。
      <Link className='text-blue-300' href='/auth'>
        ログインページ
      </Link>
    </div>
  );
}
