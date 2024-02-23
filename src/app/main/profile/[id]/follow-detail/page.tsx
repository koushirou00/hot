// src/app/main/profile/[id]/page.tsx
import React from 'react';
import { fetchOtherUserProfile } from '@/functions/api/user/fetchOtherUserProfile';
import { PageBackHeader } from '@/app/main/_components/PageBackHeader';
import { fetchFollow } from '@/functions/api/follow/fetchFollow';

import { FollowNavigate } from '@/app/main/profile/_components/follow/FollowNavigate';

export default async function Page({ params }: { params: { id: string } }) {
  const { user } = await fetchOtherUserProfile(params.id, 'force-cache');
  const followArray = await fetchFollow(user.id);

  return (
    <div>
      <PageBackHeader />
      <FollowNavigate followArray={followArray} />
    </div>
  );
}
