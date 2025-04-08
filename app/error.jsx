'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex justify-center items-center min-h-screen bg-backgroundLight dark:bg-bgDark text-foreground">
      <div className="bg-white dark:bg-bgDark p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Something went wrong!
        </h2>
        <button
          onClick={() => reset()}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-foreground transition duration-300 ease-in-out"
        >
          Try refreshing the page or try again.
        </button>
      </div>
    </div>
  )
}
