import { Event, Post, User } from '@prisma/client';

export type Single = Post & {
  user: User;
  event: Event;
};

export type PostArray = Single[];
