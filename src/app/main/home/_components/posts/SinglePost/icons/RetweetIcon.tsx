import React from 'react';
import { IconProps } from './types/Icon';

export const RetweetIcon: React.FC<IconProps> = ({ myMark }) => {
  const color = myMark ? '#39A7F1' : '#9C9C9C';
  return (
    <div className='flex items-center'>
      <svg width='38' height='35' viewBox='0 0 38 35' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M28.8801 24.5H27.3601V11.9C27.3601 11.48 27.0561 11.2 26.6001 11.2H13.6801V9.79999H26.6001C27.8921 9.79999 28.8801 10.71 28.8801 11.9V24.5Z'
          fill={color}
        />
        <path
          d='M28.12 25.55L22.952 20.09L24.168 19.11L28.12 23.45L32.072 19.11L33.288 20.09L28.12 25.55ZM24.32 25.2H11.4C10.108 25.2 9.12 24.29 9.12 23.1V10.5H10.64V23.1C10.64 23.52 10.944 23.8 11.4 23.8H24.32V25.2Z'
          fill={color}
        />
        <path
          d='M13.832 15.89L9.88004 11.55L5.92804 15.89L4.71204 14.91L9.88004 9.45001L15.048 14.91L13.832 15.89Z'
          fill={color}
        />
      </svg>
    </div>
  );
};
