import React from 'react'

const TextCard = () => {
  return (
    <>

        <div class="relative dark:bg-black   w-96 bg-white shadow-sm border border-emerald-400 rounded-3xl p-3 pb-6">


            <div class=" justify-start mb-3 px-2">
              <h5 class="text-primary dark:text-secondary text-2xl font-semibold">
                Title
              </h5>
              <p className='text-primary mt-3 dark:text-secondary'>Work</p>
            </div>
          <div class="p-3 mt-5 border-t border-emerald-400 text-center max-h-52 overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-xl [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:rounded-xl [&::-webkit-scrollbar-track]:bg-slate-100">
            <p class="block text-emerald-900 dark:text-secondary leading-normal font-light mb-4 max-w-lg">
              Because it&apos;s about motivating the doers. Because I&apos;m here to follow my dreams and inspire others. Here is some additional text to test the scrolling feature. Imagine this is a long article that you can scroll through.
            </p> <br />
            <p class="block dark:text-secondary text-emerald-900 leading-normal font-light mb-4 max-w-lg">
              Still more content to keep the scroll active. Let's make sure the scrollbar styling is correct. Apple's scrollbar style is subtle, with a thin, sleek design. Scroll down for more! Keep adding more content to ensure the scroll is working. The card's content should now be scrollable. Test it out!
              More text to fill the space, as we continue to check how scroll behaves.
            </p>
          </div>
          <div className='flex mt-3 items-center justify-evenly font-semibold'>
            <button className='rounded-3xl w-[70px] p-2 text-secondary bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-900 dark:bg-primary'>
              Edit
            </button>
            <button className='rounded-3xl w-[120px] p-2 text-secondary bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-900 dark:bg-primary'>
              Summarize
            </button>
            <button className='rounded-3xl w-[80px] p-2 text-secondary bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-900 dark:bg-primary'>
              Delete
            </button>
          </div>
        </div>

    </>
  )
}

export default TextCard
