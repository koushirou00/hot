// src/app/main/profile/follow-detail/page.tsx
import React from 'react';
import { getFollow } from '@/functions/api/follow/getFollow';
import { Header } from '@/features/main/profile/follow-detail/components/Header';
import { Contents } from '@/features/main/profile/follow-detail/components/Contents';

export default async function Page() {
  const response = await getFollow();
  const followArray = response;

  return (
    <div className=''>
      <Header />
      <Contents followArray={followArray} />
    </div>
  );
}
