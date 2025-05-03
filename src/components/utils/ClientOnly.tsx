// All Credits to https://github.com/BKWLD/next-client-only
import React from 'react';
import dynamic from 'next/dynamic';

type ClientOnlyProps = {
  children: React.ReactNode;
};

const Component: React.FC<ClientOnlyProps> = ({ children }) => {
  return <>{children}</>;
};

const ClientOnly = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});

export { ClientOnly };

export type { ClientOnlyProps };
