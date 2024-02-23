'use client';
import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FollowArrayProps } from '@/types/follow';

import { formatMyFollowData } from '@/app/main/profile/_components/follow/functions/formatMyFollowData';
import { FollowHandler } from '@/app/main/profile/_components/follow/FollowHandler/FollowHandler';

import { UserIcon } from '@/app/main/_components/icons/UserIcon';
import { LockIcon } from '@/app/main/_components/icons/LockIcon';

export const Followers: React.FC<FollowArrayProps> = ({ followArray }) => {
  const searchParams = useSearchParams();
  const loginUser = searchParams.get('user') === 'my';

  const { isFollow, sortedFollowersArray } = formatMyFollowData({ followArray });

  return (
    <div>
      <ul className='mb-40 px-4'>
        {sortedFollowersArray.map((record) => (
          <li key={record.id} className='mt-5'>
            <div className='flex justify-between'>
              <Link href={`/main/profile/${record.user.id}`}>
                <div className='flex'>
                  <UserIcon size='mini' src={record.user.icon || ''} alt={''} />
                  <div className='ml-1'>
                    {record.user.lock ? (
                      <div className='flex'>
                        <p
                          className={`${loginUser && !isFollow(record.userId) && 'mt-1'} line-clamp-1 max-w-[172px] overflow-hidden text-sm`}
                        >
                          {record.user.name}
                        </p>
                        <LockIcon />
                      </div>
                    ) : (
                      <p className={`${!isFollow(record.userId) && 'pt-1'} line-clamp-1 max-w-[192px] overflow-hidden text-sm`}>
                        {record.user.name}
                      </p>
                    )}
                    {/* 自分のページのみ表示 */}
                    {loginUser && isFollow(record.userId) && (
                      <div className='w-[96px] rounded bg-gray-300 p-[2px] text-center text-[10px]'>フォローしています</div>
                    )}
                  </div>
                </div>
              </Link>
              {/* 自分のページのみ表示 */}
              {loginUser && record.status === 'pending' && <FollowHandler handler={'approveOrRejection'} recordId={record.id} />}
            </div>
            <p
              className={`ml-[42px] flex w-[300px] flex-row flex-wrap text-justify text-xs ${
                loginUser && isFollow(record.userId) ? 'mt-1' : 'mt-[-6px]'
              } `}
            >
              {record.user.introduction}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
