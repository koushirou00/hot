// src/app/main/profile/edit/page.tsx
import React, { Suspense } from 'react';
import { serverApi } from '@/functions/api/serverApi';
import { Loading } from '@/components/layouts/Loading';
import { Contents } from '@/app/main/profile/edit/_components/Contents';
import { PageBackHeader } from '@/app/main/_components/PageBackHeader';

export default async function Page() {
  const api = serverApi();
  const { loginUser } = await api.getLoginUser();
  return (
    <div>
      <PageBackHeader />
      <Suspense fallback={<Loading />}>
        <Contents user={loginUser} />
      </Suspense>
    </div>
  );
}
