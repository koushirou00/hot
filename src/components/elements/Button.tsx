// Button.tsx
import React, { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'cancel' | 'follow' | 'unfollow' | 'reject' | 'approve' | 'delete' | 'block';
};

export const Button: React.FC<ButtonProps> = (props) => {
  // ベースのクラス名
  const baseClassName = 'py-[5px] px-2 rounded text-sm';

  // 種類別スタイル
  let additionalClassName = '';
  switch (props.variant) {
    case 'primary':
      additionalClassName = 'bg-customeOrange text-white py-[6px] px-5';
      break;
    case 'cancel':
      additionalClassName = 'border border-gray-400 py-[6px] px-3 text-gray-500';
      break;
    case 'follow':
      additionalClassName = 'bg-customeOrange ';
      break;
    case 'unfollow':
      additionalClassName = 'bg-blue-400';
      break;
    case 'approve':
      additionalClassName = 'border border-blue-400 text-blue-400';
      break;
    case 'delete':
      additionalClassName = 'mr-3 border border-red-500 text-red-500';
      break;
    case 'block':
      additionalClassName = 'border-[1.5px] border-color-[#FF0000]';
      break;
    default:
      additionalClassName = '';
      break;
  }

  // クラス名を結合する
  const combinedClassName = `${additionalClassName} ${baseClassName} ${props.className || ''}`;

  return (
    <button className={combinedClassName} {...props}>
      {props.children}
    </button>
  );
};
