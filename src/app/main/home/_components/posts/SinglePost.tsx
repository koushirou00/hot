import React from 'react';
import Link from 'next/link';
import { formatEventDate } from '@/functions/dataFormat/formatEventDate';
import { UserIcon } from '@/app/main/_components/icons/UserIcon';
import { LockIcon } from '@/app/main/_components/icons/LockIcon';
import { Single } from '@/types/posts';

type SinglePostProps = {
  post: Single;
};

export const SinglePost: React.FC<SinglePostProps> = ({ post }) => {
  //自分のものかどうかに応じて表示を変えないといけない。そのための引数かフェッチが必要。
  return (
    <>
      <div className='flex justify-between'>
        <Link href={`/main/profile/${post.user.id}`}>
          <div className='flex'>
            <UserIcon size='mini' src={post.user.icon || ''} alt={''} />
            <div className='ml-1'>
              {post.user.lock ? (
                <div className='flex'>
                  <p className={`line-clamp-1 max-w-[172px] overflow-hidden text-sm`}>{post.user.name}</p>
                  <LockIcon />
                </div>
              ) : (
                <p className='line-clamp-1 max-w-[192px] overflow-hidden text-sm'>{post.user.name}</p>
              )}
            </div>
          </div>
        </Link>
      </div>
      <Link href={`/main/serch/events/${post.event.id}`} className='text-xs text-blue-500'>
        <span className='line-clamp-1 max-w-[192px] overflow-hidden text-sm'>{post.event.name}</span>
        <span>{formatEventDate({ dateStr: post.event.eventDate, format: 'monthDay' })}</span>
      </Link>
    </>
  );
};
