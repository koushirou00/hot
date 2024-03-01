'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toastPromise } from '@/utils/toastify/toast';
import { clientApi } from '@/functions/api/clientApi';

export const useEventFollowHandle = () => {
  const api = clientApi();
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
      await toastPromise<Response>(api.postFollowEvent(showDialog.eventId));
      router.refresh();
    } else if (showDialog.action === 'delete' && showDialog.recordId) {
      await toastPromise<Response>(api.deleteFollowEvent(showDialog.recordId));
      router.refresh();
    }
    setShowDialog(null);
  };

  return { showDialog, setShowDialog, handleDialog };
};
