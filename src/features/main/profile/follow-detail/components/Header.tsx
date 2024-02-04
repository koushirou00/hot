import React from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header className='border-b border-gray-200 bg-opacity-85 p-2 text-center'>
      <Link href={`/main/profile`}>
        <h1 className='text-sm text-black'>プロフィールに戻る</h1>
      </Link>
    </header>
  );
};
