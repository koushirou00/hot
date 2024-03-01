import React from 'react';
import { IconProps } from './types/Icon';

export const LikeIcon: React.FC<IconProps> = ({ myMark }) => {
  return (
    <div className='flex items-center'>
      <svg width='21' height='19' viewBox='0 0 21 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M10.2343 1.54158C11.38 0.515944 12.8751 -0.0319052 14.4122 0.0106174C15.9494 0.0531401 17.4119 0.682805 18.4991 1.77022C19.5855 2.85642 20.2152 4.31702 20.2592 5.85261C20.3032 7.38821 19.7582 8.88247 18.7358 10.0291L10.2322 18.5447L1.7307 10.0291C0.707117 8.88188 0.161553 7.38633 0.206009 5.8495C0.250466 4.31267 0.881569 2.85116 1.96975 1.76503C3.05794 0.678902 4.52063 0.0505593 6.05755 0.00900556C7.59446 -0.0325482 9.08897 0.515839 10.2343 1.54158Z'
          fill={myMark ? '#FD2669' : 'none'}
          strokeWidth={2}
          stroke={myMark ? '#FD2669' : '#9C9C9C'}
        />
      </svg>
    </div>
  );
};
