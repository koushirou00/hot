'use client';
import React from 'react';
import { useEventFollowHandle } from './hooks/useEventFollowHandle';
import { ConfirmDialog } from '@/components/layouts/ConfirmDialog';
import { Button } from '@/components/elements/Button';

type EventFollowHandleTriggerProps = {
  handler: 'newFollow' | 'followDelete';
  eventId?: string;
  recordId?: string;
};

// テキスト設定用
const buttonSetting = (handler: string) => {
  let dialogText: string;
  let buttonText: string;
  switch (handler) {
    case 'newFollow':
      dialogText = `フォローしますか`;
      buttonText = 'フォロー';
      break;
    case 'followDelete':
      dialogText = 'フォローを解除しますか？';
      buttonText = 'フォロー中';
      break;
    default:
      dialogText = '';
      buttonText = '';
  }
  return { dialogText, buttonText };
};

export const EventFollowHandler: React.FC<EventFollowHandleTriggerProps> = ({ handler, eventId, recordId }) => {
  const { showDialog, setShowDialog, handleDialog } = useEventFollowHandle();

  const { dialogText, buttonText } = buttonSetting(handler);

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
        variant={handler === 'newFollow' ? 'primary' : 'delete'}
      >
        {buttonText}
      </Button>
      {showDialog && <ConfirmDialog onClose={(confirm) => handleDialog(confirm)} text={showDialog?.text} />}
    </div>
  );
};
