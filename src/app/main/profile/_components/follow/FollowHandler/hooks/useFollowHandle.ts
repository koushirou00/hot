'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toastPromise } from '@/utils/toastify/toast';
import { clientApi } from '@/functions/api/clientApi';

export const useFollowHandle = () => {
  const api = clientApi();
  const router = useRouter();

  const [showDialog, setShowDialog] = useState<{
    action: string;
    text: string;
    recordId?: string;
    otherUserId?: string;
    lock?: boolean;
  } | null>(null);

  // フォロー許可 or 削除
  const handleDialog = async (confirm: boolean) => {
    console.log(showDialog);
    if (!confirm || !showDialog) return setShowDialog(null);
    if (showDialog.action === 'newFollow' && showDialog.otherUserId) {
      await toastPromise<Response>(api.postFollow(showDialog.otherUserId));
      router.refresh();
    } else if (showDialog.action === 'newFollowRequest' && showDialog.otherUserId) {
      await toastPromise<Response>(api.postLockFollow(showDialog.otherUserId)); //鍵アカウントユーザーのフォロー
      router.refresh();
    } else if (showDialog.action === 'approve' && showDialog.recordId) {
      await toastPromise<Response>(api.approveFollow(showDialog.recordId));
      router.refresh();
    } else if (showDialog.recordId) {
      await toastPromise<Response>(api.deleteFollow(showDialog.recordId));
      router.refresh();
    }
    setShowDialog(null);
  };

  return { showDialog, setShowDialog, handleDialog };
};
