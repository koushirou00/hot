'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { UserProps } from '@/types/UserProps';
import { useEditForm } from '@/app/main/profile/edit/_hooks/useEditForm';
import { Button } from '@/components/elements/Button';
import { Label } from '@/components/elements/Label';
import { Input } from '@/components/elements/Input';
import { Textarea } from '@/components/elements/Textarea';
import { ImageSelecter } from './ImageSelecter';
import { LockIcon } from '@/app/main/_components/icons/LockIcon';

export const Contents: React.FC<UserProps> = (userData) => {
  const user = userData.user;
  const { register, watch, setValue, handleSubmit, errors, isSubmitting } = useEditForm(user);
  const router = useRouter();
  const lockWatched = watch('lock', user?.lock); //チェックボックスの監視

  return (
    <form onSubmit={handleSubmit} className='mb-28'>
      <div className='w-screen bg-[#EFE1DA] pt-9'>
        <ImageSelecter icon={user.icon || ''} setValue={setValue} />
        <svg viewBox='0 0 400 74' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M521 69.9972L506.528 62.4959C492.056 54.9945 463.111 39.9917 434.167 30.0055C405.222 19.8318 376.278 15.1434 347.333 22.5041C318.389 30.1462 289.444 49.8373 260.5 49.9779C231.556 49.8373 202.611 30.1462 173.667 17.4876C144.722 4.82901 115.778 0.140648 86.8333 -2.37253e-06C57.8889 0.140648 28.9444 4.82901 14.4722 7.50138L-3.8147e-06 9.98621V85H14.4722C28.9444 85 57.8889 85 86.8333 85C115.778 85 144.722 85 173.667 85C202.611 85 231.556 85 260.5 85C289.444 85 318.389 85 347.333 85C376.278 85 405.222 85 434.167 85C463.111 85 492.056 85 506.528 85H521V69.9972Z'
            fill='#FDFCFD'
          />
        </svg>
      </div>
      <div className='px-6'>
        <div className='!-mt-3'>
          <Label htmlFor='name'>お名前</Label>
          <br />
          <Input id='name' {...register('name')} type='text' className='' />
          {errors.name && <p className='text-sm text-red-700'>{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor='introduction'>ひとこと</Label>
          <br />
          <Textarea
            id='introduction'
            {...register('introduction')}
            placeholder={`${user.introduction === '' && '入力してください'}`}
          />
          {errors.introduction && <p>{errors.introduction.message}</p>}
        </div>
        <div>
          <Label htmlFor='x'>X(Twitter)のユーザー名</Label>
          <Input id='x' {...register('x')} type='text' className='' placeholder='@は入力しないでください' />
          {errors.x && <p className='text-sm text-red-700'>{errors.x.message}</p>}
        </div>
        <div>
          <Label htmlFor='instagram'>Instagramのユーザー名</Label>
          <Input id='instagram' {...register('instagram')} type='text' className='' placeholder='@は入力しないでください' />
          {errors.instagram && <p className='text-sm text-red-700'>{errors.instagram.message}</p>}
        </div>
        <div>
          <div className='mt-6 flex'>
            <p className='text-xl font-medium'>鍵アカウント</p>
            <LockIcon />
          </div>
          <ul className='text-xs'>
            <li className='mt-2'>・あなたのつぶやきはフォロワー以外に表示されません</li>
            <li className='mt-2'>・他ユーザーのフォロー・フォロワー欄にあなたのアカウントが表示されません</li>
            <li className='mt-2'>・フォロー中のイベントはフォロワーのみ閲覧可能です</li>
          </ul>
          <div className='mt-3 flex items-center justify-center'>
            <p className='pr-2 text-xs text-[#727272]'>{lockWatched ? '鍵アカウント' : '公開アカウント'}</p>
            <Label className='relative inline-block h-8 w-14'>
              <Input {...register('lock')} type='checkbox' className='peer sr-only' />
              <span className='block h-8 w-14 cursor-pointer rounded-full bg-gray-300 after:absolute after:left-1 after:top-1 after:h-6 after:w-6 after:rounded-full after:bg-white after:transition-transform peer-checked:bg-blue-500 peer-checked:after:translate-x-6'></span>
            </Label>
          </div>
        </div>
        <div className='flex justify-around pt-7'>
          <Button type='button' onClick={() => router.replace('/main/profile')} variant='cancel' disabled={isSubmitting}>
            キャンセル
          </Button>
          <Button type='submit' variant='primary' disabled={isSubmitting}>
            保存する
          </Button>
        </div>
      </div>
    </form>
  );
};
