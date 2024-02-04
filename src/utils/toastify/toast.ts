import { toast } from 'react-toastify';
import '@/utils/toastify/toast.css';

type Response = {
  message: string;
  status: number;
};

// カスタムToastの表示関数
export function toastPromise(promise: Promise<Response>) {
  return toast.promise(promise, {
    pending: 'しばらくお待ちください...',
    success: '完了いたしました  🚀',
    error: '失敗しました。更新後再度お試しください 🤯'
  });
}
