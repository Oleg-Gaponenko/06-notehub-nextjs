import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

export default async function NotesPage() {
  const notesData = await fetchNotes({});
  return <NotesClient initialData={notesData} />;
}
