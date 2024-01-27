// src/app/main/profile/follow-detail/components/Follows.tsx
import React from 'react';
import { FollowArrayProps } from '@/types/follow';
import { showConfirmDialog } from '@/app/components/parts/ConfirmDialog';
import Image from 'next/image';

export const Follows: React.FC<FollowArrayProps> = ({ followArray }) => {
  const followsArray = followArray.follows;
  const followersArray = followArray.followers;

  // フォロー中（承認されている）
  const approvedFollows = followsArray.filter((follow) => follow.status === 'approved');
  const approvedFollowsId = new Set(approvedFollows.map((user) => user.followingId)); //相手のuserId

  // 承認したフォロワー
  const approvedFollowers = followersArray.filter((follower) => follower.status === 'approved');
  const approvedFollowersId = new Set(approvedFollowers.map((user) => user.userId)); //相手のuserId

  // 'pending' ステータスを先頭、次にフォロワーが来るように並び替える
  const sortedFollowsArray = followsArray.sort((a, b) => {
    if (a.status === 'pending') return -1;
    if (b.status === 'pending') return 1;
    if (a.status === 'approved' && approvedFollowersId.has(a.followingId)) return -1;
    if (b.status === 'approved' && approvedFollowersId.has(b.followingId)) return 1;
    return 0;
  });

  // レコード変更API
  const followDelete = async (status: string, followId: string) => {
    console.log('status: ', status);
    console.log('followId: ', followId);
    const confirmed = await showConfirmDialog(
      `${status === 'pending' ? 'フォロー申請を削除しますか？' : 'フォロー解除しますか？'}`,
      true
    );
    if (!confirmed) return;
    // 下記でフォローを削除するレコードを作成。
    // await deleteApi(followId);
  };

  return (
    <div>
      <ul className='px-4'>
        {sortedFollowsArray.map((follow) => (
          <li key={follow.id} className='mt-5'>
            <div className='flex justify-between'>
              <div className='flex'>
                <div>
                  <Image
                    className='rounded-full mx-auto border-2 border-[#FFFFFF]'
                    src={follow.followingUser.icon || 'https://placehold.jp/3d4070/ffffff/114x114.png'}
                    alt='プロフィール画像'
                    width={40}
                    height={40}
                  />
                </div>
                <div className='ml-1'>
                  <div className='flex overflow-hidden line-clamp-1 text-sm'>
                    <p className={`${follow.followingUser.lock ? 'max-w-[172px]' : 'max-w-[192px]'}`}>
                      {follow.followingUser.name}
                    </p>
                    {follow.followingUser.lock && (
                      <span role='img' aria-label='locked'>
                        🔑
                      </span>
                    )}
                  </div>
                  {approvedFollowersId.has(follow.followingId) && (
                    <div className='bg-gray-300 text-center text-[10px] p-[2px] rounded w-[108px]'>
                      フォローされています
                    </div>
                  )}
                  {!approvedFollowsId.has(follow.followingId) && (
                    <div className='bg-red-300 text-center text-[10px] p-[2px] rounded w-[78px]'>フォロー申請中</div>
                  )}
                </div>
              </div>
              <div>
                {follow.status === 'pending' ? (
                  <button
                    onClick={() => followDelete(follow.id, 'pending')}
                    className='border border-red-500 text-red-500 py-[5px] px-2 rounded text-sm'
                  >
                    申請解除
                  </button>
                ) : (
                  <button
                    onClick={() => followDelete(follow.id, 'approved')}
                    className='bg-blue-400 py-[5px] px-2 rounded text-sm'
                  >
                    フォロー解除
                  </button>
                )}
              </div>
            </div>
            <p
              className={`text-justify ml-[41px] flex flex-row flex-wrap w-[300px] text-xs ${
                (approvedFollowersId.has(follow.followingId) || !approvedFollowsId.has(follow.followingId)) && 'mt-1'
              } `}
            >
              {follow.followingUser.introduction}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
