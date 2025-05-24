import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createContext } from '@/server/trpc/context';
import { appRouter } from '@/server/trpc/router';

export const loader = async (args: LoaderFunctionArgs) => {
  return handleRequest(args);
};

export const action = async (args: ActionFunctionArgs) => {
  return handleRequest(args);
};

function handleRequest(args: LoaderFunctionArgs | ActionFunctionArgs) {
  return fetchRequestHandler({
    endpoint: '/trpc',
    req: args.request,
    router: appRouter,
    createContext,
  });
}
