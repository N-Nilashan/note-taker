'use client'
import PenModel from '@/app/_components/PenModel'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'

const Hero = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/sign-up')
    setTimeout(() => {
      window.location.reload(); // Reload after navigation
    }, 100); // Small delay to ensure navigation occurs first
  };

  return (
    <div>
      <div className='flex items-center justify-center'>
        <div className='py-9 w-[500px] h-[500px]'>
          <PenModel/>
        </div>
      </div>
      <div className='text-primary dark:text-secondary font-bold text-center'>
        <h1 className=' text-[70px]'>Take Smarter Notes with AI</h1>
        <h2 className='text-[30px] text-foreground'>Write, Organise, and Summarize notes instantly with AI assistance</h2>
      </div>
      <div className='flex items-center justify-center gap-6 mt-7'>

        <Button  onClick={handleRedirect} className='px-6 py-6 dark:bg-dbtn bg-primary rounded-full text-bold text-secondary hover:bg-foreground dark:hover:bg-primary'>Get Started</Button>

        <Button className='px-6 py-6 dark:bg-dbtn bg-primary rounded-full text-bold text-secondary hover:bg-foreground dark:hover:bg-primary'>See Features</Button>

      </div>
      <div className='p-6 flex items-center justify-center'>
        <Image
          src='/demo.png'
          alt='demo picture'
          width={1000}
          height={800}

        />
      </div>

    </div>
  )
}

export default Hero
