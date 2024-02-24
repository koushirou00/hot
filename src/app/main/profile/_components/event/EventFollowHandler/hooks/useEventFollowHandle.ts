'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toastPromise } from '@/utils/toastify/toast';
import { deleteFollowEvent } from '@/functions/api/event/deleteFollowEvent';
import { newFollowEvent } from '@/functions/api/event/newFollowEvent';

export const useEventFollowHandle = () => {
  const router = useRouter();

  const [showDialog, setShowDialog] = useState<{
    action: string;
    text: string;
    recordId?: string;
    eventId?: string;
  } | null>(null);

  // フォロー許可 or 削除
  const handleDialog = async (confirm: boolean) => {
    if (!confirm || !showDialog) return setShowDialog(null);

    if (showDialog.action === 'newFollow' && showDialog.eventId) {
      await toastPromise<Response>(newFollowEvent(showDialog.eventId));
      router.refresh();
    } else if (showDialog.action === 'delete' && showDialog.recordId) {
      await toastPromise<Response>(deleteFollowEvent(showDialog.recordId));
      router.refresh();
    }
    setShowDialog(null);
  };

  return { showDialog, setShowDialog, handleDialog };
};
