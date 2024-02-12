// src/features/main/profile/components/Contents.tsx
import React from 'react';
import { UserProps } from '@/types/UserProps';
import { FollowStatus } from '@/features/main/profile/components/FollowStatus';
import { dummyImageUrl } from '@/features/main/constants/dummyImage';
import Link from 'next/link';
import { UserIcon } from '@/features/main/components/UserIcon';
import { TwitterIcon } from '@/features/main/components/icons/Twitter';
import { InstagramIcon } from '@/features/main/components/icons/Instagram';
import { LockIcon } from '@/features/main/components/icons/lock';

export const Contents: React.FC<UserProps> = async ({ user }) => {
  return (
    <div>
      <div className='flex h-16 items-center justify-center border-b border-black bg-[#EFE6E0]'>プロフィール</div>

      <div className='p-6'>
        <div>
          <UserIcon parentClass='border-2 border-[#FFFFFF]' src={user.icon || dummyImageUrl} alt={''} />
        </div>
        <div>
          <div className='flex'>
            <p>{user.name}</p>
            {user.lock && <LockIcon />}
          </div>
          <p className='mt-4 text-justify'>{user.introduction || 'よろしくお願いします'}</p>
        </div>
        <div className='mt-4 flex'>
          <div>
            {user.x ? (
              <Link href={user.x} target='_blank'>
                <TwitterIcon setColor='color' />
                <p className='text-blue-500'>設定済み</p>
              </Link>
            ) : (
              <>
                <TwitterIcon setColor='monochrome' />
                <p className='text-gray-500'>未設定</p>
              </>
            )}
          </div>
          <div className='ml-4'>
            {user.instagram ? (
              <Link href={user.instagram} target='_blank'>
                <InstagramIcon setColor='color' />
                <p className='text-blue-500'>設定済み</p>
              </Link>
            ) : (
              <>
                <InstagramIcon setColor='monochrome' />
                <p className='text-gray-500'>未設定</p>
              </>
            )}
          </div>
        </div>
      </div>
      <FollowStatus />

      <div className='mt-7 flex items-center justify-center'>
        <a href={`${process.env.URL}/main/profile/edit`} className='rounded-md bg-[#E65738] px-5 py-[6px] text-center text-white'>
          編集する
        </a>
      </div>
    </div>
  );
};
