'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FollowArrayProps } from '@/types/follow';
import { Follows } from '@/app/main/profile/follow-detail/components/Follows';
import { Followers } from '@/app/main/profile/follow-detail/components/Followers';
import { Loading } from '@/app/components/Loading';

export const Contents: React.FC<FollowArrayProps> = ({ followArray }) => {
  const searchParams = useSearchParams();
  const [show, setShow] = useState<string>('');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setShow(tab);
    }
  }, [searchParams]);

  if (!show) return <Loading />;

  return (
    <div>
      <div className='mt-5'>
        <div className='flex justify-around'>
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
        <div className='mt-[-1px] w-[640px] sm:w-full h-[1px] bg-[#72727230]'></div>
        {show === 'follows' ? <Follows followArray={followArray} /> : <Followers followArray={followArray} />}
      </div>
    </div>
  );
};