import { Event, EventFollower, Prefecture } from '@prisma/client';

// Event と Prefecture の型は、それぞれが適切に定義されていると仮定します。
type EventWithPrefecture = Event & {
  prefecture: Prefecture;
};

type EventFollowerWithEvent = EventFollower & {
  event: EventWithPrefecture;
};

export type FollowEventsProps = {
  myFollowEventArray: EventFollowerWithEvent[];
  otherFollowEventArray?: EventFollowerWithEvent[] | null;
};
