import React from 'react';
import Image, { ImageProps } from 'next/image';
import { dummyImageUrl } from '@/app/main/_constants/dummyImage';

type UserIconProps = ImageProps & {
  size: 'large' | 'mini';
};

export const UserIcon: React.FC<UserIconProps> = (props) => {
  let customeClassName;

  switch (props.size) {
    case 'large':
      customeClassName = 'h-[114px] w-[114px] border-[3px] border-[#FFFFFF]';
      break;
    case 'mini':
      customeClassName = 'w-10 h-10';
      break;
    default:
  }

  return (
    <div className={`relative mx-auto cursor-pointer rounded-full ${customeClassName}`}>
      <Image
        {...props}
        className={`rounded-full object-cover ${props.className}`}
        src={props.src || dummyImageUrl}
        alt='プロフィール画像'
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        priority
      />
    </div>
  );
};
