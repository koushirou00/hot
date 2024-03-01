'use client';
import React from 'react';
import { FollowEventsProps } from '@/types/event';
import { EventFollowHandler } from './EventFollowHandler/EventFollowHandler';
import { formatEventDate } from '@/functions/dataFormat/formatEventDate';

export const FollowEvents: React.FC<FollowEventsProps> = ({ myFollowEventArray, otherFollowEventArray }) => {
  const loginUserPage = otherFollowEventArray === null;
  const displayFollowEvents = otherFollowEventArray || myFollowEventArray;

  // 他者プロフィールの場合のみ使用
  const isMyFollowEvent = (otherUserFollowEventId: string) => myFollowEventArray.some((record) => record.eventId === otherUserFollowEventId);

  return (
    <div>
      <h1 className='mx-auto mt-3 w-fit border-b border-blue-500 px-3 text-center text-sm'>
        フォロー中&nbsp;<span className='text-xl'>{displayFollowEvents.length}</span>&nbsp;件
      </h1>
      <ul className='mt-2 rounded-t-3xl bg-[#EBEEF0] px-4 pb-16 pt-1'>
        {displayFollowEvents.map((record) => (
          <li key={record.id} className='mt-4 rounded-2xl bg-white px-[23px] pb-4 pt-[10px]'>
            <p className='text-sm text-blue-600'>{record.event.name}</p>
            <div className='flex items-end justify-between'>
              <div className='mt-4 text-xs'>
                <p>
                  会場&emsp;&emsp;：<span>{record.event.venue}</span>
                </p>
                <p>
                  都道府県：<span>{record.event.prefecture.name}</span>
                </p>
                <p>開催日&emsp;：{formatEventDate({ dateStr: record.event.eventDate, format: 'inWeek' })}</p>
              </div>
              {loginUserPage || (!loginUserPage && isMyFollowEvent(record.eventId)) ? (
                <EventFollowHandler handler={'followDelete'} />
              ) : (
                <EventFollowHandler handler={'newFollow'} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
