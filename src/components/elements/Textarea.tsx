import React, { ComponentProps, forwardRef } from 'react';

export const Textarea = forwardRef<HTMLTextAreaElement, ComponentProps<'textarea'>>((props, ref) => {
  return <textarea ref={ref} {...props} rows={props.rows || 8} className='w-full rounded-md border border-black' />;
});

Textarea.displayName = 'Textarea';
