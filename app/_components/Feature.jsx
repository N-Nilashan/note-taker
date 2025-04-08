'use client'
import { NotebookPen, CheckCircle, Star, Folder, Search, Lock, Edit, CheckCircle2 } from 'lucide-react'
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

  const features = [
    {
      title: "Write and Save Notes",
      description: "Effortlessly jot down and store your thoughts, ideas, or important information in a secure, easy-to-use platform for future reference."
    },
    {
      title: "AI Summarization",
      description: "Automatically generate concise summaries of your notes with the power of AI, saving time and enhancing the efficiency of your study sessions."
    },
    {
      title: "Categories",
      description: "Organize your notes into easy-to-navigate categories, making it simpler to manage and locate specific information when needed."
    },
    {
      title: "Find Notes Easily",
      description: "Quickly search through your notes with intuitive search functionality, ensuring that you can access important content in seconds."
    },
    {
      title: "Secure and Private",
      description: "Rest assured knowing your notes are encrypted and protected, ensuring complete privacy and security for your personal information."
    },
    {
      title: "Dark Mode",
      description: "Switch to a visually comfortable dark theme to reduce eye strain and improve readability in low light environments."
    }
  ]

  return (
    <div id="features" className="py-24 bg-[#F8F5F2] dark:bg-[#2D2D3A]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#2D2D3A] dark:text-[#F8F5F2] mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-[#2D2D3A]/70 dark:text-[#F8F5F2]/70 max-w-2xl mx-auto">
            Experience the future of note-taking with our cutting-edge features designed to enhance your productivity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-white dark:bg-[#3D3D4A] border border-[#E5E0D9] dark:border-[#4D4D5A] hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#2D2D3A] dark:text-[#F8F5F2] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-[#2D2D3A] dark:text-[#F8F5F2] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#2D2D3A]/70 dark:text-[#F8F5F2]/70">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/dashboard">
            <Button
              className="bg-[#2D2D3A] dark:bg-[#F8F5F2] text-[#F8F5F2] dark:text-[#2D2D3A] hover:bg-[#3D3D4A] dark:hover:bg-[#E5E0D9] transition-colors px-6 py-6 text-lg font-bold rounded-full"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Feature
