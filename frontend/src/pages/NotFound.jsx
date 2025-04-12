import React from 'react'

function NotFound() {
  return (
    <div className='rounded-md flex justify-center items-center h-screen'>
     <div className='bg-red-300 md:w-[500px]' >
        <h1 className='text-6xl font-bold text-center'>404</h1>
        <h2 className='text-2xl font-semibold mt-4 text-center'>OOPS! PAGE NOT FOUND</h2>
        <p className='mt-4 text-gray-400 text-center'>The page youre looking for does not exist or has been moved</p>
        <link to ='/' className='bg-blue text-white  hover:bg-blue-700'>
        {/* Go Back Home */}
        </link>
     </div>
    </div>
  )
}

export default NotFound
