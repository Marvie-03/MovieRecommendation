import React from 'react'
import SavedShows from '../components/SavedShows'

const Account = () => {
  return (
    <>
    <div className='w-full text-white'>
    <img 
            className=' w-full h-[400px] object-cover'
            src="https://assets.nflxext.com/ffe/siteui/vlv3/5eab1b22-c5ea-48b0-8ef4-862b3fa6df2c/e630dd10-1a25-4ce7-84fc-81fa5897e400/NG-en-20230724-popsignuptwoweeks-perspective_alpha_website_medium.jpg" 
            alt="/" />
            <div className='bg-black/60 fixed top-0 left-0 w-full h-[550px]'></div>
              <div className='absolute top-[20%] p-4 md:p-8'>
                <h1 className='text-3xl md:text-5xl font-bold'>My Shows</h1>
              </div>
            
    </div>
    <SavedShows />
    </>
  )
}

export default Account