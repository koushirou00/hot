// src/app/main/profile/edit/page.tsx
import React, { Suspense } from 'react';
import { fetchUserProfile } from '@/functions/api/user/fetchUserProfile';
import { Loading } from '@/components/layouts/Loading';
import { Contents } from '@/app/main/profile/edit/_components/Contents';
import { PageBackHeader } from '@/app/main/_components/PageBackHeader';

export default async function Page() {
  const { user } = await fetchUserProfile();
  return (
    <div>
      <PageBackHeader url='/main/profile' text='プロフィールに戻る' />
      <Suspense fallback={<Loading />}>
        <Contents user={user} />
      </Suspense>
    </div>
  );
}
