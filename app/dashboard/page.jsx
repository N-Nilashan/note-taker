'use client'
import { useState, useEffect } from 'react';
import { UserButton, useAuth } from '@clerk/nextjs';
import Navbar from '@/app/_components/Navbar';
import CreateNote from '@/app/_components/CreateNote';
import TextCard from '@/app/_components/TextCard';
import { Pin, Search, Pencil } from 'lucide-react';

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getToken, isLoaded, isSignedIn } = useAuth();

  // Fetch notes when component mounts
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchNotes();
    }
  }, [isLoaded, isSignedIn]);

  const fetchNotes = async () => {
    try {
      const token = await getToken();
      console.log("Auth token:", token ? "Token exists" : "No token");

      const response = await fetch('/api/notes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error('Failed to fetch notes');
      }

      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (noteData) => {
    try {
      const token = await getToken();
      console.log("Auth token for addNote:", token ? "Token exists" : "No token");

      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(noteData),
      });

      console.log("Add note response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error('Failed to create note');
      }

      const newNote = await response.json();
      setNotes(prevNotes => [newNote, ...prevNotes]);
      return true;
    } catch (error) {
      console.error('Error adding note:', error);
      return false;
    }
  };

  const updateNote = async (id, noteData) => {
    try {
      const token = await getToken();
      const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) throw new Error('Failed to update note');
      const updatedNote = await response.json();
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note._id === id ? updatedNote : note
        )
      );
      return true;
    } catch (error) {
      console.error('Error updating note:', error);
      return false;
    }
  };

  const deleteNote = async (id) => {
    try {
      const token = await getToken();
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete note');
      setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEdit = (note) => {
    setCurrentNote(note);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setCurrentNote(null);
  };

  return (
    <>
      <div>
        <Navbar customButton={<UserButton showName />} />
      </div>

      <div className='flex items-center justify-center gap-6 p-5'>
        <div>
          <button
            className="bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-800/60 dark:bg-emerald-800/40 text-white font-myfont font-bold text-lg text-[1.5rem] gap-2 flex items-center rounded-3xl p-4"
            onClick={() => setIsOpen(true)}
          >
            <Pencil />Add Note
          </button>
          <CreateNote
            isOpen={isOpen}
            onClose={handleCloseModal}
            addNote={addNote}
            currentNote={currentNote}
            updateNote={updateNote}
          />
        </div>

        <button className='bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-800/60 dark:bg-emerald-800/40 text-white font-myfont font-bold text-lg text-[1.5rem] gap-2 flex items-center rounded-3xl p-4'>
          <Pin />Pinned Notes
        </button>
        <button className='bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-800/60 dark:bg-emerald-800/40 text-white font-myfont font-bold text-lg text-[1.5rem] gap-2 flex items-center rounded-3xl p-4'>
          <Search />Search Notes
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center mt-10 px-4">
          {notes.map((note) => (
            <TextCard
              key={note._id}
              title={note.title}
              content={note.content}
              date={note.createdAt}
              onDelete={() => deleteNote(note._id)}
              onEdit={() => handleEdit(note)}
            />
          ))}
        </div>
      )}
    </>
  );
}
