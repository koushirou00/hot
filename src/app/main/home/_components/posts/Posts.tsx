'use client';
import React from 'react';
import { PostArray } from '@/types/posts';
import { SinglePost } from './SinglePost';

type PostsProps = {
  postArray: PostArray;
};

export const Posts: React.FC<PostsProps> = async ({ postArray }) => {
  return (
    <div className=''>
      <ul>
        {postArray.map((record) => (
          <li key={record.id}>
            <SinglePost post={record} />
          </li>
        ))}
      </ul>
    </div>
  );
};
