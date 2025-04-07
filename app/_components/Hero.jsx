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
    <section className="relative overflow-hidden py-12 md:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className='flex flex-col items-center justify-center'>
          <div className='py-9 w-[500px] h-[500px]'>
            <PenModel />
          </div>
        </div>
        <div className='text-center space-y-8'>
          <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-primary dark:text-[#388E3C]'>
            Take Smarter Notes with AI
          </h1>
          <h2 className='text-xl md:text-2xl lg:text-3xl text-foreground dark:text-[#388E3C] max-w-3xl mx-auto'>
            Write, Organise, and Summarize notes instantly with AI assistance
          </h2>
        </div>
        <div className='flex items-center justify-center gap-6 mt-12'>
          <Button
            onClick={handleRedirect}
            size="lg"
            className='text-lg px-8 py-6 dark:bg-dbtn bg-primary rounded-full font-semibold text-secondary hover:bg-foreground dark:hover:bg-primary'
          >
            Get Started
          </Button>
          <Button
            size="lg"
            className='text-lg px-8 py-6 dark:bg-dbtn bg-primary rounded-full font-semibold text-secondary hover:bg-foreground dark:hover:bg-primary'
          >
            See Features
          </Button>
        </div>
        <div className='mt-16 flex items-center justify-center'>
          <Image
            src='/demo.png'
            alt='demo picture'
            width={1000}
            height={800}
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
