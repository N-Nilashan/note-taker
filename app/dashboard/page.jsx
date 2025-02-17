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

  const addNote = (newNote)=>{
    setNotes([...notes,newNote]); // Add new note to the list
  }


  return (
   <>
      <div>
      <Navbar
        customButton={
          <UserButton showName />
        }
      />
      </div>
      <div className='flex  items-center justify-center gap-6 p-5'>
        <div>
          <button  className="bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-900 dark:bg-primary text-secondary font-myfont font-bold text-lg text-[1.5rem] gap-2 flex items-center rounded-3xl p-4"
              onClick={() => setIsOpen(true)}>
              <Pencil/>Add Note
            </button>
            <CreateNote isOpen={isOpen} onClose={() => setIsOpen(false)} addNote={addNote}/>
        </div>

          <button className='bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-900 dark:bg-primary text-secondary font-myfont font-bold text-lg text-[1.5rem] gap-2 flex items-center rounded-3xl p-4'>
            <Pin/>Pinned Notes
          </button>
          <button className='bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-900 dark:bg-primary text-secondary font-myfont font-bold text-lg text-[1.5rem] gap-2 flex items-center rounded-3xl p-4'>
            <Search/>Search Notes
          </button>
      </div>
      <div className='flex items-center justify-center gap-6 '>
        <button className='rounded-3xl p-3 w-[100px] bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-900 dark:bg-primary text-secondary font-semibold'>
          All
        </button>
        <button className='rounded-3xl p-3 w-[100px] bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-900 dark:bg-primary text-secondary font-semibold'>
          Work
        </button>
        <button className='rounded-3xl p-3 w-[100px] bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-900 dark:bg-primary text-secondary font-semibold'>
          Study
        </button>
        <button className='rounded-3xl p-3 flex items-center justify-center w-[180px] bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-900 dark:bg-primary text-secondary font-semibold'>
         <Plus/> Create Category
        </button>
      </div>
      <div className='p-10  grid grid-cols-3'>
        {notes.map((note,index)=>(
          <TextCard key={index} title={note.title} content={note.content} />
        ))}
      </div>
    </>
  )
}

export default page
