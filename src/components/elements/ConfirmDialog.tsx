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
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-4 rounded-lg shadow-lg w-72 flex flex-col justify-center items-center'>
        <p className='mb-4 text-justify'>{text}</p>
        <div className='flex justify-around w-full'>
          <Button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => onClose(true)}>
            はい
          </Button>
          <Button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => onClose(false)}>
            いいえ
          </Button>
        </div>
      </div>
    </div>
  );
};
