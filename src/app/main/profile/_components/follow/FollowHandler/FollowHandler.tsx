'use client';
import React from 'react';
import { useFollowHandle } from '@/app/main/profile/_components/follow/FollowHandler/hooks/useFollowHandle';
import { ConfirmDialog } from '@/components/layouts/ConfirmDialog';
import { Button } from '@/components/elements/Button';

type FollowHandleTriggerProps = {
  handler: 'approveOrRejection' | 'followerDelete' | 'newFollow' | 'newFollowRequest' | 'followRequestCancel' | 'followDelete';
  recordId?: string;
  otherUserId?: string;
  lock?: boolean;
};

// テキスト設定用
const buttonSetting = (handler: string) => {
  let dialogText: string;
  let buttonText: string;
  let buttonVariant: string = 'primary';
  switch (handler) {
    case 'approveOrRejection':
      dialogText = `フォロー申請を拒否しますか？\n※拒否したことは相手ユーザーへ通知されません`;
      buttonText = '拒否';
      buttonVariant = 'reject';
      break;
    case 'followerDelete':
      dialogText = `フォロワーから削除しますか？\n※削除したことは相手ユーザーへ通知されません`;
      buttonText = 'このフォロワーを削除';
      buttonVariant = 'delete';
      break;
    case 'newFollow':
      dialogText = `フォローしますか`;
      buttonText = 'フォロー';
      break;
    case 'newFollowRequest':
      dialogText = `フォロー申請しますか`;
      buttonText = 'フォロー申請';
      break;
    case 'followRequestCancel':
      dialogText = 'フォロー申請を解除しますか';
      buttonText = 'フォロー申請中';
      buttonVariant = 'delete';
      break;
    case 'followDelete':
      dialogText = 'フォローを解除しますか？\n※解除したことは相手ユーザーへ通知されません';
      buttonText = 'フォロー中';
      buttonVariant = 'delete';
      break;
    default:
      buttonVariant = 'primary';
      dialogText = '';
      buttonText = '';
  }
  return { dialogText, buttonText, buttonVariant };
};

export const FollowHandler: React.FC<FollowHandleTriggerProps> = ({ handler, recordId, otherUserId }) => {
  const { showDialog, setShowDialog, handleDialog } = useFollowHandle();

  const { dialogText, buttonText, buttonVariant } = buttonSetting(handler);

  return (
    <div className='flex justify-around'>
      <Button
        onClick={() =>
          setShowDialog({
            action: handler,
            text: dialogText,
            recordId: recordId,
            otherUserId: otherUserId
          })
        }
        variant={buttonVariant}
        className='h-2/3 py-[7px]' //ユーザーフォロー関連のボタンのみカスタム
      >
        {buttonText}
      </Button>

      {handler === 'approveOrRejection' && (
        <Button
          onClick={() =>
            setShowDialog({
              action: 'approve',
              text: `フォローリクエストを承諾しますか？`,
              recordId: recordId || ''
            })
          }
          variant='approve'
          className='h-2/3 py-[7px]'
        >
          承諾
        </Button>
      )}

      {showDialog && <ConfirmDialog onClose={(confirm) => handleDialog(confirm)} text={showDialog?.text} />}
    </div>
  );
};
