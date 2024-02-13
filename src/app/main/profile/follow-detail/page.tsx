// src/app/main/profile/follow-detail/page.tsx
import React from 'react';
import { getFollow } from '@/functions/api/follow/getFollow';
import { PageBackHeader } from '@/app/main/_components/PageBackHeader';
import { Contents } from '@/app/main/profile/follow-detail/_components/Contents';

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
