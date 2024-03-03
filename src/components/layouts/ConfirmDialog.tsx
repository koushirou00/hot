// src/components/elements/ConfirmDialog.tsx
import React from 'react';
import { Button } from '@/components/elements/Button';

type Props = {
  text: string;
  subText?: string;
  onClose: (value: boolean) => void;
};

export const ConfirmDialog: React.FC<Props> = ({ onClose, text, subText }) => {
  return (
    <div className='fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='flex w-80 flex-col items-center justify-center rounded-lg bg-white px-4 pb-4 pt-4 shadow-lg'>
        <div className='mx-auto mb-4'>
          <p className='text-center'>{text}</p>
          {subText && <span className='mt-1 block w-fit text-wrap text-xs'>{subText}</span>}
        </div>
        <div className='mt-1 flex w-full justify-around'>
          <Button color='primary' variant='solid' onClick={() => onClose(true)} className='min-w-16'>
            はい
          </Button>
          <Button color='cancel' variant='solid' onClick={() => onClose(false)}>
            いいえ
          </Button>
        </div>
      </div>
    </div>
  );
};
