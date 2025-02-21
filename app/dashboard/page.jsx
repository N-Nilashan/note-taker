'use client'
import { useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import Navbar from '../_components/Navbar';
import { Pencil, Pin, Plus, Search } from 'lucide-react';
import TextCard from '../_components/TextCard';
import CreateNote from '../_components/CreateNote';

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  const deleteNote = (indexToDelete) => {
    setNotes(notes.filter((_, index) => index !== indexToDelete));
  };

  const addNote = (newNote) => {
    setNotes([...notes, {id: Date.now(), ...newNote}]);
  };

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
            key={index}
            title={note.title}
            content={note.content}
            onDelete={() => deleteNote(index)}
            onEdit={() => editNote(note, index)}
          />
        ))}
      </div>
    </>
  );
};

export default page;
