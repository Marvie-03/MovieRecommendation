import React, { useState } from 'react'
import {FaHeart, FaRegHeart } from 'react-icons/fa'
import {UserAuth} from '../context/AuthContext'
import { db } from '../firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import {AiOutlineClose} from "react-icons/ai"
import MovieInfo from './MovieInfo'

const Movie = ({item}) => {
    const [like, setLike] = useState(false)
    const [saved, setSaved] = useState(false)
    const {user} = UserAuth()
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
    setShowModal(!showModal);
   };

   const truncateString = (str, num) =>{
    if(str?.length > num){
        return str.slice(0 ,num) + '...'
    }
    else{
       return str 
    }
}
    const movieID = doc(db, 'users', `${user?.email}`)

    const saveShow = async() =>{
      if (user?.email){
        setLike(!like)
        setSaved(true)
        await updateDoc(movieID, {
          savedShows : arrayUnion({
            id: item.id,
            title: item.title,
            img: item.backdrop_path
          })
        })
      }
      else{
        alert('You have to login to save a show')
      }
    }

  return (
  
    <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2' data-testid="movie-card" onClick={toggleModal}>
    <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} data-testid="movie-poster"/>
    <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 transition-all text-white'>
        <p className='white-space-normal text-xs md:text-sm font-bold flex flex-col justify-center items-center h-full text-center'
        data-testid="movie-title">
        {item?.title}
        <p className='text-white h-[50px]' data-testid="movie-release-date">{item?.release_date}</p>
        </p>
        <p 
        onClick={saveShow}
        >
            {like ? <FaHeart className='absolute top-4 left-4 text-gray-300' /> : <FaRegHeart className='absolute top-4 left-4 text-gray-300' />}
        </p>
        {showModal && (
            <div className="modal fixed inset-0 flex items-center justify-center z-50 mx-auto lg:w-full md:w-full sm:w-100 bg-black lg:bg-opacity-60 sm:bg-opacity-100">
              <div className="modal-content bg-black w-1/2 p-4">
                <span className="close text-gray-200 cursor-pointer" onClick={toggleModal}>
                  <AiOutlineClose />
                </span> 
                <img className='w-full h-auto block' 
                src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} 
                alt={item?.title} data-testid="movie-poster"/>               
                <h2 className="text-2xl font-bold" data-testid="movie-title">{item?.title}</h2>
                <p 
                data-testid="movie-release-date">
                Release Date: {item?.release_date}</p>
                <p data-testid="movie-runtime"><span className='text-bold text-2xl'>Runtime:</span> <MovieInfo movieid={item?.id}/></p>
                <div className='w-1/2'>
                <p className='whitespace-normal' data-testid="movie-overview">Overview: {truncateString(item?.overview, 101)}</p>
                </div>
               
                {/* Add more movie details here */}
              </div>
            </div>
          )}
    </div>
   
    </div>
    
    
  )
}

export default Movie