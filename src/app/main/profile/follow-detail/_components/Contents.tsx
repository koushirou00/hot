'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FollowArrayProps } from '@/types/follow';
import { Follows } from '@/app/main/profile/follow-detail/_components/Follows';
import { Followers } from '@/app/main/profile/follow-detail/_components/Followers';
import { Loading } from '@/components/layouts/Loading';

export const Contents: React.FC<FollowArrayProps> = ({ followArray }) => {
  const searchParams = useSearchParams();
  const [show, setShow] = useState<string>('');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (!tab) return setShow('follows');
    setShow(tab);
  }, [searchParams]);

  if (!show) return <Loading />;

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
            {`フォロー（${followArray.follows.length}）`}
          </div>
          <div
            className={`
              ${show === 'followers' ? 'border-b border-blue-500' : 'opacity-70'} cursor-pointer
            `}
            onClick={() => setShow('followers')}
          >
            {`フォロワー（${followArray.followers.length}）`}
          </div>
        </div>
        {show === 'follows' ? <Follows followArray={followArray} /> : <Followers followArray={followArray} />}
      </div>
    </div>
  );
};
