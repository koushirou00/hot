// src/app/main/profile/_components/follow/functions/formatOtherFollowData.ts
import { FollowData } from '@/types/follow';

// 他者ユーザーのプロフィールページのみ使用。自身とのフォロー関係
export const formatOtherFollowData = ({ followArray, loginUserId }: { followArray: FollowData; loginUserId: string }) => {
  const followsArray = followArray.follows;
  const followersArray = followArray.followers;

  // 相手のフォローリストに自分がいるかどうかの確認
  const getFollowRecord = followsArray.find((record) => record.followingId === loginUserId) || null;

  // 相手のフォロワーリストに自分がいるかどうかの確認
  const getFollowerRecord = followersArray.find((record) => record.userId === loginUserId);

  /* 検索 */
  const isFollower = getFollowRecord?.status === 'approved';
  const isPendingFollower = getFollowRecord?.status === 'pending';
  const isFollow = getFollowerRecord?.status === 'approved';
  const isPendingFollow = getFollowerRecord?.status === 'pending';

  return {
    getFollowRecord,
    getFollowerRecord,
    isPendingFollow,
    isFollow,
    isPendingFollower,
    isFollower
  };
};
