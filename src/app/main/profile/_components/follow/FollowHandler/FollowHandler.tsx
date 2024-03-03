'use client';
import React from 'react';
import { ButtonProps } from '@/types/Button';
import { usePathname } from 'next/navigation';
import { useFollowHandle } from '@/app/main/profile/_components/follow/FollowHandler/hooks/useFollowHandle';
import { ConfirmDialog } from '@/components/layouts/ConfirmDialog';
import { Button } from '@/components/elements/Button';

type FollowHandleTriggerProps = {
  handler: string;
  recordId?: string;
  otherUserId?: string;
};

// テキスト設定用
const buttonSetting = (handler: string) => {
  const settings: Record<
    string,
    {
      dialogText: string;
      dialogSubText?: string;
      buttonText: string;
      buttonProps?: ButtonProps;
    }
  > = {
    followerDelete: {
      dialogText: 'フォロワーから削除しますか？',
      dialogSubText: '※削除したことは相手ユーザーへ通知されません',
      buttonText: 'このフォロワーを削除',
      buttonProps: { color: 'delete' }
    },
    newFollow: {
      dialogText: 'フォローしますか',
      buttonText: 'フォロー'
    },
    newFollowRequest: {
      dialogText: 'フォロー申請しますか',
      buttonText: 'フォロー申請'
    },
    followRequestCancel: {
      dialogText: 'フォロー申請を解除しますか',
      buttonText: 'フォロー申請中',
      buttonProps: { color: 'secondary' }
    },
    followDelete: {
      dialogText: 'フォローを解除しますか？',
      dialogSubText: '※解除したことは相手ユーザーへ通知されません',
      buttonText: 'フォロー中',
      buttonProps: { color: 'secondary' }
    }
  };
  const handlerSetting = settings[handler] || {};

  // デフォルトの buttonProps
  const defaultButtonProps: ButtonProps = { color: 'primary', size: 'xs' };
  // buttonProps が存在存在しない場合は defaultButtonProps を使用
  const mergedButtonProps = { ...defaultButtonProps, ...(handlerSetting.buttonProps || {}) };

  return {
    ...handlerSetting,
    buttonProps: mergedButtonProps
  };
};

export const FollowHandler: React.FC<FollowHandleTriggerProps> = ({ handler, recordId, otherUserId }) => {
  const pathname = usePathname();
  const otherTopPage = !pathname.includes('detail'); //urlから一覧ページ or プロフィールトップを判断

  const { showDialog, setShowDialog, handleDialog } = useFollowHandle();
  const { dialogText, dialogSubText, buttonText, buttonProps } = buttonSetting(handler);

  return (
    <>
      {handler === 'approveOrRejection' ? (
        <div className='flex justify-center'>
          <Button
            onClick={() =>
              setShowDialog({
                action: 'delete',
                text: 'フォロー申請を拒否しますか？',
                subText: '※拒否したことは相手ユーザーへ通知されません',
                recordId: recordId || ''
              })
            }
            color='delete'
            variant='outline'
            rounder={otherTopPage ? 'nomal' : 'lg'}
            size={otherTopPage ? 'lg' : 'xs'}
          >
            拒否
          </Button>
          <Button
            onClick={() =>
              setShowDialog({
                action: 'approve',
                text: `フォローリクエストを承諾しますか？`,
                recordId: recordId || ''
              })
            }
            color='secondary'
            variant='outline'
            size={otherTopPage ? 'lg' : 'xs'}
            rounder={otherTopPage ? 'nomal' : 'lg'}
            className='ml-4'
          >
            承諾
          </Button>
        </div>
      ) : (
        <div className='flex justify-center'>
          <Button
            onClick={() =>
              setShowDialog({
                action: handler,
                text: dialogText,
                subText: dialogSubText,
                recordId: recordId,
                otherUserId: otherUserId
              })
            }
            {...buttonProps}
            size={otherTopPage ? 'xl' : 'xs'}
          >
            {buttonText}
          </Button>
        </div>
      )}

      {showDialog && <ConfirmDialog onClose={(confirm) => handleDialog(confirm)} text={showDialog?.text} subText={showDialog?.subText} />}
    </>
  );
};
