// src/app/main/profile/[id]/event-detail/page.tsx
import React from 'react';
import { PageBackHeader } from '@/app/main/_components/PageBackHeader';
import { fetchFollowEvents } from '@/functions/api/event/fetchFollowEvents';
import { FollowEvents } from '@/app/main/profile/_components/event/FollowEvents';

export default async function Page({ params }: { params: { id: string } }) {
  const { followEventArray } = await fetchFollowEvents(); //auth tokenで取得
  const loginUserId = followEventArray[0].userId;
  // URLのuserIDが自分と同じでない場合に他者も取得。
  const result = loginUserId === params.id ? null : await fetchFollowEvents(params.id);
  const otherFollowEventArray = result && result.followEventArray;

  return (
    <div>
      <PageBackHeader />
      <FollowEvents myFollowEventArray={followEventArray} otherFollowEventArray={otherFollowEventArray || null} />
    </div>
  );
}
