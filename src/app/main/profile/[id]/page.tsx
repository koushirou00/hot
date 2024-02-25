// src/app/main/profile/[id]/page.tsx
import React from 'react';
import { fetchUserProfile } from '@/functions/api/user/fetchUserProfile';
import { fetchFollow } from '@/functions/api/follow/fetchFollow';
import { fetchFollowEvents } from '@/functions/api/event/fetchFollowEvents';

import { MyPage } from '@/app/main/profile/[id]/_components/MyPage';
import { OtherPage } from '@/app/main/profile/[id]/_components/OtherPage';
import { FollowStatus } from '@/app/main/profile/_components/follow/FollowStatus';
import { Posts } from '@/app/main/home/_components/posts/Posts';
import { fetchPosts } from '@/functions/api/post/fetchPosts';

export default async function Page({ params }: { params: { id: string } }) {
  const { loginUser } = await fetchUserProfile(); //auth tokenで取得
  // URLのuserIDが自分と異なる場合、他者ID取得
  const otherUserId = loginUser.id !== params.id && params.id;
  const targetUserId = otherUserId || loginUser.id;

  const { followArray } = await fetchFollow(targetUserId);
  const { followEventArray } = await fetchFollowEvents(targetUserId);
  const { posts } = await fetchPosts(targetUserId);

  return (
    <>
      {/* 自分と他者の個別部分 */}
      {loginUser.id === params.id ? (
        <MyPage user={loginUser} />
      ) : (
        otherUserId && <OtherPage loginUserId={loginUser.id} otherUserId={otherUserId} />
      )}

      <FollowStatus followArray={followArray} followEventArray={followEventArray} userId={targetUserId} />
      <Posts postArray={posts} />

      {loginUser.id === params.id && (
        <div className='mt-7 flex items-center justify-center'>
          <a
            href={`${process.env.URL}/main/profile/edit`}
            className='rounded-md bg-customeOrange px-5 py-[6px] text-center text-white'
          >
            編集する
          </a>
        </div>
      )}
    </>
  );
}
