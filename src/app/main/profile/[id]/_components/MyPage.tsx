// src/app/main/profile/[id]/_components/MyPage.tsx
import React, { Suspense } from 'react';
import { Event, User } from '@prisma/client';
import { FollowData } from '@/types/follow';

import { FollowStatus } from '@/app/main/profile/_components/follow/FollowStatus';
import { ContentsHeader } from '@/app/main/_components/ContentsHeader';
import { Loading } from '@/components/layouts/Loading';
import { UserIcon } from '@/app/main/_components/icons/UserIcon';
import { LockIcon } from '@/app/main/_components/icons/LockIcon';
import { OtherSns } from '@/app/main/_components/icons/OtherSns';

type MyPageProps = {
  user: User;
  followArray: FollowData;
};

export const MyPage: React.FC<MyPageProps> = ({ user, followArray }) => {
  return (
    <>
      <ContentsHeader text='プロフィール' />
      <Suspense fallback={<Loading />}>
        <div>
          <div className='w-screen bg-[#EFE1DA] pt-9'>
            <UserIcon src={user.icon || ''} alt={''} size='large' />
            <svg className='mt-3' viewBox='0 0 400 74' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M521 69.9972L506.528 62.4959C492.056 54.9945 463.111 39.9917 434.167 30.0055C405.222 19.8318 376.278 15.1434 347.333 22.5041C318.389 30.1462 289.444 49.8373 260.5 49.9779C231.556 49.8373 202.611 30.1462 173.667 17.4876C144.722 4.82901 115.778 0.140648 86.8333 -2.37253e-06C57.8889 0.140648 28.9444 4.82901 14.4722 7.50138L-3.8147e-06 9.98621V85H14.4722C28.9444 85 57.8889 85 86.8333 85C115.778 85 144.722 85 173.667 85C202.611 85 231.556 85 260.5 85C289.444 85 318.389 85 347.333 85C376.278 85 405.222 85 434.167 85C463.111 85 492.056 85 506.528 85H521V69.9972Z'
                fill='#FDFCFD'
              />
            </svg>
          </div>
          <div className='!-mt-14 p-6'>
            <div className='flex'>
              <p>{user.name}</p>
              {user.lock && <LockIcon />}
            </div>
            <p className='mt-2 text-justify'>{user.introduction || 'よろしくお願いします'}</p>
            <div className='mt-4'>
              <OtherSns xLink={user.x} instagramLink={user.instagram} />
            </div>
          </div>
        </div>
        <FollowStatus followArray={followArray} loginUserId={user.id} />
      </Suspense>
      <div className='mt-7 flex items-center justify-center'>
        <a
          href={`${process.env.URL}/main/profile/edit`}
          className='rounded-md bg-customeOrange px-5 py-[6px] text-center text-white'
        >
          編集する
        </a>
      </div>
    </>
  );
};
