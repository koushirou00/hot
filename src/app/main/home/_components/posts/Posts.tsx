import React from 'react';
import { PostArray } from '@/types/posts';
import { SinglePost } from './SinglePost/SinglePost';

type PostsProps = {
  postArray: PostArray;
};

export const Posts: React.FC<PostsProps> = ({ postArray }) => {
  return (
    <div>
      <h1 className='mx-auto mb-5 mt-8 w-fit border-b-2 border-blue-400 px-2'>つぶやき</h1>
      <ul className='mx-auto mb-12 max-w-[365px]'>
        {postArray.map((record) => (
          <li key={record.id}>
            <SinglePost post={record} />
          </li>
        ))}
      </ul>
    </div>
  );
};
