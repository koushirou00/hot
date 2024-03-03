import { Event, EventFollower, Prefecture } from '@prisma/client';

export type EventWithPrefecture = Event & {
  prefecture: Prefecture;
};

type EventFollowerWithEvent = EventFollower & {
  event: EventWithPrefecture;
};

export type FollowEventsProps = {
  myFollowEventArray: EventFollowerWithEvent[];
  otherFollowEventArray?: EventFollowerWithEvent[] | null;
};
