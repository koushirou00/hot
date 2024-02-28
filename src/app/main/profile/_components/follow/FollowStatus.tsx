// src/app/main/profile/_components/follow/FollowStatus.tsx
import React from 'react';
import Link from 'next/link';
import { FollowData } from '@/types/follow';
import { EventWithPrefecture } from '@/types/event';

type FollowStatusProps = {
  followArray: FollowData;
  followEventArray: EventWithPrefecture[];
  userId: string;
};

export const FollowStatus: React.FC<FollowStatusProps> = async ({ followArray, followEventArray, userId }) => {
  const followersArray = followArray.followers;
  const followsArray = followArray.follows;

  return (
    <div className='mt-4 flex items-center justify-around text-center'>
      <div>
        <Link href={`/main/profile/${userId}/follow-detail?tab=follows`}>
          <p>{followsArray.length}</p>
          <p>フォロー</p>
        </Link>
      </div>
      <div>|</div>
      <div>
        <Link href={`/main/profile/${userId}/follow-detail?tab=followers`}>
          <p>{followersArray.length}</p>
          <p>フォロワー</p>
        </Link>
      </div>
      <div>|</div>
      <div>
        <Link href={`/main/profile/${userId}/event-detail`}>
          <p>{followEventArray.length}</p>
          <p>イベント</p>
        </Link>
      </div>
    </div>
  );
};
