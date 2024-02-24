'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { newFollow } from '@/functions/api/follow/newFollow';
import { approveFollow } from '@/functions/api/follow/approveFollow';
import { deleteFollow } from '@/functions/api/follow/deleteFollow';
import { toastPromise } from '@/utils/toastify/toast';

export const useFollowHandle = () => {
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
    if (!confirm || !showDialog) return setShowDialog(null);

    if (showDialog.action === 'newFollow' && showDialog.otherUserId) {
      await toastPromise<Response>(newFollow(showDialog.otherUserId));
      router.refresh();
    } else if (showDialog.action === 'newFollowRequest' && showDialog.otherUserId) {
      await toastPromise<Response>(newFollow(showDialog.otherUserId, true)); //鍵アカウント判定用真偽値
      router.refresh();
    } else if (showDialog.action === 'approve' && showDialog.recordId) {
      await toastPromise<Response>(approveFollow(showDialog.recordId));
      router.refresh();
    } else if (showDialog.recordId) {
      await toastPromise<Response>(deleteFollow(showDialog.recordId));
      router.refresh();
    }
    setShowDialog(null);
  };

  return { showDialog, setShowDialog, handleDialog };
};
