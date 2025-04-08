'use client'
import DarkModeToggle from '@/app/_components/DarkModeToggle'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { NotebookPen } from 'lucide-react'

const Navbar = ({ customButton }) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/sign-up')
    setTimeout(() => {
      window.location.reload(); // Reload after navigation
    }, 100); // Small delay to ensure navigation occurs first
  };

  return (
    <div className='bg-gradient-to-r from-emerald-700 to-emerald-600 dark:from-emerald-800 dark:to-emerald-700 w-full shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <div className='flex-shrink-0 flex items-center'>
              <div className='ml-3 flex items-center'>
                <NotebookPen className='h-6 w-6 text-white dark:text-emerald-200 mr-2' />
                <h2 className='text-white dark:text-emerald-100 text-xl font-bold tracking-tight'>
                  AI-Notes
                </h2>
              </div>
            </div>
          </div>

          <div className='flex items-center space-x-4'>
            <div className='flex items-center'>
              <DarkModeToggle />
            </div>
            {customButton ? (
              <div className='ml-4'>
                {customButton}
              </div>
            ) : (
              <Button
                onClick={handleRedirect}
                className='ml-4 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30'
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
