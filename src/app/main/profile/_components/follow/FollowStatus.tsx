import React from 'react';
import Link from 'next/link';
import { FollowArrayProps } from '@/types/follow';
import { fetchFollowEvents } from '@/functions/api/event/fetchFollowEvents';

export const FollowStatus: React.FC<FollowArrayProps> = async ({ followArray, loginUserId, otherUserId }) => {
  const followersArray = followArray.followers;
  const followsArray = followArray.follows;
  const { followEventArray } = await fetchFollowEvents(loginUserId || otherUserId || '');

  return (
    <div className='mt-4 flex items-center justify-around text-center'>
      <div>
        <Link href={`/main/profile/${loginUserId || otherUserId}/follow-detail?tab=follows&user=${loginUserId ? 'my' : 'other'}`}>
          <p>{followsArray.length}</p>
          <p>フォロー</p>
        </Link>
      </div>
      <div>|</div>
      <div>
        <Link
          href={`/main/profile/${loginUserId || otherUserId}/follow-detail?tab=followers&user=${loginUserId ? 'my' : 'other'}`}
        >
          <p>{followersArray.length}</p>
          <p>フォロワー</p>
        </Link>
      </div>
      <div>|</div>
      <div>
        <Link href={`/main/profile/${loginUserId || otherUserId}/event-detail`}>
          <p>{followEventArray.length}</p>
          <p>イベント</p>
        </Link>
      </div>
    </div>
  );
};
