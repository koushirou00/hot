import { FollowData } from '@/types/follow';

// 対象者がフォロー、フォロワーにいないかチェック
export const formatMyFollow = ({ myFollowArray }: { myFollowArray: FollowData }) => {
  //重複しているフォローを取得
  const myFollowApprovedRecords = myFollowArray.follows.filter((record) => record.status === 'approved');
  const myFollowsUserIdList = new Set<string>(myFollowApprovedRecords.map((record) => record.followingId));

  // 重複しているフォロワーを取得
  const myFollowerApprovedRecords = myFollowArray.followers.filter((record) => record.status === 'approved');
  const myFollowersUserIdList = new Set<string>(myFollowerApprovedRecords.map((record) => record.userId));

  return {
    myFollowsUserIdList,
    myFollowersUserIdList
  };
};
