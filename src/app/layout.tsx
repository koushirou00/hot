import type { Metadata } from 'next';
import { ToastContainer, toast } from 'react-toastify';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'HOT ユーザーページ',
  description: 'WEBサイトHOTの登録済みユーザーのみが閲覧できるページです。'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body className='mx-auto'>
        {children}
        <ToastContainer
          position='top-center'
          autoClose={3000}
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
