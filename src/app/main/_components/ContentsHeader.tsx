import React from 'react';

type ContentsHeaderProps = {
  text: string;
};

export const ContentsHeader: React.FC<ContentsHeaderProps> = ({ text }) => {
  return <header className='flex h-12 items-center justify-center border-b border-black bg-[#EFE6E0]'>{text}</header>;
};
