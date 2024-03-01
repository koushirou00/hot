// src/app/main/profile/_components/follow/Followers.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { followListProps } from '@/types/follow';

import { FollowHandler } from '@/app/main/profile/_components/follow/FollowHandler/FollowHandler';

import { UserIcon } from '@/app/main/_components/icons/UserIcon';
import { LockIcon } from '@/app/main/_components/icons/LockIcon';

export const Followers: React.FC<followListProps> = ({ followList, myFollowsUserIdList, myFollowersUserIdList, isLoginUserPage }) => {
  return (
    <div>
      <ul className='mb-40 px-4'>
        {followList.map((record) => {
          if (!isLoginUserPage && record.status === 'pending') return null; //他者ページの場合保留は表示しない
          return (
            <li key={record.id} className='mt-5'>
              <div className='flex justify-between'>
                <Link href={`/main/profile/${record.user.id}`}>
                  <div className='flex'>
                    <UserIcon size='mini' src={record.user.icon || ''} alt={''} />
                    <div className='ml-2'>
                      {record.user.lock ? (
                        <div className='flex'>
                          <p className='line-clamp-1 max-w-[172px] overflow-hidden text-sm'>{record.user.name}</p>
                          <LockIcon />
                        </div>
                      ) : (
                        <p className='line-clamp-1 max-w-[192px] overflow-hidden text-sm'>{record.user.name}</p>
                      )}
                      {/* 他者ページのみ表示 */}
                      {!isLoginUserPage && myFollowersUserIdList.has(record.userId) ? (
                        <div className='mb-3 w-fit rounded bg-gray-300 px-1 py-[1px] text-center text-[10px]'>フォローされています</div>
                      ) : (
                        /* 自分のページで表示 */
                        isLoginUserPage &&
                        myFollowsUserIdList.has(record.userId) && (
                          <div className='mb-3 w-fit rounded bg-gray-300 px-1 py-[1px] text-center text-[10px]'>フォローしています</div>
                        )
                      )}
                    </div>
                  </div>
                </Link>
                {/* 保留中なら承諾、拒否の選択（自分のページのみ表示） */}
                {record.status === 'pending' && <FollowHandler handler={'approveOrRejection'} recordId={record.id} />}
                {/* フォロー中：他者ページのみ表示 */}
                {!isLoginUserPage && myFollowsUserIdList.has(record.userId) && (
                  <div className='h-1/3 rounded bg-blue-100 p-1 text-center text-[10px] '>フォロー中</div>
                )}
              </div>
              <p className='ml-[42px] mt-[-6px] flex w-[300px] flex-row flex-wrap text-justify text-xs'>{record.user.introduction}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
