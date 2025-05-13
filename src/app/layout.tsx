import type { Metadata } from 'next';
import './globals.css';
import { TRPCReactProvider } from '@/trpc/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const metadata: Metadata = {
  title: 'Grello Test Dashboard',
  description: 'First MVP for Grello!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='h-full'>
      <body className='h-full'>
        <TRPCReactProvider>
          <>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
