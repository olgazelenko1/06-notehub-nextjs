import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api';

interface NoteDetailsPageProps {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: NoteDetailsPageProps) {
  const id = params.id;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient noteId={id} dehydratedState={dehydratedState} />
    </HydrationBoundary>
  );
}
