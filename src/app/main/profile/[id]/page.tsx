// src/app/main/profile/[id]/page.tsx
import React from 'react';

import { OtherPage } from '@/app/main/profile/[id]/_components/OtherPage';
import { FollowStatus } from '@/app/main/profile/_components/follow/FollowStatus';
import { Posts } from '@/app/main/home/_components/posts/Posts';
import { serverApi } from '@/functions/api/serverApi';

/*
  middlewareによりこのページに来たときにloginUserかどうか判断
  ログインユーザーの場合：main/profile へ遷移
  ログインユーザーでない場合： このまま滞在
 */

export default async function Page({ params }: { params: { id: string } }) {
  const api = serverApi();
  const otherUserId = params.id;

  const { followArray } = await api.getFollow(otherUserId);
  const { followEventArray } = await api.getFollowEvent(otherUserId);
  const { posts } = await api.getPosts(otherUserId);

  return (
    <>
      <OtherPage otherUserId={otherUserId} />
      <FollowStatus followArray={followArray} followEventArray={followEventArray} userId={otherUserId} />
      <Posts postArray={posts} />
    </>
  );
}
