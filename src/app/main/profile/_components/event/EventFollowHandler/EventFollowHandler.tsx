'use client';
import React from 'react';
import { useEventFollowHandle } from './hooks/useEventFollowHandle';
import { ConfirmDialog } from '@/components/layouts/ConfirmDialog';
import { Button } from '@/components/elements/Button';
import { ButtonProps } from '@/types/Button';

type Handler = 'newFollow' | 'followDelete';

type EventFollowHandleTriggerProps = {
  handler: Handler;
  eventId?: string;
  recordId?: string;
};

// テキスト設定用
const buttonSetting = (handler: Handler) => {
  const settings: Record<
    Handler,
    {
      dialogText: string;
      buttonText: string;
      buttonProps?: ButtonProps;
    }
  > = {
    newFollow: {
      dialogText: `フォローしますか`,
      buttonText: 'フォロー'
    },
    followDelete: {
      dialogText: 'フォローを解除しますか？',
      buttonText: 'フォロー中',
      buttonProps: { color: 'secondary' }
    }
  };

  const handlerSetting = settings[handler];

  // デフォルトの buttonProps
  const defaultButtonProps: ButtonProps = { color: 'primary' };
  // buttonProps が存在存在しない場合は defaultButtonProps を使用
  const mergedButtonProps = { ...defaultButtonProps, ...handlerSetting.buttonProps };

  return {
    ...handlerSetting,
    buttonProps: mergedButtonProps
  };
};

export const EventFollowHandler: React.FC<EventFollowHandleTriggerProps> = ({ handler, eventId, recordId }) => {
  const { showDialog, setShowDialog, handleDialog } = useEventFollowHandle();

  const { dialogText, buttonText, buttonProps } = buttonSetting(handler);

  return (
    <div className='flex justify-around'>
      <Button
        onClick={() =>
          setShowDialog({
            action: handler,
            text: dialogText,
            recordId: recordId,
            eventId: eventId
          })
        }
        {...buttonProps}
      >
        {buttonText}
      </Button>
      {showDialog && <ConfirmDialog onClose={(confirm) => handleDialog(confirm)} text={showDialog?.text} />}
    </div>
  );
};
