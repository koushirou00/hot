// Button.tsx
import React from 'react';
import { cva } from 'class-variance-authority';
import { ButtonProps } from '@/types/Button';
import Link from 'next/link';

// ベース設定
const baseClassName = 'text-xs flex items-center justify-center transition-all ease-in-out duration-300';

const buttonStyles = cva(baseClassName, {
  variants: {
    color: {
      primary: 'bg-customeOrange',
      secondary: 'bg-customeBlue',
      delete: 'bg-[#FF0000]',
      cancel: ''
    },
    variant: {
      fill: 'text-white',
      outline: 'bg-opacity-0 border',
      solid: 'border border-r-2 border-b-2 border-black'
    },
    size: {
      xs: 'px-4 py-1 max-h-7',
      sm: 'py-[5px] px-2',
      md: 'py-[6px] px-3',
      lg: 'py-[7px] px-5',
      xl: 'py-[9px] min-w-[88px]',
      xxl: 'py-[9px] min-w-[116px]'
    },
    rounder: {
      nomal: 'rounded-[5px]',
      lg: 'rounded-2xl'
    }
  },
  compoundVariants: [
    {
      color: 'primary',
      variant: 'solid',
      className: 'text-white'
    },
    {
      color: 'secondary',
      variant: 'outline',
      className: 'border-blue-600 text-blue-600'
    },
    {
      color: 'secondary',
      variant: 'solid',
      className: 'text-white'
    },
    {
      color: 'delete',
      variant: 'outline',
      className: 'border-[#FF0000] text-[#FF0000]'
    },
    {
      color: 'cancel',
      variant: 'outline',
      className: 'border-gray-500 text-gray-500'
    }
  ],
  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
    rounder: 'nomal'
  }
});

export const Button: React.FC<ButtonProps> = ({ color, variant, size, rounder, children, className, href, target, ...otherProps }) => {
  // 最終的なclassNameを生成
  const combinedClassName = `${buttonStyles({ color, variant, size, rounder })} ${className || ''}`;

  return (
    <>
      {href ? (
        <Link className={combinedClassName} href={href} target={target}>
          {children}
        </Link>
      ) : (
        <button className={combinedClassName} {...otherProps}>
          {children}
        </button>
      )}
    </>
  );
};
