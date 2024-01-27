// src/app/main/profile/page.tsx
import React, { Suspense } from 'react';
import { Contents } from '@/app/main/profile/components/Contents';
import { Loading } from '@/app/components/Loading';

//このページに来ているということはsessionが確認されているので
//userIdも取得できるものと考える。

export default async function Page() {
  //サーバーコンポーネント
  //ここでつぶやきをfetchしてPostsコンポーネントに渡す
  return (
    <Suspense fallback={<Loading />}>
      <Contents />
    </Suspense>
  );
}
