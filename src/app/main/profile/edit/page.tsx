// src/app/main/profile/edit/page.tsx
import React, { Suspense } from 'react';
import { fetchUserProfile } from '@/functions/api/user/fetchUserProfile';
import { Loading } from '@/components/layouts/Loading';
import { Contents } from '@/features/main/profile/edit/components/Contents';
import { PageBackHeader } from '@/features/main/components/PageBackHeader';

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
