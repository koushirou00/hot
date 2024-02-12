// src/utils/supabase/imageUpload.tsx
import { supabaseClient } from '@/lib/supabaseClient';

//画像サイズの変換
const resizer = async (file: File, maxWidth: number, maxHeight: number): Promise<File> => {
  const img = new Image();
  img.src = URL.createObjectURL(file);

  await new Promise((resolve) => {
    img.onload = () => resolve(img);
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const aspectRatio = img.width / img.height;

  if (aspectRatio > 1) {
    canvas.width = maxWidth;
    canvas.height = maxWidth / aspectRatio;
  } else {
    canvas.width = maxHeight * aspectRatio;
    canvas.height = maxHeight;
  }

  if (!ctx) throw Error('ctxがnullです');
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  URL.revokeObjectURL(img.src);

  const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', 0.8));
  if (!blob) throw new Error('リサイズ後のBlobがnullです。');
  // 拡張子を置き換える
  const resizedFile = new File([blob], file.name.slice(0, file.name.lastIndexOf('.')) + '.webp', { type: 'image/webp' });
  return resizedFile;
};

/* supabaseStorageに保存できればURLを返す */
export const imageUploader = async (file: File, filePath: string): Promise<string> => {
  const convertedFile = await resizer(file, 500, 500);
  const { data, error } = await supabaseClient.storage.from('project').upload(filePath, convertedFile, { upsert: true });
  if (error) throw new Error(`画像のアップロード失敗: ${error.message}`);

  const { data: urlData } = supabaseClient.storage.from('project').getPublicUrl(data.path);
  return urlData.publicUrl;
};
