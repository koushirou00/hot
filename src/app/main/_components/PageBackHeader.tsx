'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export const PageBackHeader: React.FC = () => {
  const router = useRouter();

  return (
    <header className='border-b border-gray-200 bg-opacity-85 p-2'>
      <div onClick={() => router.back()} className='flex w-40 items-center'>
        <svg width='11' height='19' viewBox='0 0 11 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M9.60413 18.25L0.854126 9.5L9.60413 0.75'
            stroke='#0E172C'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <h1 className='pl-3 text-base text-black'>戻る</h1>
      </div>
    </header>
  );
};
