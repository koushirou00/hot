import React from 'react';
import { SnsIconProps } from './types';

export const TwitterIcon: React.FC<SnsIconProps> = ({ setColor }) => {
  return (
    <>
      {setColor === 'color' ? (
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M14.0362 10.4839L22.4287 0.657608H20.4395L13.1543 9.18932L7.33282 0.657608H0.619507L9.42141 13.5604L0.619507 23.8641H2.60864L10.3033 14.8534L16.4513 23.8641H23.1646L14.0362 10.4839ZM11.3127 13.6732L10.4209 12.3885L3.32472 2.16603H6.3797L12.1051 10.416L12.9969 11.7006L20.4412 22.4253H17.3862L11.3127 13.6732Z'
            fill='#0A0A0A'
          />
        </svg>
      ) : (
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M14.0362 10.4839L22.4287 0.657623H20.4395L13.1543 9.18933L7.33282 0.657623H0.619507L9.42141 13.5605L0.619507 23.8641H2.60864L10.3033 14.8534L16.4513 23.8641H23.1646L14.0362 10.4839ZM11.3127 13.6732L10.4209 12.3885L3.32472 2.16605H6.3797L12.1051 10.416L12.9969 11.7006L20.4412 22.4253H17.3862L11.3127 13.6732Z'
            fill='#7F7F7F'
          />
        </svg>
      )}
    </>
  );
};