// src/app/main/profile/follow-detail/page.tsx
import React from 'react';
import { fetchFollow } from '@/functions/follow/fetchFollow';
import { Header } from '@/features/main/profile/follow-detail/components/Header';
import { Contents } from '@/features/main/profile/follow-detail/components/Contents';

export default async function Page() {
  const response = await fetchFollow();
  const followArray = response;

  return (
    <div className=''>
      <Header />
      <Contents followArray={followArray} />
    </div>
  );
}
