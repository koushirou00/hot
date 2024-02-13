// src/app/main/profile/page.tsx
import React, { Suspense } from 'react';
import { fetchUserProfile } from '@/functions/api/user/fetchUserProfile';
import { Loading } from '@/components/layouts/Loading';
import { Contents } from '@/app/main/profile/_components/Contents';

export default async function Page() {
  const { user } = await fetchUserProfile();

  return (
    <Suspense fallback={<Loading />}>
      <Contents user={user} />
    </Suspense>
  );
}
