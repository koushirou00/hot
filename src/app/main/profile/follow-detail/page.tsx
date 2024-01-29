// src/app/main/profile/follow-detail/page.tsx
import React from 'react';
import { getUserProfile } from '@/functions/getUserProfile';
import { Header } from '@/app/main/profile/follow-detail/components/Header';
import { Contents } from '@/app/main/profile/follow-detail/components/Contents';

async function fetchFollows(userId: string) {
  const response = await fetch(`${process.env.URL}/api/follow/${userId}`);
  if (!response.ok) throw new Error(`フォローユーザー取得APIで失敗しました: ${response}`);
  return response.json();
}

export default async function Page() {
  const userData = await getUserProfile();
  const userId = userData.user.id;
  const response = await fetchFollows(userId);
  const followArray = response;

  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <Contents followArray={followArray} />
    </div>
  );
}
