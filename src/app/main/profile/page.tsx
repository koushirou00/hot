// src/app/main/profile/page.tsx
import React, { Suspense } from 'react';
import { Contents } from '@/features/main/profile/components/Contents';
import { Loading } from '@/components/layouts/Loading';

export default async function Page() {
  //サーバーコンポーネント
  //ここでつぶやきをfetchしてPostsコンポーネントに渡す
  return (
    <Suspense fallback={<Loading />}>
      <Contents />
    </Suspense>
  );
}
