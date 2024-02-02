import React from 'react';

type ButtonProps = React.ComponentProps<'button'> & {
  variant?: 'primary' | 'follow' | 'unfollow' | 'unpending' | 'approve' | 'rejection' | 'block';
};

export const Button: React.FC<ButtonProps> = (props) => {
  let additionalClassName = '';
  switch (props.variant) {
    case 'primary':
      additionalClassName = 'bg-green-400';
      break;
    case 'follow':
      additionalClassName = 'bg-slate-400';
      break;
    case 'unfollow':
      additionalClassName = 'bg-blue-400 py-[5px] px-2 rounded text-sm';
      break;
    case 'unpending':
      additionalClassName = 'border border-red-500 text-red-500 py-[5px] px-2 rounded text-sm';
      break;
    case 'approve':
      additionalClassName = 'border border-blue-400 text-blue-400 py-[5px] px-2 rounded text-sm';
      break;
    case 'rejection':
      additionalClassName = 'mr-3 border border-red-500 text-red-500 py-[5px] px-2 rounded text-sm';
      break;
    case 'block':
      additionalClassName = 'bg-blue-400';
      break;
    default:
      additionalClassName = '';
      break;
  }
  const combinedClassName = `py-[5px] px-2 rounded text-sm ${additionalClassName} ${props.className || ''}`;

  return (
    <button className={combinedClassName} {...props}>
      {props.children}
    </button>
  );
};
