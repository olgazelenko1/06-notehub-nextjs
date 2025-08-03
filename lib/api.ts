import axios from 'axios';
import { type Note, type NewNote, type NoteResponse } from '../types/note';

const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL = 'https://notehub-public.goit.study/api';
console.log('API_TOKEN:', API_TOKEN);
console.log('BASE_URL:', BASE_URL);

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});
export async function fetchNotes(
  page: number = 1,
  perPage: number = 12,
  search: string = '',
): Promise<NoteResponse> {
  try {
    const params: Record<string, string | number> = {
      page,
      perPage,
    };

    if (search.trim()) {
      params.search = search.trim();
    }

    const { data } = await instance.get<NoteResponse>('/notes', { params });
    console.log('fetchNotes data:', data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Axios error:',
        error.response?.status,
        error.response?.data,
      );
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const { data } = await instance.post<Note>('/notes', newNote);
  return data;
};

export async function deleteNote(noteId: string): Promise<Note> {
  const { data } = await instance.delete<Note>(`/notes/${noteId}`);
  return data;
}
export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await instance.get(`/notes/${id}`);
  return data;
}
