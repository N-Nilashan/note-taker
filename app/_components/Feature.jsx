'use client'
import { NotebookPen, CheckCircle, Star, Folder, Search, Lock, Edit } from 'lucide-react'
import React from 'react'
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

const Feature = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/sign-up')
    setTimeout(() => {
      window.location.reload(); // Reload after navigation
    }, 100); // Small delay to ensure navigation occurs first
  };
  // Define iconComponents inside the component
  const iconComponents = {
    'check-circle': CheckCircle,
    'star': Star,
    'folder': Folder,
    'search': Search,
    'lock': Lock,
    'edit': Edit
  };

  const featureList = [
    {
      id: '6',
      title: 'Write and Save Notes',
      icon: 'edit',
      des: 'Effortlessly jot down and store your thoughts, ideas, or important information in a secure, easy-to-use platform for future reference.',
    },

    {
      id: '2',
      title: 'AI Summarization',
      icon: 'star',
      des: 'Automatically generate concise summaries of your notes with the power of AI, saving time and enhancing the efficiency of your study sessions.',
    },
    {
      id: '3',
      title: 'Categories',
      icon: 'folder',
      des: 'Organize your notes into easy-to-navigate categories, making it simpler to manage and locate specific information when needed.',
    },
    {
      id: '4',
      title: 'Find Notes Easily',
      icon: 'search',
      des: 'Quickly search through your notes with intuitive search functionality, ensuring that you can access important content in seconds.',
    },
    {
      id: '5',
      title: 'Secure and Private',
      icon: 'lock',
      des: 'Rest assured knowing your notes are encrypted and protected, ensuring complete privacy and security for your personal information.',
    },
    {
      id: '1',
      title: 'Dark Mode',
      icon: 'check-circle',
      des: 'Switch to a visually comfortable dark theme to reduce eye strain and improve readability in low light environments.',
    },
  ];

  return (
    <>
      <div>
        <h2 className='text-primary font-bold dark:text-secondary text-[40px] text-center'>Key Features of AI-Notes App</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {featureList.map((feature) => {
          const IconComponent = iconComponents[feature.icon];
          return (
            <div
              key={feature.id}
              className="block p-6 bg-white border border-gray-200 rounded-3xl shadow-sm hover:bg-gray-100 dark:bg-bgDark dark:border-emerald-900/20 dark:hover:bg-emerald-900/20"
            >
              <h5 className="mb-2 flex items-center gap-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {IconComponent && <IconComponent />}
                {feature.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {feature.des}
              </p>
            </div>
          );
        })}
      </div>
      <div  className='text-primary dark:text-secondary font-bold text-center'>
       <h1 className='text-[40px]'>Start Using AI Notes Today</h1>
       <Link href="/sign-up">
       <Button onClick={handleRedirect} className='mt-7 px-6 py-6 dark:bg-dbtn bg-primary rounded-full font-bold text-white hover:bg-secondary dark:hover:bg-secondary' >Get Started</Button>
       </Link>
      </div>
    </>
  )
}

export default Feature
