import React from 'react';
import { headers } from 'next/headers';
import Image from 'next/image';

async function patchUserData(userId: string) {
  const host = headers().get('host');
  const response = await fetch(`http://${host}/api/user`, {
    method: 'PATCH'
  });
  if (!response.ok) throw new Error(`ユーザー情報更新のAPIで失敗しました: ${response}`);
  return response.json();
}

export const Contents: React.FC = async () => {
  //user情報を受け取る

  return <div></div>;
};
