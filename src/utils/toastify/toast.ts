import { toast } from 'react-toastify';
import '@/utils/toastify/toast.css';

export function toastPromise<T>(
  promise: Promise<T>,
  messages: {
    pending?: string;
    success?: string;
    error?: string;
  } = {}
) {
  return toast.promise(promise, {
    pending: messages.pending || 'しばらくお待ちください...',
    success: messages.success || '完了いたしました 🚀',
    error: messages.error || '失敗しました。更新後再度お試しください 🤯'
  });
}
