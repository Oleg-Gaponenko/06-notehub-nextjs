'use client';
import css from './NoteModal.module.css';
import NoteForm from '../NoteForm/NoteForm';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NoteModal({ isOpen, onClose }: NoteModalProps) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.getElementById('modal');
    setModalRoot(root);

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (isOpen === false || !modalRoot) return null;

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={event => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={css.modal}>
        <NoteForm onCancel={onClose} />
      </div>
    </div>,
    modalRoot
  );
}
