// src/components/elements/ConfirmDialog.tsx
import React from 'react';
import { Button } from '@/components/elements/Button';

type Props = {
  text: string;
  onClose: (value: boolean) => void;
};

export const ConfirmDialog: React.FC<Props> = ({ onClose, text }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='flex w-72 flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg'>
        <p className='mb-4 text-justify'>{text}</p>
        <div className='flex w-full justify-around'>
          <Button variant='primary' onClick={() => onClose(true)}>
            はい
          </Button>
          <Button variant='cancel' onClick={() => onClose(false)}>
            いいえ
          </Button>
        </div>
      </div>
    </div>
  );
};
