import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HOT ユーザーページ',
  description: 'WEBサイトHOTの登録済みユーザーのみが閲覧できるページです。'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body className='mx-auto'>{children}</body>
    </html>
  );
}
