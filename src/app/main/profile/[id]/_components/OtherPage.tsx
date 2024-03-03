// src/app/main/profile/[id]/_components/OtherPage.tsx
import React from 'react';

import { formatOtherFollowData } from '@/app/main/profile/_components/follow/functions/formatOtherFollowData';
import { FollowHandler } from '@/app/main/profile/_components/follow/FollowHandler/FollowHandler';

import { PageBackHeader } from '@/app/main/_components/PageBackHeader';
import { UserIcon } from '@/app/main/_components/icons/UserIcon';
import { LockIcon } from '@/app/main/_components/icons/LockIcon';
import { OtherSns } from '@/app/main/_components/icons/OtherSns';
import { serverApi } from '@/functions/api/serverApi';

type OtherPageProps = {
  otherUserId: string;
};

export const OtherPage: React.FC<OtherPageProps> = async ({ otherUserId }) => {
  const api = serverApi();

  const { loginUser } = await api.getLoginUser('force-cache');
  const loginUserId = loginUser.id;
  const { user } = await api.getOtherUser(otherUserId);
  const { followArray } = await api.getFollow(otherUserId);

  const { getFollowRecord, getFollowerRecord, isPendingFollow, isFollow, isPendingFollower, isFollower } = formatOtherFollowData({
    followArray,
    loginUserId
  });

  return (
    <>
      <PageBackHeader />
      <div className='p-6'>
        <div>
          <UserIcon src={user.icon || ''} alt={''} size='large' />
        </div>
        <div>
          <div className='flex justify-center'>
            <p>{user.name}</p>
            {user.lock && <LockIcon />}
          </div>
          {isFollower && <p className='mx-auto w-[108px] rounded bg-gray-300 p-[2px] text-center text-[10px]'>フォローされています</p>}
          <div className='mt-5'>
            {/* 自分が相手相手をフォロー中 or 相手が自分にフォロー申請中（承諾待ち） or 全く何もしていない */}
            {isFollow ? (
              <FollowHandler handler='followDelete' recordId={getFollowerRecord?.id} />
            ) : isPendingFollow ? (
              <FollowHandler handler='followRequestCancel' recordId={getFollowerRecord?.id} />
            ) : user.lock ? (
              <FollowHandler handler='newFollowRequest' otherUserId={user.id} />
            ) : (
              <FollowHandler handler='newFollow' otherUserId={user.id} />
            )}
          </div>
          <p className='mt-4 text-justify'>{user.introduction || 'よろしくお願いします'}</p>
        </div>
        <div>
          {/* 相手が自分へフォロー申請中 or フォロワー */}
          {isPendingFollower ? (
            <div className='mx-auto mt-3 w-60'>
              <p className='mb-2 text-center'>フォローリクエストが来ています</p>
              <FollowHandler handler='approveOrRejection' recordId={getFollowRecord?.id} />
            </div>
          ) : (
            isFollower && <FollowHandler handler='followerDelete' recordId={getFollowRecord?.id} />
          )}
        </div>
        <div className='mt-7'>
          <OtherSns xLink={user.x} instagramLink={user.instagram} />
        </div>
      </div>
    </>
  );
};
