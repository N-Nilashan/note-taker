'use client'
import { useEffect, useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import Navbar from '../_components/Navbar';
import { Pencil, Pin, Plus, Search } from 'lucide-react';
import TextCard from '../_components/TextCard';
import CreateNote from '../_components/CreateNote';

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);



  const addNote = async (newNote) => {
    try {
      const response = await fetch('/api/notes/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote)
      });

      const data = await response.json();
      if (data.success) {
        setNotes([...notes, data.note]);
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };


  //fetching notes to DB
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/notes/get');
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  // New function to handle editing a note
  const editNote = (note, index) => {
    setCurrentNote({...note, index});
    setIsOpen(true);
  };

  // New function to handle updating a note
  const updateNote = (updatedNote, index) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = {...updatedNotes[index], ...updatedNote};
    setNotes(updatedNotes);
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch('/api/notes/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (response.ok) {
        setNotes(notes.filter(note => note._id !== id));
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Function to handle closing the modal and resetting currentNote
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
            className="bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-900 dark:bg-primary text-secondary font-myfont font-bold text-lg text-[1.5rem] gap-2 flex items-center rounded-3xl p-4"
            onClick={() => setIsOpen(true)}
          >
            <Pencil/>Add Note
          </button>
          <CreateNote
            isOpen={isOpen}
            onClose={handleCloseModal}
            addNote={addNote}
            currentNote={currentNote}
            updateNote={updateNote}
          />
        </div>

        {/* Other buttons */}
        <button className='bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-900 dark:bg-primary text-secondary font-myfont font-bold text-lg text-[1.5rem] gap-2 flex items-center rounded-3xl p-4'>
          <Pin/>Pinned Notes
        </button>
        <button className='bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-900 dark:bg-primary text-secondary font-myfont font-bold text-lg text-[1.5rem] gap-2 flex items-center rounded-3xl p-4'>
          <Search/>Search Notes
        </button>
      </div>

      {/* Category buttons */}
      <div className='flex items-center justify-center gap-6'>
        {/* Your existing category buttons */}
      </div>

      {/* Notes grid */}
      <div className='p-10 grid grid-cols-3'>
        {notes.map((note, index) => (
          <TextCard
            key={note._id}
            title={note.title}
            content={note.content}
            onDelete={() => deleteNote(note._id)}
            onEdit={() => editNote(note)}
          />

        ))}
      </div>
    </>
  );
};

export default page;
