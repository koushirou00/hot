import { Bad, Comment, Event, Like, Post, Retweet, User } from '@prisma/client';

export type Single = Post & {
  user: User;
  event: Event;
  comment: Comment[];
  like: Like[];
  retweet: Retweet[];
  bad: Bad[];
};

export type PostArray = Single[];
