import PenModel from '@/components/PenModel'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div >
      <div className='flex items-center justify-center'>
        <div>
          <PenModel/>
        </div>
      </div>
      <div className='text-primary dark:text-secondary font-bold text-center'>
        <h1 className='text-[70px]'>Take Smarter Notes with AI</h1>
        <h2 className='text-[30px] text-foreground'>Write, Organise, and Summarize notes instantly with AI assistance</h2>
      </div>
      <div className='flex items-center justify-center gap-6 mt-7'>
        <Button className='px-6 py-6 dark:bg-dbtn bg-primary rounded-full text-bold text-secondary hover:bg-foreground dark:hover:bg-primary'>Get Started</Button>
        <Button className='px-6 py-6 dark:bg-dbtn bg-primary rounded-full text-bold text-secondary hover:bg-foreground dark:hover:bg-primary'>See Features</Button>
      </div>
      <div>
        <h1 className='text-[70px] text-center text-slate-500'>Demo Pic</h1>
      </div>
      <div>
        <h2 className='text-primary font-bold dark:text-secondary text-[40px] text-center'>Key Features of AI-Notes App</h2>
      </div>
    </div>
  )
}

export default Hero
