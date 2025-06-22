import { dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import getQueryClient from '@/lib/getQueryClient';
import NoteDetails from './NoteDetails.client';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export default async function NoteDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <TanStackProvider dehydratedState={dehydratedState}>
      <NoteDetails />
    </TanStackProvider>
  );
}
