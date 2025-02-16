import { Github, Mail } from 'lucide-react'
import React from 'react'
import { Button } from '../../components/ui/button'

const Footer = () => {
  return (

      <div className=' text-center mt-10 text-secondary font-bold bg-primary dark:bg-emerald-900/20 h-[210px]'>
        <div className='p-[8px]'>
          <h2 className='mt-[30px] text-2xl'>Nimesh Nilashan</h2>
          <p className="mt-4 text-sm ">&copy; 2025 All rights reserved.</p>
          <div className='flex mt-4 gap-5 items-center justify-center'>
            <a className='hover:bg-slate-500' href="https://github.com/"><Github/></a>
            <a className='hover:bg-slate-500' href="mailto:informal.nimesh@gmail.com" >
            <Mail/>
            </a>
          </div>
          <span >
            <h2 className='mt-4'  >Portfolio : <a className='hover:bg-slate-500' href="https://nimesh-nilashan.netlify.app/">Click here!</a> </h2>
          </span>
        </div>
      </div>

  )
}

export default Footer
