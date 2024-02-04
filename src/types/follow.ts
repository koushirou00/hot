import { User, Follow } from '@prisma/client';

export type ExtendFollow = Follow & {
  user: User;
  followingUser: User;
};

export type FollowArrayProps = {
  followArray: {
    follows: ExtendFollow[];
    followers: ExtendFollow[];
  };
};
