// src/app/main/profile/[id]/follow-detail/page.tsx
import React from 'react';
import { PageBackHeader } from '@/app/main/_components/PageBackHeader';
import { fetchFollow } from '@/functions/api/follow/fetchFollow';

import { FollowNavigate } from '@/app/main/profile/_components/follow/FollowNavigate';
import { fetchUserProfile } from '@/functions/api/user/fetchUserProfile';

export default async function Page({ params }: { params: { id: string } }) {
  const { followArray } = await fetchFollow(); //auth tokenで取得
  const { loginUser } = await fetchUserProfile('', 'force-cache');
  // URLのuserIDが自分と同じでない場合に他者も取得。
  const otherFollowData = loginUser.id === params.id ? null : await fetchFollow(params.id);

  return (
    <div>
      <PageBackHeader />
      <FollowNavigate
        myFollowArray={followArray}
        otherFollowArray={otherFollowData?.followArray ? otherFollowData?.followArray : null}
      />
    </div>
  );
}
