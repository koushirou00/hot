// src/app/main/profile/_components/follow/Follows.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { followListProps } from '@/types/follow';

import { FollowHandler } from '@/app/main/profile/_components/follow/FollowHandler/FollowHandler';
import { UserIcon } from '@/app/main/_components/icons/UserIcon';
import { LockIcon } from '@/app/main/_components/icons/LockIcon';

// isLoginUserPage = 自分のプロフィールの場合のみtrue
export const Follows: React.FC<followListProps> = ({
  followList,
  myFollowsUserIdList,
  myFollowersUserIdList,
  isLoginUserPage
}) => {
  return (
    <div>
      <ul className='mb-40 px-4'>
        {followList.map((record) => {
          if (!isLoginUserPage && record.status === 'pending') return null; //他者ページの場合保留は表示しない
          return (
            <li key={record.id} className='mt-5'>
              <div className='flex justify-between'>
                <Link href={`/main/profile/${record.followingId}`}>
                  <div className='flex'>
                    <UserIcon size='mini' src={record.followingUser.icon || ''} alt={''} />
                    <div className='ml-2'>
                      <div className='mt-1 line-clamp-1 flex overflow-hidden text-sm'>
                        <p className={`truncate ${record.followingUser.lock ? 'max-w-[172px]' : 'max-w-[192px]'}`}>
                          {record.followingUser.name}
                        </p>
                        {record.followingUser.lock && <LockIcon />}
                      </div>
                      {myFollowersUserIdList.has(record.followingId) && (
                        <div className='mb-3 w-fit rounded bg-gray-300 px-1 py-[1px] text-center text-[10px]'>
                          フォローされています
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
                {/* 自分のページのみ表示 */}
                {record.status === 'pending' && <FollowHandler handler={'followRequestCancel'} recordId={record.id} />}
                {/* フォロー中：他者ページのみ表示 */}
                {!isLoginUserPage && myFollowsUserIdList.has(record.followingId) && (
                  <div className='h-1/3 rounded bg-blue-100 p-1 text-center text-[10px]'>フォロー中</div>
                )}
              </div>
              <p className='ml-[44px] mt-[-6px] flex w-[300px] flex-row flex-wrap text-justify text-xs'>
                {record.followingUser.introduction}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
