import React from 'react';
import { IconProps } from './types/Icon';

export const BadIcon: React.FC<IconProps> = ({ myMark }) => {
  return (
    <div className='flex items-center'>
      {myMark ? (
        <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <g clipPath='url(#clip0_201_707)'>
            <mask id='path-1-inside-1_201_707' fill='white'>
              <path d='M11 21.175C5.3894 21.175 0.824951 16.6106 0.824951 11C0.824951 5.38946 5.3894 0.825012 11 0.825012C16.6105 0.825012 21.1749 5.38946 21.1749 11C21.1749 16.6106 16.6105 21.175 11 21.175ZM11 1.37501C5.693 1.37501 1.37495 5.69306 1.37495 11C1.37495 16.307 5.693 20.625 11 20.625C16.3069 20.625 20.625 16.307 20.625 11C20.625 5.69306 16.3069 1.37501 11 1.37501Z' />
            </mask>
            <path
              d='M11 21.175C5.3894 21.175 0.824951 16.6106 0.824951 11C0.824951 5.38946 5.3894 0.825012 11 0.825012C16.6105 0.825012 21.1749 5.38946 21.1749 11C21.1749 16.6106 16.6105 21.175 11 21.175ZM11 1.37501C5.693 1.37501 1.37495 5.69306 1.37495 11C1.37495 16.307 5.693 20.625 11 20.625C16.3069 20.625 20.625 16.307 20.625 11C20.625 5.69306 16.3069 1.37501 11 1.37501Z'
              fill='#9C9C9C'
            />
            <path
              d='M11 19.675C6.21783 19.675 2.32495 15.7821 2.32495 11H-0.675049C-0.675049 17.439 4.56097 22.675 11 22.675V19.675ZM2.32495 11C2.32495 6.21789 6.21783 2.32501 11 2.32501V-0.674988C4.56097 -0.674988 -0.675049 4.56103 -0.675049 11H2.32495ZM11 2.32501C15.7821 2.32501 19.6749 6.21789 19.6749 11H22.6749C22.6749 4.56103 17.4389 -0.674988 11 -0.674988V2.32501ZM19.6749 11C19.6749 15.7821 15.7821 19.675 11 19.675V22.675C17.4389 22.675 22.6749 17.439 22.6749 11H19.6749ZM11 -0.124988C4.86457 -0.124988 -0.125049 4.86463 -0.125049 11H2.87495C2.87495 6.52149 6.52143 2.87501 11 2.87501V-0.124988ZM-0.125049 11C-0.125049 17.1354 4.86457 22.125 11 22.125V19.125C6.52143 19.125 2.87495 15.4785 2.87495 11H-0.125049ZM11 22.125C17.1353 22.125 22.125 17.1354 22.125 11H19.125C19.125 15.4785 15.4785 19.125 11 19.125V22.125ZM22.125 11C22.125 4.86463 17.1353 -0.124988 11 -0.124988V2.87501C15.4785 2.87501 19.125 6.52149 19.125 11H22.125Z'
              fill='black'
              mask='url(#path-1-inside-1_201_707)'
            />
            <path
              d='M11.0082 13.3381C11.9443 13.3356 12.8655 13.5723 13.6844 14.0258C14.4932 14.4736 15.1757 15.1181 15.669 15.8995L15.2892 15.2937L15.7164 15.0258C15.2217 14.4161 14.6219 13.9159 13.9511 13.5443C13.0677 13.0549 12.0614 12.7884 11.01 12.7881L11.0082 13.3381ZM11.0082 13.3381L11.0074 13.0372L11.0067 12.7881L6.3265 15.933C6.8179 15.1409 7.50307 14.4868 8.31751 14.0327C8.31756 14.0327 8.31762 14.0326 8.31768 14.0326C9.13958 13.5744 10.0655 13.3352 11.0065 13.338C11.007 13.3381 11.0076 13.3381 11.0082 13.3381Z'
              fill='#9C9C9C'
              stroke='black'
              strokeWidth='1.5'
            />
            <path
              d='M7.86636 8.41993C7.86636 8.30948 7.9559 8.21993 8.06636 8.21993C8.17681 8.21993 8.26636 8.30948 8.26636 8.41993C8.26636 8.53039 8.17681 8.61993 8.06636 8.61993C7.9559 8.61993 7.86636 8.53039 7.86636 8.41993Z'
              fill='#9C9C9C'
              stroke='black'
              strokeWidth='1.5'
            />
            <path
              d='M13.7331 8.41993C13.7331 8.30948 13.8226 8.21993 13.9331 8.21993C14.0435 8.21993 14.1331 8.30948 14.1331 8.41993C14.1331 8.53039 14.0435 8.61993 13.9331 8.61993C13.8226 8.61993 13.7331 8.53039 13.7331 8.41993Z'
              fill='#9C9C9C'
              stroke='black'
              strokeWidth='1.5'
            />
          </g>
          <defs>
            <clipPath id='clip0_201_707'>
              <rect width='22' height='22' fill='white' />
            </clipPath>
          </defs>
        </svg>
      ) : (
        <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <g clip-path='url(#clip0_201_664)'>
            <circle cx='11' cy='11' r='10' fill='#322C40' fill-opacity='0.84' />
            <mask id='path-2-inside-1_201_664' fill='white'>
              <path d='M11 21.175C5.3894 21.175 0.824951 16.6105 0.824951 11C0.824951 5.38945 5.3894 0.824997 11 0.824997C16.6105 0.824997 21.1749 5.38945 21.1749 11C21.1749 16.6105 16.6105 21.175 11 21.175ZM11 1.375C5.693 1.375 1.37495 5.69305 1.37495 11C1.37495 16.3069 5.693 20.625 11 20.625C16.3069 20.625 20.6249 16.3069 20.6249 11C20.6249 5.69305 16.3069 1.375 11 1.375Z' />
            </mask>
            <path
              d='M11 21.175C5.3894 21.175 0.824951 16.6105 0.824951 11C0.824951 5.38945 5.3894 0.824997 11 0.824997C16.6105 0.824997 21.1749 5.38945 21.1749 11C21.1749 16.6105 16.6105 21.175 11 21.175ZM11 1.375C5.693 1.375 1.37495 5.69305 1.37495 11C1.37495 16.3069 5.693 20.625 11 20.625C16.3069 20.625 20.6249 16.3069 20.6249 11C20.6249 5.69305 16.3069 1.375 11 1.375Z'
              fill='black'
            />
            <path
              d='M11 17.175C7.59854 17.175 4.82495 14.4014 4.82495 11H-3.17505C-3.17505 18.8197 3.18026 25.175 11 25.175V17.175ZM4.82495 11C4.82495 7.59859 7.59854 4.825 11 4.825V-3.175C3.18026 -3.175 -3.17505 3.18031 -3.17505 11H4.82495ZM11 4.825C14.4014 4.825 17.1749 7.59859 17.1749 11H25.1749C25.1749 3.18031 18.8196 -3.175 11 -3.175V4.825ZM17.1749 11C17.1749 14.4014 14.4014 17.175 11 17.175V25.175C18.8196 25.175 25.1749 18.8197 25.1749 11H17.1749ZM11 -2.625C3.48386 -2.625 -2.62505 3.48391 -2.62505 11H5.37495C5.37495 7.90219 7.90214 5.375 11 5.375V-2.625ZM-2.62505 11C-2.62505 18.5161 3.48386 24.625 11 24.625V16.625C7.90214 16.625 5.37495 14.0978 5.37495 11H-2.62505ZM11 24.625C18.516 24.625 24.6249 18.5161 24.6249 11H16.6249C16.6249 14.0978 14.0978 16.625 11 16.625V24.625ZM24.6249 11C24.6249 3.48391 18.516 -2.625 11 -2.625V5.375C14.0978 5.375 16.6249 7.90219 16.6249 11H24.6249Z'
              fill='#B0B0B0'
              mask='url(#path-2-inside-1_201_664)'
            />
            <path
              d='M6.31229 15.9561L5.84424 15.6673C6.38577 14.7848 7.14521 14.0564 8.04956 13.5522C8.95391 13.0479 9.97277 12.7848 11.0082 12.7881C13.1114 12.7881 15.0347 13.8534 16.1534 15.6371L15.6876 15.9291C15.1929 15.1344 14.5034 14.4793 13.6844 14.0258C12.8655 13.5723 11.9443 13.3356 11.0082 13.3381C10.0666 13.3349 9.14008 13.5741 8.31768 14.0326C7.49528 14.4911 6.80468 15.1535 6.31229 15.9561Z'
              fill='white'
            />
            <path
              d='M6.31229 15.9561L5.84424 15.6673C6.38577 14.7848 7.14521 14.0564 8.04956 13.5522C8.95391 13.0479 9.97277 12.7848 11.0082 12.7881C13.1114 12.7881 15.0347 13.8534 16.1534 15.6371L15.6876 15.9291C15.1929 15.1344 14.5034 14.4793 13.6844 14.0258C12.8655 13.5723 11.9443 13.3356 11.0082 13.3381C10.0666 13.3349 9.14008 13.5741 8.31768 14.0326C7.49528 14.4911 6.80468 15.1535 6.31229 15.9561Z'
              stroke='white'
            />
            <path
              d='M8.25 7.5C8.25 7.91421 7.91421 8.25 7.5 8.25C7.08579 8.25 6.75 7.91421 6.75 7.5C6.75 7.08579 7.08579 6.75 7.5 6.75C7.91421 6.75 8.25 7.08579 8.25 7.5Z'
              fill='white'
              stroke='white'
              stroke-width='1.5'
            />
            <path
              d='M15.25 7.5C15.25 7.91421 14.9142 8.25 14.5 8.25C14.0858 8.25 13.75 7.91421 13.75 7.5C13.75 7.08579 14.0858 6.75 14.5 6.75C14.9142 6.75 15.25 7.08579 15.25 7.5Z'
              fill='white'
              stroke='white'
              stroke-width='1.5'
            />
          </g>
          <defs>
            <clipPath id='clip0_201_664'>
              <rect width='22' height='22' fill='white' />
            </clipPath>
          </defs>
        </svg>
      )}
    </div>
  );
};