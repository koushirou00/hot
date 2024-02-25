'use client';
import React from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { FollowArrayProps } from '@/types/follow';

import { formatMyFollowData } from '@/app/main/profile/_components/follow/functions/formatMyFollowData';
import { FollowHandler } from '@/app/main/profile/_components/follow/FollowHandler/FollowHandler';

import { UserIcon } from '@/app/main/_components/icons/UserIcon';
import { LockIcon } from '@/app/main/_components/icons/LockIcon';
import { useUserId } from '@/hooks/useUserId';

// loginUser = 自分のプロフィールの場合のみtrue
export const Follows: React.FC<FollowArrayProps> = ({ followArray }) => {
  const { sortedFollowsArray, isFollower } = formatMyFollowData({ followArray });

  // パラメータを取得
  const params = useParams();
  const myUserId = useUserId();
  const loginUser = params.id === myUserId;

  return (
    <div>
      <ul className='mb-40 px-4'>
        {sortedFollowsArray.map((record) => (
          <li key={record.id} className='mt-5'>
            <div className='flex justify-between'>
              <Link href={`/main/profile/${record.followingId}`}>
                <div className='flex'>
                  <UserIcon size='mini' src={record.followingUser.icon || ''} alt={''} />
                  <div className='ml-1'>
                    <div
                      className={`line-clamp-1 flex overflow-hidden text-sm ${(loginUser || !isFollower(record.followingId)) && 'mt-1'}`}
                    >
                      <p className={`truncate ${record.followingUser.lock ? 'max-w-[172px]' : 'max-w-[192px]'}`}>
                        {record.followingUser.name}
                      </p>
                      {record.followingUser.lock && <LockIcon />}
                    </div>
                    {/* 自分のページのみ表示 */}
                    {loginUser && isFollower(record.followingId) && (
                      <div className='w-[108px] rounded bg-gray-300 p-[2px] text-center text-[10px]'>フォローされています</div>
                    )}
                  </div>
                </div>
              </Link>
              {/* 自分のページのみ表示 */}
              {loginUser && record.status === 'pending' && <FollowHandler handler={'followRequestCancel'} recordId={record.id} />}
            </div>
            <p
              className={`ml-[42px] flex w-[300px] flex-row flex-wrap text-justify text-xs ${
                loginUser && isFollower(record.followingId) ? 'mt-1' : 'mt-[-6px]'
              } `}
            >
              {record.followingUser.introduction}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
