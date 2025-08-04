'use client';

import { useQuery, QueryClient, QueryClientProvider, HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { DehydratedState } from '@tanstack/react-query';
import css from './NoteDetails.client.module.css';

interface NoteDetailsClientProps {
  noteId: string;
  dehydratedState: DehydratedState;
}

export default function NoteDetailsClient({ noteId, dehydratedState }: NoteDetailsClientProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <NoteDetails noteId={noteId} />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
function NoteDetails({ noteId }: { noteId: string }) {
  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error) {
    console.error('Error fetching note:', error);
    return <p>Error: {(error as Error).message}</p>;
  }

  if (!note) return <p>No note found.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{new Date(note.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
