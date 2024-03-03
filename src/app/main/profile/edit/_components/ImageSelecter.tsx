import React, { useRef, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { UserEditData } from '@/types/userEditData';

import { Input } from '@/components/elements/Input';
import { Label } from '@/components/elements/Label';
import { UserIcon } from '@/app/main/_components/icons/UserIcon';
import { toastPromise } from '@/utils/toastify/toast';

type ImageSelecterProps = {
  icon: string;
  setValue: UseFormSetValue<UserEditData>;
};

const heicToWebp = async (file: File) => {
  const heic2any = (await import('heic2any')).default;
  const convertedBlob = (await heic2any({ blob: file, toType: 'image/webp' })) as Blob;
  // BlobをFileに変換
  return new File([convertedBlob], file.name, { type: 'image/webp' });
};

export const ImageSelecter: React.FC<ImageSelecterProps> = ({ icon, setValue }) => {
  const fileInputRef = useRef<HTMLInputElement>(null); // ファイル入力を察知
  // 画像プレビューURLの状態
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // ファイル選択時：画像プレビューを生成、保存用のfileを設定
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList || fileList.length === 0) return;
    let file = fileList[0];
    //HEICは表示できないので変換
    if (file.type === 'image/heic')
      file = await toastPromise(heicToWebp(file), {
        pending: '画像の読み込み中...',
        success: '変更する場合は保存を押してください',
        error: '画像の変換に失敗しました。もう一度お試しください。'
      });

    setImagePreview(URL.createObjectURL(file));
    setValue('iconFile', file);
  };

  return (
    <div className='relative mx-auto'>
      <Label htmlFor='file' className='flex cursor-pointer'>
        <Input id='file' type='file' onChange={handleFileChange} ref={fileInputRef} className='hidden' />
        <div className='relative z-10 mx-auto h-[123px] w-[123px] rounded-full border-[5px] border-white'>
          <UserIcon src={imagePreview || icon} alt='' size='large' />
          {/* カメラアイコンをUserIconの右下に配置 */}
          <div className='absolute bottom-0 right-0 z-20 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-blue-500/80'>
            <svg className='h-6 w-6 text-white' viewBox='0 0 31 31' fill='' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M11.217 0.5C10.7305 0.500015 10.2537 0.635185 9.83961 0.890428C9.42553 1.14567 9.09052 1.51095 8.87196 1.9455L7.83946 4H4.88196C3.72164 4 2.60884 4.46094 1.78837 5.28141C0.967894 6.10188 0.506958 7.21468 0.506958 8.375V22.375C0.506958 23.5353 0.967894 24.6481 1.78837 25.4686C2.60884 26.2891 3.72164 26.75 4.88196 26.75H13.8C13.5138 26.1907 13.2834 25.6045 13.1122 25H4.88371C4.18752 25 3.51984 24.7234 3.02755 24.2312C2.53527 23.7389 2.25871 23.0712 2.25871 22.375V8.375C2.25871 7.67881 2.53527 7.01113 3.02755 6.51884C3.51984 6.02656 4.18752 5.75 4.88371 5.75H8.38021C8.54227 5.74967 8.70106 5.70434 8.83887 5.61905C8.97668 5.53377 9.0881 5.41189 9.16071 5.267L10.4347 2.73125C10.5077 2.58642 10.6195 2.46472 10.7576 2.37974C10.8957 2.29476 11.0548 2.24984 11.217 2.25H17.804C17.9666 2.24968 18.1261 2.29471 18.2646 2.38003C18.4031 2.46534 18.5151 2.58758 18.588 2.733L19.8532 5.26525C19.9259 5.41041 20.0376 5.53246 20.1758 5.61776C20.3139 5.70306 20.4731 5.74824 20.6355 5.74825H24.1337C24.8299 5.74825 25.4976 6.02481 25.9899 6.51709C26.4821 7.00938 26.7587 7.67706 26.7587 8.37325V13.8035C27.3823 14.123 27.9692 14.5097 28.5087 14.9567V8.37325C28.5087 7.21293 28.0478 6.10013 27.2273 5.27966C26.4068 4.45919 25.294 3.99825 24.1337 3.99825H21.1762L20.1525 1.95075C19.9344 1.51469 19.5991 1.14798 19.1843 0.891743C18.7695 0.635503 18.2915 0.499854 17.804 0.5H11.217ZM14.5 7.5C16.0626 7.50006 17.5803 8.02274 18.8117 8.98485C20.043 9.94697 20.9172 11.2933 21.2952 12.8095C20.7134 12.8746 20.1387 12.9929 19.5785 13.163C19.3433 12.2696 18.8766 11.454 18.2256 10.7986C17.5745 10.1431 16.762 9.67103 15.8702 9.42994C14.9783 9.18885 14.0387 9.18729 13.1461 9.42541C12.2534 9.66353 11.4394 10.1329 10.7861 10.7862C10.1329 11.4394 9.66348 12.2535 9.42536 13.1461C9.18725 14.0387 9.18881 14.9784 9.4299 15.8702C9.67099 16.7621 10.1431 17.5745 10.7985 18.2256C11.4539 18.8767 12.2695 19.3434 13.163 19.5785C12.993 20.1382 12.8747 20.7122 12.8095 21.2935C11.1559 20.8756 9.71167 19.8687 8.74773 18.4617C7.78378 17.0548 7.36639 15.3444 7.57386 13.6515C7.78134 11.9586 8.59942 10.3997 9.8746 9.26708C11.1498 8.13451 12.7944 7.50618 14.5 7.5ZM30.25 22.375C30.25 24.4636 29.4203 26.4666 27.9434 27.9435C26.4666 29.4203 24.4635 30.25 22.375 30.25C20.2864 30.25 18.2833 29.4203 16.8065 27.9435C15.3296 26.4666 14.5 24.4636 14.5 22.375C14.5 20.2864 15.3296 18.2834 16.8065 16.8065C18.2833 15.3297 20.2864 14.5 22.375 14.5C24.4635 14.5 26.4666 15.3297 27.9434 16.8065C29.4203 18.2834 30.25 20.2864 30.25 22.375ZM23.25 18.875C23.25 18.6429 23.1578 18.4204 22.9937 18.2563C22.8296 18.0922 22.607 18 22.375 18C22.1429 18 21.9203 18.0922 21.7562 18.2563C21.5921 18.4204 21.5 18.6429 21.5 18.875V21.5H18.875C18.6429 21.5 18.4203 21.5922 18.2562 21.7563C18.0921 21.9204 18 22.1429 18 22.375C18 22.6071 18.0921 22.8296 18.2562 22.9937C18.4203 23.1578 18.6429 23.25 18.875 23.25H21.5V25.875C21.5 26.1071 21.5921 26.3296 21.7562 26.4937C21.9203 26.6578 22.1429 26.75 22.375 26.75C22.607 26.75 22.8296 26.6578 22.9937 26.4937C23.1578 26.3296 23.25 26.1071 23.25 25.875V23.25H25.875C26.107 23.25 26.3296 23.1578 26.4937 22.9937C26.6578 22.8296 26.75 22.6071 26.75 22.375C26.75 22.1429 26.6578 21.9204 26.4937 21.7563C26.3296 21.5922 26.107 21.5 25.875 21.5H23.25V18.875Z'
                fill='currentColor'
              />
            </svg>
          </div>
        </div>
      </Label>
    </div>
  );
};
