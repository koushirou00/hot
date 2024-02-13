import type { Metadata } from 'next';
import { ToastContainer, toast } from 'react-toastify';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

// fetchキャッシュのデフォルト指定
export const fetchCache = 'default-no-store';

export const metadata: Metadata = {
  title: 'HOT ユーザーページ',
  description: 'WEBサイトHOTの登録済みユーザーのみが閲覧できるページです。'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body className='flex items-center'>
        {children}
        <ToastContainer
          position='top-center'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='colored'
        />
      </body>
    </html>
  );
}
