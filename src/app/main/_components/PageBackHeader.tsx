import React from 'react';
import Link from 'next/link';

type PageBackProps = {
  url: string;
  text: string;
};

export const PageBackHeader: React.FC<PageBackProps> = (props) => {
  return (
    <header className='border-b border-gray-200 bg-opacity-85 p-2 text-center'>
      <Link href={`${props.url}`} className='flex w-40 items-center justify-between'>
        <svg width='11' height='19' viewBox='0 0 11 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M9.60413 18.25L0.854126 9.5L9.60413 0.75'
            stroke='#0E172C'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <h1 className='text-base text-black'>{props.text}</h1>
      </Link>
    </header>
  );
};
