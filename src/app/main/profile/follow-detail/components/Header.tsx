import React from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header className='p-2 bg-opacity-85 border-b border-gray-200 text-center'>
      <Link href={`${process.env.URL}/main/profile`}>
        <h1 className='text-sm text-black'>プロフィールに戻る</h1>
      </Link>
    </header>
  );
};
