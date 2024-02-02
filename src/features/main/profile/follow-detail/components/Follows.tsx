// src/app/main/profile/follow-detail/components/Follows.tsx
import React, { useState } from 'react';
import { FollowArrayProps } from '@/types/follow';
import { ConfirmDialog } from '@/components/elements/ConfirmDialog';
import Image from 'next/image';

import { Button } from '@/components/elements/Button';
import { dummyImageUrl } from '@/features/main/constants/dummyImage';

export const Follows: React.FC<FollowArrayProps> = ({ followArray }) => {
  const [showDialog, setShowDialog] = useState<{ action: string; followId: string } | null>(null);
  const followsArray = followArray.follows;
  const followersArray = followArray.followers;

  // フォロー中（承認されている）
  const approvedFollows = followsArray.filter((follow) => follow.status === 'approved');
  const approvedFollowsId = new Set(approvedFollows.map((user) => user.followingId)); //相手のuserId

  // 承認したフォロワー
  const approvedFollowers = followersArray.filter((follower) => follower.status === 'approved');
  const approvedFollowersId = new Set(approvedFollowers.map((user) => user.userId));
  const isFollowed = (id: string) => approvedFollowersId.has(id); // true:フォロワー false:申請中

  // 'pending' ステータスを先頭、次にフォロワーが来るように並び替える
  const sortedFollowsArray = followsArray.sort((a, b) => {
    if (a.status === 'pending') return -1;
    if (b.status === 'pending') return 1;
    if (a.status === 'approved' && approvedFollowersId.has(a.followingId)) return -1;
    if (b.status === 'approved' && approvedFollowersId.has(b.followingId)) return 1;
    return 0;
  });

  // レコード変更API
  const handleDialogClose = (confirm: boolean) => {
    if (confirm) {
      console.log(showDialog?.action);
      // 下記でフォローを承諾or拒否するapiを叩く。
      // 承諾ならPATCH、拒否ならDELETE
      // await followerApi(followId);
    }
    setShowDialog(null);
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
                    src={follow.followingUser.icon || dummyImageUrl}
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
                  {isFollowed(follow.followingId) ? (
                    <div className='bg-gray-300 text-center text-[10px] p-[2px] rounded w-[108px]'>フォローされています</div>
                  ) : !isFollowed(follow.followingId) ? (
                    <div className='bg-red-300 text-center text-[10px] p-[2px] rounded w-[78px]'>フォロー申請中</div>
                  ) : null}
                </div>
              </div>
              <div>
                {follow.status === 'pending' ? (
                  <Button onClick={() => setShowDialog({ action: 'unpending', followId: follow.id })} variant='unpending'>
                    申請解除
                  </Button>
                ) : (
                  <Button onClick={() => setShowDialog({ action: 'unfollow', followId: follow.id })} variant='unfollow'>
                    フォロー解除
                  </Button>
                )}
                {showDialog?.followId === follow.id && (
                  <ConfirmDialog
                    show={showDialog !== null}
                    action={showDialog?.action}
                    onClose={(confirm) => handleDialogClose(confirm)}
                  />
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
