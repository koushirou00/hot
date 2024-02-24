// src/app/main/profile/[id]/page.tsx
import React from 'react';
import { fetchUserProfile } from '@/functions/api/user/fetchUserProfile';

import { MyPage } from '@/app/main/profile/[id]/_components/MyPage';
import { OtherPage } from '@/app/main/profile/[id]/_components/OtherPage';

export default async function Page({ params }: { params: { id: string } }) {
  const { loginUser } = await fetchUserProfile(); //auth tokenで取得
  // URLのuserIDが自分と同じでない場合に他者ページ表示。
  const otherUserId = loginUser.id !== params.id && params.id;

  return (
    <>
      {/* 自分のプロフィール */}
      {loginUser.id === params.id ? (
        <MyPage user={loginUser} />
      ) : (
        //　他者プロフィール
        otherUserId && <OtherPage loginUserId={loginUser.id} otherUserId={otherUserId} />
      )}
    </>
  );
}
