// src/app/main/profile/[id]/event-detail/page.tsx
import React from 'react';
import { PageBackHeader } from '@/app/main/_components/PageBackHeader';

import { FollowNavigate } from '@/app/main/profile/_components/follow/FollowNavigate';
import { fetchFollowEvents } from '@/functions/api/event/fetchFollowEvents';
import { fetchOtherUserProfile } from '@/functions/api/user/fetchOtherUserProfile';
import { fetchUserProfile } from '@/functions/api/user/fetchUserProfile';
import { User } from '@prisma/client';

export default async function Page({ params }: { params: { id: string } }) {
  const { loginUser } = await fetchFollowEvents(); //auth tokenで承認
  const loginUserId = loginUser.id;
  // URLのuserIDが自分と同じでない場合に他者取得。
  const result = loginUserId === params.id ? null : await fetchOtherUserProfile(params.id);
  const otherUser: User = result?.otherUser;
  const fetchUserId = otherUser ? otherUser.id : loginUserId;
  const followArray = await fetchFollowEvents(params.id);

  // 相手のフォローイベント一覧に自分のフォローしていないイベントがあったらフォローボタン。
  // 自分のプロフィールの場合はシンプルに表示するだけ

  return (
    <div>
      <PageBackHeader />
      <FollowNavigate followArray={followArray} />
    </div>
  );
}
