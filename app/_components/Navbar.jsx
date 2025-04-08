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
    <div className='bg-[#F8F5F2] dark:bg-[#2D2D3A] w-full border-b border-[#E5E0D9] dark:border-[#3D3D4A] shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <div className='flex-shrink-0 flex items-center'>
              <div className='ml-3 flex items-center'>
                <NotebookPen className='h-6 w-6 text-[#2D2D3A] dark:text-[#F8F5F2] mr-2' />
                <h2 className='text-[#2D2D3A] dark:text-[#F8F5F2] text-xl font-bold tracking-tight'>
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
                className='ml-4 px-5 py-2 rounded-lg bg-[#2D2D3A] dark:bg-[#F8F5F2] hover:bg-[#2D2D3A]/90 dark:hover:bg-[#F8F5F2]/90 text-[#F8F5F2] dark:text-[#2D2D3A] font-medium transition-colors'
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
