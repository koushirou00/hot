import React, { ComponentProps, forwardRef } from 'react';

export const ToggleSwitch = forwardRef<HTMLInputElement, ComponentProps<'input'>>((props, ref) => {
  return (
    <>
      <label className='relative inline-block h-8 w-14'>
        <input type='checkbox' className='peer sr-only' ref={ref} {...props} />
        <span className='block h-8 w-14 cursor-pointer rounded-full bg-gray-300 after:absolute after:left-1 after:top-1 after:h-6 after:w-6 after:rounded-full after:bg-white after:transition-transform peer-checked:bg-blue-500 peer-checked:after:translate-x-6'></span>
      </label>
    </>
  );
});

ToggleSwitch.displayName = 'Input';
