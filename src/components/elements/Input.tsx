import React, { ComponentProps, forwardRef, useState } from 'react';
import { cva } from 'class-variance-authority';
import { SearchIcon } from '../icons/SearchIcon';

// ベース設定
const baseClassName = 'text-base w-[318px] h-[45px] block rounded-[10px] transition-all ease-in-out duration-300';
const inputStyles = cva(baseClassName, {
  variants: {
    variant: {
      primary: 'border border-r-2 border-b-4 border-black px-2 ',
      secondary: 'border border-black px-2 ',
      search: 'flex border border-b-4 border-r-2 border-black'
    },
    labelSize: {
      md: 'text-base',
      xl: 'text-xl'
    },
    focus: {
      none: '',
      blue: 'focus:border-[#39A7F1]'
    },
    maxCount: {
      50: 50,
      200: 200
    }
  },
  compoundVariants: [
    {
      variant: ['secondary'],
      labelSize: 'xl'
    },
    {
      variant: ['search'],
      focus: 'none'
    }
  ],
  defaultVariants: {
    variant: 'primary',
    labelSize: 'md'
  }
});

type InputProps = ComponentProps<'input'> & {
  variant: 'primary' | 'secondary' | 'search';
  label: string;
  labelSize?: 'md' | 'xl';
  focus?: 'none' | 'blue';
  maxCount?: number;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({ id, label, variant, labelSize, focus, maxCount, className, ...otherProps }, ref) => {
  const combinedClassName = `${inputStyles({ labelSize, focus, variant })} ${className}`;

  const [inputValue, setInputValue] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!maxCount || value.length <= maxCount) {
      setInputValue(value);
    }
  };

  return (
    <>
      <label className={`block ${labelSize}`} htmlFor={id}>
        {label}
        {variant === 'search' ? (
          <div className={combinedClassName}>
            <input
              type='text'
              value={inputValue}
              onChange={(e) => handleChange(e)}
              id={id}
              ref={ref}
              className='w-full px-2 outline-none'
              {...otherProps}
            />
            <button className='rounded-r-md border-l border-black bg-orange-500 p-2'>
              <SearchIcon />
            </button>
          </div>
        ) : (
          <input type='text' id={id} ref={ref} className={combinedClassName} value={inputValue} {...otherProps} onChange={(e) => handleChange(e)} />
        )}
      </label>

      {maxCount && (
        <div className={`w-[318px] pr-1 pt-1 text-right text-xs`}>
          文字数<span className={`pl-1 ${inputValue.length === maxCount && 'text-red-500'}`}>{inputValue.length}</span>/{maxCount}
        </div>
      )}
    </>
  );
});

Input.displayName = 'Input';
