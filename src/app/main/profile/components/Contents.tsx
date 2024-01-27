import React from 'react';
import { FollowStatus } from '@/app/main/profile/components/FollowStatus';
import { getUserProfile } from '@/utils/getUserProfile';
import Image from 'next/image';

export const Contents: React.FC = async () => {
  const userData = await getUserProfile();
  const user = userData.user;

  return (
    <div>
      <div className='h-16 flex justify-center items-center bg-[#EFE6E0] border-b border-black'>プロフィール</div>
      <div className='pt-6'>
        <div>
          <Image
            className='rounded-full mx-auto border-2 border-[#FFFFFF]'
            src={user.icon || 'https://placehold.jp/3d4070/ffffff/114x114.png'}
            alt='プロフィール画像'
            width={114}
            height={114}
          />
        </div>
        <div>
          <p className=''>
            {user.name}
            {user.lock && <span>🔑</span>}
          </p>
          <p className='mt-4'>{user.introduction || 'よろしくお願いします'}</p>
        </div>
        <div className='flex mt-4'>
          <div>
            <Image
              className='rounded'
              src={user.x || 'https://placehold.jp/15/9C9C9C/ffffff/20x20.png?text=X'}
              alt='X'
              width={20}
              height={20}
            />
            {user.x ? <p className='text-blue-500'>設定済み</p> : <p className='text-gray-500'>未設定</p>}
          </div>
          <div className='ml-4'>
            <Image
              className='rounded'
              src={user.instagram || 'https://placehold.jp/15/9C9C9C/ffffff/20x20.png?text=Instagram'}
              alt='インスタグラム'
              width={20}
              height={20}
            />
            {user.instagram ? <p className='text-blue-500'>設定済み</p> : <p className='text-gray-500'>未設定</p>}
          </div>
        </div>
      </div>
      <FollowStatus user={user} />
    </div>
  );
};
