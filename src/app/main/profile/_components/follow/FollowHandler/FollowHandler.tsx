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
  switch (handler) {
    case 'approveOrRejection':
      dialogText = `フォロー申請を拒否しますか？\n※拒否したことは相手ユーザーへ通知されません`;
      buttonText = '拒否';
      break;
    case 'followerDelete':
      dialogText = `フォロワーから削除しますか？\n※削除したことは相手ユーザーへ通知されません`;
      buttonText = 'このフォロワーを削除';
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
      break;
    case 'followDelete':
      dialogText = 'フォローを解除しますか？\n※解除したことは相手ユーザーへ通知されません';
      buttonText = 'フォロー中';
      break;
    default:
      dialogText = '';
      buttonText = '';
  }
  return { dialogText, buttonText };
};

export const FollowHandler: React.FC<FollowHandleTriggerProps> = ({ handler, recordId, otherUserId }) => {
  const { showDialog, setShowDialog, handleDialog } = useFollowHandle();

  const { dialogText, buttonText } = buttonSetting(handler);

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
        variant={handler === 'newFollow' || handler === 'newFollowRequest' ? 'primary' : 'delete'}
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
        >
          承諾
        </Button>
      )}

      {showDialog && <ConfirmDialog onClose={(confirm) => handleDialog(confirm)} text={showDialog?.text} />}
    </div>
  );
};
