// src/features/main/profile/follow-detail/components/Follows.tsx
import React, { useState } from 'react';
import { FollowArrayProps } from '@/types/follow';
import { ConfirmDialog } from '@/components/elements/ConfirmDialog';
import Image from 'next/image';

import { Button } from '@/components/elements/Button';
import { dummyImageUrl } from '@/features/main/constants/dummyImage';

export const Follows: React.FC<FollowArrayProps> = ({ followArray }) => {
  const [showDialog, setShowDialog] = useState<{ text: string; followId: string } | null>(null);
  const followsArray = followArray.follows;
  const followersArray = followArray.followers;

  // フォロー中（承認されている）
  const approvedFollows = followsArray.filter((follow) => follow.status === 'approved');
  const approvedFollowsId = new Set(approvedFollows.map((user) => user.followingId)); //相手のuser
  const isFollow = (followId: string) => approvedFollowsId.has(followId); //true：フォロー中（許可済み）

  // 承認したフォロワー
  const approvedFollowers = followersArray.filter((follower) => follower.status === 'approved');
  const approvedFollowersId = new Set(approvedFollowers.map((user) => user.userId));
  const isFollower = (followerId: string) => approvedFollowersId.has(followerId); // true:フォロワー false:相手が自分へ申請中

  // ステータス表示なし
  const nomalStatus = (userId: string) => isFollow(userId) && !isFollower(userId); // true：ステータス表示なし

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
      console.log(showDialog?.text);
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
                    className='mx-auto rounded-full border-2 border-[#FFFFFF]'
                    src={follow.followingUser.icon || dummyImageUrl}
                    alt='プロフィール画像'
                    width={40}
                    height={40}
                  />
                </div>
                <div className='ml-1'>
                  <div className={`line-clamp-1 flex overflow-hidden text-sm ${nomalStatus(follow.followingId) && 'mt-1'}`}>
                    <p className={`truncate ${follow.followingUser.lock ? 'max-w-[172px]' : 'max-w-[192px]'}`}>
                      {follow.followingUser.name}
                    </p>
                    {follow.followingUser.lock && (
                      <span role='img' aria-label='locked'>
                        🔑
                      </span>
                    )}
                  </div>
                  {isFollower(follow.followingId) ? (
                    <div className='w-[108px] rounded bg-gray-300 p-[2px] text-center text-[10px]'>フォローされています</div>
                  ) : !isFollow(follow.followingId) ? (
                    <div className='w-[78px] rounded bg-red-300 p-[2px] text-center text-[10px]'>フォロー申請中</div>
                  ) : null}
                </div>
              </div>
              <div>
                {follow.status === 'pending' ? (
                  <Button
                    onClick={() =>
                      setShowDialog({
                        text: 'フォロー申請を解除しますか？\n※解除したことは相手ユーザーへ通知されません',
                        followId: follow.id
                      })
                    }
                    variant='unpending'
                  >
                    申請解除
                  </Button>
                ) : (
                  <Button
                    onClick={() =>
                      setShowDialog({
                        text: 'フォロワーから削除しますか？\n※削除したことは相手ユーザーへ通知されません',
                        followId: follow.id
                      })
                    }
                    variant='unfollow'
                  >
                    フォロー解除
                  </Button>
                )}
                {showDialog?.followId === follow.id && (
                  <ConfirmDialog text={showDialog?.text} onClose={(confirm) => handleDialogClose(confirm)} />
                )}
              </div>
            </div>
            <p
              className={`ml-[42px] flex w-[300px] flex-row flex-wrap text-justify text-xs ${
                nomalStatus(follow.followingId) ? 'mt-[-6px]' : 'mt-1'
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
