import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

async function getPost() {
  await new Promise((res) => setTimeout(res, 500));
  return [{ name: 'John Doe' }, { name: 'Jane Doe' }];
}

export async function loader() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['people'],
    queryFn: getPost,
  });

  return { dehydratedState: dehydrate(queryClient) };
}

export default function QueryTest() {
  const { data } = useQuery({
    queryKey: ['people'],
    queryFn: getPost,
  });

  return (
    <div className='p-4'>
      <h1 className='text-2xl mb-4'>People list</h1>
      <ul>
        {data ? data.map((person) => <li key={person.name}>{person.name}</li>) : <b>loading</b>}
      </ul>
    </div>
  );
}
