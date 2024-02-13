import React, { ComponentProps, forwardRef } from 'react';

export const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={`w-full rounded border border-black placeholder:text-[11px] active:border-[#39A7F1] ${props.className}`}
    />
  );
});

Input.displayName = 'Input';
