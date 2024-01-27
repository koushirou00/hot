import React, { Suspense } from 'react';
import { Loading } from '@/app/components/Loading';
import { Contents } from '@/app/auth/complete/components/Contents';

export default async function Page() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Contents />
      </Suspense>
    </div>
  );
}
