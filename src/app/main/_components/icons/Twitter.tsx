import React from 'react';
import { SnsIconProps } from './types';

export const TwitterIcon: React.FC<SnsIconProps> = ({ setColor }) => {
  return (
    <svg width='28' height='27' viewBox='0 0 28 27' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M4 0C1.79375 0 0 1.79375 0 4V24C0 26.2062 1.79375 28 4 28H24C26.2062 28 28 26.2062 28 24V4C28 1.79375 26.2062 0 24 0H4ZM22.5688 5.25L16.0812 12.6625L23.7125 22.75H17.7375L13.0625 16.6313L7.70625 22.75H4.7375L11.675 14.8188L4.35625 5.25H10.4812L14.7125 10.8438L19.6 5.25H22.5688ZM20.2062 20.975L9.5875 6.93125H7.81875L18.5562 20.975H20.2H20.2062Z'
        fill={setColor === 'color' ? 'black' : '#9C9C9C'}
      />
    </svg>
  );
};
