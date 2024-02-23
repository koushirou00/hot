import { FollowData } from '@/types/follow';

// ログイン中ユーザーのfollow-detailページで使用
export const formatMyFollowData = ({ followArray }: { followArray: FollowData; }) => {
  const followsArray = followArray.follows;
  const followersArray = followArray.followers;
  
  /* 
  フォロー検索用に配列の整理
  ①targetUserId = 呼び出す側のユーザーIDを入れる。
  ②userId = 自分 or Getユーザー
  ③followingUser = ①がフォロー中の相手
  ④followingId = ②のユーザーID
  */  
  const approvedFollows = followsArray.filter((record) => record.status === 'approved');
  const approvedFollowsId = new Set(approvedFollows.map((record) => record.followingId)); 
  /* 
  フォロワー検索用に配列の整理
  ①targetUserId = 呼び出す側のユーザーIDを入れる。
  ②followingUser = 自分 or Getユーザー
  ③followingId = ①のユーザーID
  ④userId = フォローしている側（①にとってはフォロワー）
  */
  const approvedFollowers = followersArray.filter((record) => record.status === 'approved');
  const approvedFollowersId = new Set(approvedFollowers.map((record) => record.userId));

  /* 検索（相手が存在するか） */
  const isFollow = (targetUserId: string) => approvedFollowsId.has(targetUserId);
  const isFollower = (targetUserId: string) => approvedFollowersId.has(targetUserId);

  /* 並び替えたフォローリスト */
  const sortedFollowsArray = [...followsArray].sort((a, b) => {
    if (a.status === 'pending' && b.status !== 'pending') return -1;
    if (a.status !== 'pending' && b.status === 'pending') return 1;
    return 0; // ステータスが同じ場合は順序を変えない
  });
  
  /* 並び替えたフォロワーリスト */
  const sortedFollowersArray = [...followersArray].sort((a, b) => {
    if (a.status === 'pending' && b.status !== 'pending') return -1;
    if (a.status !== 'pending' && b.status === 'pending') return 1;
    return 0; // ステータスが同じ場合は順序を変えない
  });
  
  
  return {
    isFollow,
    isFollower,
    sortedFollowsArray,
    sortedFollowersArray
  };
};
