'use client';

import { useState } from 'react';
import css from './Notes.module.css';
import SearchBox from '../../components/SearchBox/SearchBox';
import NoteList from '../../components//NoteList/NoteList';
import Pagination from '../../components/Pagination/Pagination';
import { useDebounce } from 'use-debounce';
import NoteModal from '../../components/NoteModal/NoteModal';
import { fetchNotes, type NoteHubResponse } from '../../lib/api';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import AbsentDataMessage from '../../components/AbsentDataMessage/AbsentDataMessage';

interface NotesClientProps {
  initialData: NoteHubResponse;
}

export default function NotesClient({ initialData }: NotesClientProps) {
  const [searchNote, setSearchNote] = useState('');
  const [debouncedSearch] = useDebounce(searchNote, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notesPerPage = 12;

  const { data, isLoading, isError, error } = useQuery<NoteHubResponse, Error>({
    queryKey: ['notes', debouncedSearch, currentPage, notesPerPage],
    queryFn: () =>
      fetchNotes({
        search: debouncedSearch,
        page: currentPage,
        perPage: notesPerPage,
      }),
    placeholderData: previousData => previousData,
    initialData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchNote} onChange={setSearchNote} />
        {data?.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={data.totalPages}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && error && <ErrorMessage message={error.message} />}
      {data && data?.notes.length > 0 && <NoteList notes={data.notes} />}
      {!isLoading && !isError && data && data?.notes.length === 0 && (
        <AbsentDataMessage />
      )}

      {isModalOpen && (
        <NoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
