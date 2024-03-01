// src/app/main/profile/edit/_hooks/useEditForm.ts
import { User } from '@prisma/client';
import { UserEditData } from '@/types/userEditData';
import { useRouter } from 'next/navigation';
import { clientApi } from '@/functions/api/clientApi';
import { toastPromise } from '@/utils/toastify/toast';
import { imageUploader } from '@/utils/supabase/imageUpload';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(1, 'お名前は必須です。').max(30, 'お名前は30文字以内で入力してください。'),
  introduction: z.string().min(1, 'ひとことは必須です。').max(200, 'ひとことは200文字以内で入力してください。'),
  lock: z.boolean(),
  instagram: z
    .string()
    .optional()
    .refine((val) => val === undefined || val === '' || /^(?!.*\.\.)(?!.*\.$)(?!^\.)[a-zA-Z0-9._]{1,30}$/.test(val), {
      message: '無効な形式のユーザーネームです'
    }),
  x: z
    .string()
    .optional()
    .refine((val) => val === undefined || val === '' || /^[\w]{1,15}$/.test(val), {
      message: '無効なユーザーネームです。'
    })
});

export const useEditForm = (user: User) => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<UserEditData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      name: user.name,
      introduction: user.introduction || '',
      lock: user.lock,
      iconFile: undefined,
      iconUrl: undefined,
      instagram: user.instagram ? user.instagram.replace('https://www.instagram.com/', '') : '',
      x: user.x ? user.x.replace('https://twitter.com/', '') : ''
    }
  });

  const router = useRouter();
  const api = clientApi();
  const onSubmit = async (data: UserEditData) => {
    try {
      const addIconFile = getValues(); // 全データ再取得
      data = addIconFile;

      if (data.iconFile && data.iconFile instanceof File) {
        // 画像を変換してアップロード
        const filePath = `profile/${user.id}`; //storageでの保存場所
        data.iconUrl = await imageUploader(data.iconFile, filePath);
      }

      await toastPromise<Response>(api.patchUser(data));
      router.push('/main/profile');
    } catch (error) {
      console.error('フォームの送信に失敗しました。', error);
    }
  };

  return { register, watch, setValue, handleSubmit: handleSubmit(onSubmit), errors, isSubmitting };
};
