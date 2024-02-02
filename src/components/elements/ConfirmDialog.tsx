// src/app/components/elements/ConfirmDialog.tsx
import React from 'react';
import { Button } from '@/components/elements/Button';

type Props = {
  show: boolean;
  action?: string;
  onClose: (value: boolean) => void;
};

export const ConfirmDialog: React.FC<Props> = ({ show, onClose, action }) => {
  let text = null;
  switch (action) {
    case 'rejection':
      text = `フォロー申請を拒否しますか？\n※拒否したことは相手ユーザーへ通知されません`;
      break;
    case 'approve':
      text = 'フォローリクエストを承諾しますか？';
      break;
    case 'unpending':
      text = 'フォロー申請を解除しますか？\n※解除したことは相手ユーザーへ通知されません';
      break;
    case 'unfollow':
      text = 'フォロワーから削除しますか？\n※削除したことは相手ユーザーへ通知されません';
      break;
  }
  if (!show) {
    return null;
  }

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
