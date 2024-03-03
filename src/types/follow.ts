import { User, Follow } from '@prisma/client';

export type ExtendFollow = Follow & {
  user: User;
  followingUser: User;
};

export type FollowData = {
  follows: ExtendFollow[];
  followers: ExtendFollow[];
};

export type FollowArrayProps = {
  myFollowArray: FollowData;
  otherFollowArray?: FollowData;
};

export type followListProps = {
  followList: ExtendFollow[];
  myFollowsUserIdList: Set<string>;
  myFollowersUserIdList: Set<string>;
  isLoginUserPage: boolean;
};
