// src/app/main/profile/[id]/page.tsx
import React from 'react';
import { User } from '@prisma/client';
import { fetchUserProfile } from '@/functions/api/user/fetchUserProfile';
import { fetchOtherUserProfile } from '@/functions/api/user/fetchOtherUserProfile';
import { fetchFollow } from '@/functions/api/follow/fetchFollow';

import { MyPage } from '@/app/main/profile/[id]/_components/MyPage';
import { OtherPage } from './_components/OtherPage';

export default async function Page({ params }: { params: { id: string } }) {
  const { loginUser } = await fetchUserProfile(); //auth tokenで承認
  const loginUserId = loginUser.id;
  // URLのuserIDが自分と同じでない場合に他者取得。
  const result = loginUserId === params.id ? null : await fetchOtherUserProfile(params.id);
  const otherUser: User = result?.otherUser;
  const fetchUserId = otherUser ? otherUser.id : loginUserId;
  const followArray = await fetchFollow(fetchUserId);

  return (
    <>
      {/* 自分のプロフィール */}
      {loginUserId === params.id ? (
        <MyPage user={loginUser} followArray={followArray} />
      ) : (
        otherUser !== null && <OtherPage user={otherUser} followArray={followArray} loginUserId={loginUserId} />
      )}
    </>
  );
}
