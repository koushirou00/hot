// src/app/main/profile/follow-detail/components/Followers.tsx
import React from 'react';
import { FollowArrayProps } from '@/types/follow';
import { showConfirmDialog } from '@/app/components/parts/ConfirmDialog';
import Image from 'next/image';

export const Followers: React.FC<FollowArrayProps> = ({ followArray }) => {
  const followsArray = followArray.follows;
  const followersArray = followArray.followers;

  // フォロー中（承認されている）
  const approvedFollows = followsArray.filter((follow) => follow.status === 'approved');
  const approvedFollowsId = new Set(approvedFollows.map((user) => user.followingId)); //相手のuserId

  // 'pending' ステータスのフォローを先頭、次にフォローしているユーザーが来るように並び替える
  const sortedFollowersArray = followersArray.sort((a, b) => {
    if (a.status === 'pending') return -1;
    if (b.status === 'pending') return 1;
    if (a.status === 'approved' && approvedFollowsId.has(a.userId)) return -1;
    if (b.status === 'approved' && approvedFollowsId.has(b.userId)) return 1;
    return 0;
  });

  const followerDelete = async (followerId: string, status: string) => {
    console.log('status: ', status);
    console.log('followId: ', followerId);
    const confirmed = await showConfirmDialog(
      `${
        status === 'rejection'
          ? 'フォロー申請を拒否しますか？\n※拒否したことは相手のユーザーへ通知されません'
          : 'フォローリクエストを承諾しますか？'
      }`,
      true
    );
    if (!confirmed) return;
    // 下記でフォローを承諾or拒否するレコードを作成。
    // 承諾ならPATCH、拒否ならDELETE
    // await followerApi(followId);
  };

  return (
    <div>
      <ul className='px-4 mb-40'>
        {sortedFollowersArray.map((follower) => (
          <li key={follower.id} className='mt-5'>
            <div className='flex justify-between'>
              <div className='flex'>
                <div>
                  <Image
                    className='rounded-full mx-auto border-2 border-[#FFFFFF]'
                    src={follower.user.icon || 'https://placehold.jp/3d4070/ffffff/114x114.png'}
                    alt='プロフィール画像'
                    width={40}
                    height={40}
                  />
                </div>
                <div className='ml-1'>
                  {follower.user.lock ? (
                    <div className='flex'>
                      <p
                        className={`${
                          !approvedFollowsId.has(follower.userId) && 'pt-1'
                        } overflow-hidden line-clamp-1 max-w-[172px] text-sm`}
                      >
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
                      } overflow-hidden line-clamp-1 max-w-[192px] text-sm`}
                    >
                      {follower.user.name}
                    </p>
                  )}
                  {approvedFollowsId.has(follower.userId) && (
                    <div className='bg-gray-300 text-center text-[10px] p-[2px] rounded w-[96px]'>
                      フォローしています
                    </div>
                  )}
                </div>
              </div>
              <div>
                {follower.status === 'pending' && (
                  <div className='flex justify-around'>
                    <button
                      onClick={() => followerDelete(follower.id, 'rejection')}
                      className='mr-3 border border-red-500 text-red-500 py-[5px] px-2 rounded text-sm'
                    >
                      拒否
                    </button>
                    <button
                      onClick={() => followerDelete(follower.id, 'approve')}
                      className='border border-blue-400 text-blue-400 py-[5px] px-2 rounded text-sm'
                    >
                      承諾
                    </button>
                  </div>
                )}
              </div>
            </div>
            <p
              className={`text-justify ml-[41px] flex flex-row flex-wrap w-[300px] text-xs ${
                approvedFollowsId.has(follower.userId) && 'mt-1'
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
