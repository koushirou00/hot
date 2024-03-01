'use client';
import React from 'react';
import Link from 'next/link';
import { formatEventDate } from '@/functions/dataFormat/formatEventDate';
import { UserIcon } from '@/app/main/_components/icons/UserIcon';
import { LockIcon } from '@/app/main/_components/icons/LockIcon';
import { Single } from '@/types/posts';
import { formatTimeDiff } from '../../../../../../functions/dataFormat/formatPostDate';
import { Category } from './Category';
import Image from 'next/image';
import { RoutingIcon } from './icons/RoutingIcon';

type SinglePostProps = {
  post: Single;
};

export const SinglePost: React.FC<SinglePostProps> = ({ post }) => {
  return (
    <>
      <div className='mb-1 mt-4 flex justify-between'>
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
        {<time className='block text-[13px] text-gray-600'>{formatTimeDiff(post.updatedAt)}</time>}
      </div>
      <div className='mx-auto w-72'>
        <Link href={`/main/serch/events/${post.eventId}`} className='mb-1 flex text-xs text-blue-500'>
          <span className='line-clamp-1 max-w-[192px] overflow-hidden text-sm'>{post.event.name}</span>
          <time className=''>{formatEventDate({ dateStr: post.event.eventDate, format: 'monthDay' })}</time>
        </Link>
        {post.image && (
          <div className='relative mx-auto h-[168px]'>
            <Image
              src={post.image}
              alt={''}
              fill
              className='rounded-[8px]'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>
        )}
        <p className='mt-3'>{post.text}</p>
        <Category category={post.category} />
      </div>
      <div className='mt-2 flex justify-center border-b-2 pb-2'>
        <RoutingIcon dataArray={post.comment} name={'CommentIcon'} />
        <RoutingIcon dataArray={post.like} name={'LikeIcon'} />
        <RoutingIcon dataArray={post.retweet} name={'RetweetIcon'} />
        <RoutingIcon dataArray={post.bad} name={'BadIcon'} />
      </div>
    </>
  );
};
