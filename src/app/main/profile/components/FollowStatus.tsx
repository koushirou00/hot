import { User } from '@prisma/client';
import React from 'react';
import Link from 'next/link';

type FollowStatusProps = {
  user: User;
};

async function fetchFollows(userId: string) {
  const response = await fetch(`${process.env.URL}/api/follow/${userId}`);
  if (!response.ok) throw new Error(`フォローユーザー取得APIで失敗しました: ${response}`);
  return response.json();
}
// async function fetchFollwEvents(userId: string) {
//   const host = headers().get('host');
//   const response = await fetch(`http://${host}/api//${userId}`);
//   if (!response.ok)
//     throw new Error(`フォローユーザー取得APIで失敗しました: ${response}`);
//   return response.json();
// }

export const FollowStatus: React.FC<FollowStatusProps> = async ({ user }) => {
  const response = await fetchFollows(user.id);
  const followersArray = response?.followers;
  const followsArray = response?.follows;

  return (
    <div className='mt-4 flex justify-around items-center text-center'>
      <div>
        <Link href={'/main/profile/follow-detail?tab=followers'}>
          <p>{followersArray.length}</p>
          <p>フォロワー</p>
        </Link>
      </div>
      <div>|</div>
      <div>
        <Link href={'/main/profile/follow-detail?tab=follows'}>
          <p>{followsArray.length}</p>
          <p>フォロー</p>
        </Link>
      </div>
      <div>|</div>
      <div>
        <p>5</p>
        <p>イベント</p>
      </div>
    </div>
  );
};
