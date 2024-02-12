// src/app/main/profile/follow-detail/page.tsx
import React from 'react';
import { getFollow } from '@/functions/api/follow/getFollow';
import { PageBackHeader } from '@/features/main/components/PageBackHeader';
import { Contents } from '@/features/main/profile/follow-detail/components/Contents';

export default async function Page() {
  const response = await getFollow();
  const followArray = response;

  return (
    <div className=''>
      <PageBackHeader url={`${process.env.URL}/main/profile`} text={'プロフィールに戻る'} />
      <Contents followArray={followArray} />
    </div>
  );
}
