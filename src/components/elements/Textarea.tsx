import { cva } from 'class-variance-authority';
import React, { ComponentProps, forwardRef } from 'react';

const baseClassName = 'border border-black w-full rounded-md p-2';

const textareaStyles = cva(baseClassName, {
  variants: {
    variant: {
      primary: 'border-r-4 border-b-4',
      secondary: 'border '
    },
    rows: {
      sm: 6,
      md: 8,
      lg: 10
    }
  },
  compoundVariants: [{}],
  defaultVariants: {
    variant: 'primary',
    rows: 'md'
  }
});

type TextareaProps = ComponentProps<'textarea'> & {
  label?: string;
  variant?: 'primary' | 'secondary';
  rows?: number;
  maxLength?: number;
  watch?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ variant, rows, id, label, maxLength, watch, className, ...otherProps }, ref) => {
    const combinedClassName = `${textareaStyles({ variant })} ${className || ''}`;

    return (
      <label htmlFor={id}>
        {label}
        <br />
        <textarea id={id} ref={ref} rows={rows} className={combinedClassName} {...otherProps} />
        {maxLength && watch && (
          <div className={`pr-1 pt-1 text-right text-xs`}>
            文字数
            <span className={`pl-1 ${otherProps.value?.toString().length === maxLength && 'text-red-500'}`}>{watch.length}</span>/{maxLength}
          </div>
        )}
      </label>
    );
  }
);

Textarea.displayName = 'Textarea';
