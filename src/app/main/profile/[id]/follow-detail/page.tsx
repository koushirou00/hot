// src/app/main/profile/[id]/follow-detail/page.tsx
import React from 'react';
import { serverApi } from '@/functions/api/serverApi';
import { PageBackHeader } from '@/app/main/_components/PageBackHeader';
import { FollowNavigate } from '@/app/main/profile/_components/follow/FollowNavigate';

export default async function Page({ params }: { params: { id: string } }) {
  const api = serverApi();
  const { loginUser } = await api.getLoginUser('force-cache');
  const { followArray } = await api.getFollow(loginUser.id);

  // URLのuserIDが自分と同じでない場合、比較が必要なため他者も取得。
  const otherFollowData = loginUser.id === params.id ? null : await api.getFollow(params.id);

  return (
    <div>
      <PageBackHeader />
      <FollowNavigate myFollowArray={followArray} otherFollowArray={otherFollowData?.followArray ? otherFollowData?.followArray : null} />
    </div>
  );
}
