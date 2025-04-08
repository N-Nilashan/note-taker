import { Github, Mail } from 'lucide-react'
import React from 'react'
import { Button } from '../../components/ui/button'

const Footer = () => {
  return (
    <div className='text-center text-[#2D2D3A] dark:text-[#F8F5F2] font-medium bg-[#F8F5F2] dark:bg-[#2D2D3A] border-t border-[#E5E0D9] dark:border-[#3D3D4A] h-[210px]'>
      <div className='p-[8px]'>
        <h2 className='mt-[30px] text-2xl'>Nimesh Nilashan</h2>
        <p className="mt-4 text-sm text-[#2D2D3A]/70 dark:text-[#F8F5F2]/70">&copy; 2025 All rights reserved.</p>
        <div className='flex mt-4 gap-5 items-center justify-center'>
          <a
            className='p-2 rounded-full hover:bg-[#E5E0D9] dark:hover:bg-[#3D3D4A] transition-colors'
            href="https://github.com/"
          >
            <Github className="text-[#2D2D3A] dark:text-[#F8F5F2]" />
          </a>
          <a
            className='p-2 rounded-full hover:bg-[#E5E0D9] dark:hover:bg-[#3D3D4A] transition-colors'
            href="mailto:informal.nimesh@gmail.com"
          >
            <Mail className="text-[#2D2D3A] dark:text-[#F8F5F2]" />
          </a>
        </div>
        <span>
          <h2 className='mt-4'>
            Portfolio:
            <a
              className='ml-2 text-[#2D2D3A] dark:text-[#F8F5F2] hover:underline transition-colors'
              href="https://nimesh-nilashan.netlify.app/"
            >
              Click here!
            </a>
          </h2>
        </span>
      </div>
    </div>
  )
}

export default Footer
