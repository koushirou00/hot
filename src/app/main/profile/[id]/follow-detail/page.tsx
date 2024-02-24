// src/app/main/profile/[id]/follow-detail/page.tsx
import React from 'react';
import { PageBackHeader } from '@/app/main/_components/PageBackHeader';
import { fetchFollow } from '@/functions/api/follow/fetchFollow';

import { FollowNavigate } from '@/app/main/profile/_components/follow/FollowNavigate';

export default async function Page({ params }: { params: { id: string } }) {
  const { followArray } = await fetchFollow(params.id);

  return (
    <div>
      <PageBackHeader />
      <FollowNavigate followArray={followArray} />
    </div>
  );
}
