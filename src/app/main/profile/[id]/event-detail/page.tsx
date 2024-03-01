// src/app/main/profile/[id]/event-detail/page.tsx
import React from 'react';
import { serverApi } from '@/functions/api/serverApi';
import { PageBackHeader } from '@/app/main/_components/PageBackHeader';
import { FollowEvents } from '@/app/main/profile/_components/event/FollowEvents';

export default async function Page({ params }: { params: { id: string } }) {
  const api = serverApi();
  const { loginUser } = await api.getLoginUser('force-cache');
  const { followEventArray } = await api.getFollowEvent(loginUser.id);
  // URLのuserIDが自分と同じでない場合に他者も取得。
  const result = loginUser.id === params.id ? null : await api.getFollowEvent(params.id);
  const otherFollowEventArray = result && result.followEventArray;

  return (
    <div>
      <PageBackHeader />
      <FollowEvents myFollowEventArray={followEventArray} otherFollowEventArray={otherFollowEventArray || null} />
    </div>
  );
}
