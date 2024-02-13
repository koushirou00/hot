import React from 'react';
import Image, { ImageProps } from 'next/image';

type UserIconProps = ImageProps & {
  parentClass?: string;
};

export const UserIcon: React.FC<UserIconProps> = ({ parentClass, ...props }) => {
  return (
    <div className={`relative mx-auto h-[114px] w-[114px] cursor-pointer ${parentClass}`}>
      <Image
        {...props}
        className={`rounded-full object-cover ${props.className}`}
        src={props.src}
        alt='プロフィール画像'
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        priority
      />
    </div>
  );
};
