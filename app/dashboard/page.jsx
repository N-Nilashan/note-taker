
import { UserButton } from '@clerk/nextjs';
import Navbar from '../_components/Navbar';
import { Pencil, Pin, Plus, Search } from 'lucide-react';
import TextCard from '../_components/TextCard';

const page = () => {
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
          <button className='bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-900 dark:bg-primary text-secondary font-myfont font-bold text-lg text-[1.5rem] gap-2 flex items-center rounded-3xl p-4'>
            <Pencil/>Create Note
          </button>
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
        <TextCard/>
        <TextCard/>
        <TextCard/>
      </div>
    </>
  )
}

export default page
