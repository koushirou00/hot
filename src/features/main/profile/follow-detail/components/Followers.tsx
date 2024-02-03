// src/features/main/profile/follow-detail/components/Followers.tsx
'use client';
import React, { useState } from 'react';
import { FollowArrayProps } from '@/types/follow';
import { dummyImageUrl } from '@/features/main/constants/dummyImage';
import { ConfirmDialog } from '@/components/elements/ConfirmDialog';
import { Button } from '@/components/elements/Button';
import Image from 'next/image';

export const Followers: React.FC<FollowArrayProps> = ({ followArray }) => {
  const [showDialog, setShowDialog] = useState<{ text: string; followerId: string } | null>(null);
  const followsArray = followArray.follows;
  const followersArray = followArray.followers;

  // フォロー中（承認されている）
  const approvedFollows = followsArray.filter((follow) => follow.status === 'approved');
  const approvedFollowsId = new Set(approvedFollows.map((user) => user.followingId)); //相手のuserId
  const isFollow = (id: string) => approvedFollowsId.has(id); //true：フォロー中（許可済み）

  // 'pending' ステータスのフォローを先頭、次にフォローしているユーザーが来るように並び替える
  const sortedFollowersArray = followersArray.sort((a, b) => {
    if (a.status === 'pending') return -1;
    if (b.status === 'pending') return 1;
    if (a.status === 'approved' && approvedFollowsId.has(a.userId)) return -1;
    if (b.status === 'approved' && approvedFollowsId.has(b.userId)) return 1;
    return 0;
  });

  const handleDialogClose = (confirm: boolean) => {
    if (confirm) {
      console.log(showDialog?.text);
      // 下記でフォローを承諾or拒否するapiを叩く。
      // 承諾ならPATCH、拒否ならDELETE
      // await followerApi(followId);
    }
    setShowDialog(null);
  };

  return (
    <div>
      <ul className='mb-40 px-4'>
        {sortedFollowersArray.map((follower) => (
          <li key={follower.id} className='mt-5'>
            <div className='flex justify-between'>
              <div className='flex'>
                <div>
                  <Image
                    className='mx-auto rounded-full border-2 border-[#FFFFFF]'
                    src={follower.user.icon || dummyImageUrl}
                    alt='プロフィール画像'
                    width={40}
                    height={40}
                  />
                </div>
                <div className='ml-1'>
                  {follower.user.lock ? (
                    <div className='flex'>
                      <p className={`${!isFollow(follower.userId) && 'mt-1'} line-clamp-1 max-w-[172px] overflow-hidden text-sm`}>
                        {follower.user.name}
                      </p>
                      <span role='img' aria-label='locked'>
                        🔑 {/* 仮なのでちゃんとしたアイコンを設置する */}
                      </span>
                    </div>
                  ) : (
                    <p
                      className={`${
                        !approvedFollowsId.has(follower.userId) && 'pt-1'
                      } line-clamp-1 max-w-[192px] overflow-hidden text-sm`}
                    >
                      {follower.user.name}
                    </p>
                  )}
                  {isFollow(follower.userId) && (
                    <div className='w-[96px] rounded bg-gray-300 p-[2px] text-center text-[10px]'>フォローしています</div>
                  )}
                </div>
              </div>
              <div>
                {follower.status === 'pending' && (
                  <div className='flex justify-around'>
                    <Button
                      onClick={() =>
                        setShowDialog({
                          text: `フォロー申請を拒否しますか？\n※拒否したことは相手ユーザーへ通知されません`,
                          followerId: follower.id
                        })
                      }
                      variant='rejection'
                    >
                      拒否
                    </Button>
                    <Button
                      onClick={() => setShowDialog({ text: 'フォローリクエストを承諾しますか？', followerId: follower.id })}
                      variant='approve'
                    >
                      承諾
                    </Button>
                    {showDialog?.followerId === follower.id && (
                      <ConfirmDialog onClose={(confirm) => handleDialogClose(confirm)} text={showDialog?.text} />
                    )}
                  </div>
                )}
              </div>
            </div>
            <p
              className={`ml-[42px] flex w-[300px] flex-row flex-wrap text-justify text-xs ${
                !isFollow(follower.userId) ? 'mt-[-6px]' : 'mt-1'
              } `}
            >
              {follower.user.introduction}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
