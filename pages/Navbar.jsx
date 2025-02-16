import DarkModeToggle from '@/components/DarkModeToggle'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-primary w-full h-[70px]'>
      <div className='flex  justify-between font-bold text-[20px]'>
        <span className='p-4 flex'>
          <Image src='/logo3.svg'
          width={80}
          height={100}
          alt='logo'
          className='-mt-[25px] '
        />
        <h2 className='text-secondary ml-[2px]  '>AI-Notes</h2>
        </span>

        <span className='flex mt-[8px]'>
          <DarkModeToggle />
          <Button className= 'mt-1 font-bold text-[20px] bg-primary hover:bg-foreground  px-7'>Login</Button>
        </span>
      </div>
    </div>
  )
}

export default Navbar
