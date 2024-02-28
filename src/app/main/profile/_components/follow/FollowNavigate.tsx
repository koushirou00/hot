// src/app/main/profile/_components/follow/FollowNavigate.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FollowArrayProps } from '@/types/follow';
import { Follows } from '@/app/main/profile/_components/follow/Follows';
import { Followers } from '@/app/main/profile/_components/follow/Followers';
import { Loading } from '@/components/layouts/Loading';
import { formatMyFollow } from './functions/formatMyFollow';

export const FollowNavigate: React.FC<FollowArrayProps> = ({ myFollowArray, otherFollowArray }) => {
  const searchParams = useSearchParams();
  const [show, setShow] = useState<string>('');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (!tab) return setShow('follows');
    setShow(tab);
  }, [searchParams]);

  if (!show) return <Loading />;

  const isLoginUserPage = otherFollowArray === null; // 自分のプロフィールの場合のみtrue
  const { myFollowsUserIdList, myFollowersUserIdList } = formatMyFollow({ myFollowArray });
  const displayFollowArray = otherFollowArray || myFollowArray;

  return (
    <div>
      <div className='mt-5'>
        <div className='flex justify-around border-b'>
          <div
            className={`
            ${show === 'follows' ? 'border-b border-blue-500' : 'opacity-70'} cursor-pointer
          `}
            onClick={() => setShow('follows')}
          >
            {`フォロー（${displayFollowArray.follows.length}）`}
          </div>
          <div
            className={`
              ${show === 'followers' ? 'border-b border-blue-500' : 'opacity-70'} cursor-pointer
            `}
            onClick={() => setShow('followers')}
          >
            {`フォロワー（${displayFollowArray.followers.length}）`}
          </div>
        </div>
        {show === 'follows' ? (
          displayFollowArray.follows.some((record) => record.status === 'approved') ||
          (isLoginUserPage && displayFollowArray.follows.some((record) => record.status === 'pending')) ? (
            <Follows
              followList={displayFollowArray.follows}
              myFollowersUserIdList={myFollowersUserIdList}
              isLoginUserPage={isLoginUserPage}
              myFollowsUserIdList={myFollowsUserIdList}
            />
          ) : (
            <div>フォローは0人です。</div>
          )
        ) : displayFollowArray.followers.some((record) => record.status === 'approved') ||
          (isLoginUserPage && displayFollowArray.follows.some((record) => record.status === 'pending')) ? (
          <Followers
            followList={displayFollowArray.followers}
            myFollowsUserIdList={myFollowsUserIdList}
            isLoginUserPage={isLoginUserPage}
            myFollowersUserIdList={myFollowersUserIdList}
          />
        ) : (
          <div>フォロワーは0人です。</div>
        )}
      </div>
    </div>
  );
};
