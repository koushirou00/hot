import React, { ComponentProps, forwardRef, useState } from 'react';
import { cva } from 'class-variance-authority';
import { SearchIcon } from '../icons/SearchIcon';

// ベース設定
const baseClassName = 'text-base w-full h-[45px] block rounded-[10px] transition-all ease-in-out duration-300';
const inputStyles = cva(baseClassName, {
  variants: {
    variant: {
      primary: 'border border-r-2 border-b-4 border-black px-2 ',
      secondary: 'border border-black px-2 ',
      search: 'flex border border-b-4 border-r-2 border-black'
    },
    focus: {
      none: '',
      blue: 'focus:border-[#39A7F1]'
    }
  },
  compoundVariants: [
    {
      variant: ['secondary']
    },
    {
      variant: ['search'],
      focus: 'none'
    }
  ],
  defaultVariants: {
    variant: 'primary'
  }
});

type InputProps = ComponentProps<'input'> & {
  variant: 'primary' | 'secondary' | 'search';
  label: string;
  labelSize?: 'md' | 'xl';
  focus?: 'none' | 'blue';
  watch?: string;
  maxLength?: number;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, variant, labelSize = 'md', focus, watch, maxLength, className, ...otherProps }, ref) => {
    const combinedClassName = `${inputStyles({ focus, variant })} ${className}`;

    return (
      <>
        <label className={`block text-${labelSize}`} htmlFor={id}>
          {label}
          {variant === 'search' ? (
            <div className={combinedClassName}>
              <input type='text' id={id} ref={ref} className='w-full px-2 outline-none' {...otherProps} />
              <button className='rounded-r-md border-l border-black bg-orange-500 p-2'>
                <SearchIcon />
              </button>
            </div>
          ) : (
            <input type='text' id={id} ref={ref} className={combinedClassName} {...otherProps} />
          )}
          {maxLength && watch && (
            <div className={`pr-1 pt-1 text-right text-xs`}>
              文字数<span className={`pl-1 ${watch.length === maxLength && 'text-red-500'}`}>{watch.length}</span>/{maxLength}
            </div>
          )}
        </label>
      </>
    );
  }
);

Input.displayName = 'Input';
