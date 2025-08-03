import { fetchNotes } from '@/lib/api';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import NotesClient from '@/app/notes/Note.Client';

interface NotesPageProps {
  searchParams?: { search?: string };
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const queryClient = new QueryClient();
  const page = 1;
  const perPage = 12;
  const search = searchParams?.search || '';

await queryClient.prefetchQuery({
  queryKey: ['notes', page, search],
  queryFn: () => fetchNotes(page, perPage, search),
});

  return (
    <NotesClient
      page={page}
      perPage={perPage}
      search={search}
      dehydratedState={dehydrate(queryClient)}
    />
  );
}
