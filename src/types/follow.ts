import { User, Follow, Event } from '@prisma/client';

export type FollowData = {
  follows: ExtendFollow[];
  followers: ExtendFollow[];
};
export type ExtendFollow = Follow & {
  user: User;
  followingUser: User;
};
export type FollowArrayProps = {
  loginUserId?: string;
  otherUserId?: string;
  followArray: FollowData;
};
