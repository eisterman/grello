import type { Metadata } from 'next';
import './globals.css';
import { TRPCReactProvider } from '@/trpc/client';

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
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
