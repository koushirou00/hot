// Button.tsx
import React, { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  variant?: string;
};

export const Button: React.FC<ButtonProps> = (props) => {
  // ベースのクラス名
  let baseClassName = 'rounded text-xs flex items-center justify-center '; //連結のため要半角スペース
  switch (props.variant) {
    case 'primary':
      baseClassName += 'bg-customeOrange text-white p-[9px]';
      break;
    case 'cancel':
      baseClassName += 'border border-gray-400 py-[6px] px-3 text-gray-700';
      break;
    case 'delete':
      baseClassName += 'bg-customeBlue p-[9px] text-white';
      break;
    case 'block':
      baseClassName += 'border-[1.5px] border-color-[#FF0000]';
      break;
    case 'reject':
      baseClassName += 'mr-3 border border-red-600 text-red-600 px-4 py-1';
      break;
    case 'approve':
      baseClassName += 'border border-blue-600 text-blue-600 px-4 py-1';
      break;
    default:
      baseClassName += 'py-[5px] px-2';
      break;
  }

  const combinedClassName = `${baseClassName} ${props.className || ''}`;

  return (
    <button {...props} className={combinedClassName}>
      {props.children}
    </button>
  );
};
