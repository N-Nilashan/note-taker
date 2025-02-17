'use client'
import DarkModeToggle from '@/app/_components/DarkModeToggle'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Navbar = ({ customButton }) => {

  const router = useRouter();

  const handleRedirect = () => {
    router.push('/sign-up')
    setTimeout(() => {
      window.location.reload(); // Reload after navigation
    }, 100); // Small delay to ensure navigation occurs first
  };

  return (
    <div className='bg-primary w-full h-[70px]'>
      <div className='flex justify-between font-bold text-[20px]'>
        <span className='p-4 flex'>
          <Image src='/logo3.svg'
            width={80}
            height={100}
            alt='logo'
            className='-mt-[25px]'
          />
          <h2 className='text-secondary ml-[2px]'>AI-Notes</h2>
        </span>

        <span className='flex items-center -mt-[25px] px-7'>
          <DarkModeToggle />
          {customButton ? customButton : (

              <Button  onClick={handleRedirect}  className='mt-1 font-bold text-[20px] bg-primary hover:bg-foreground px-7'>
                Get Started
              </Button>


          )}
        </span>
      </div>
    </div>
  )
}


export default Navbar;
