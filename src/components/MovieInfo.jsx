import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MovieInfo({ movieid }) {
  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = 'e1e5d70213c258f1fd807ec8a0003e1e';

  const timeConversion =(length)=>{
        let hour = (Math.floor(length/60))
        let minutes = length % 60
      return `${hour}h ${minutes}m`
  }

  useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieid}?api_key=${API_KEY}`;

    // Make a GET request to the API
    axios.get(apiUrl)
      .then(response => {
        // Handle the response data here by updating the state
        setMovieData(response.data);
        setLoading(false); // Set loading to false when data is received
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        setError(error);
        setLoading(false); // Set loading to false when an error occurs
      });
  }, [movieid]); // Include movieid in the dependency array to fetch data when it changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
const converted = timeConversion(movieData.runtime)
  return (
    <div>
            {/* <pre>{JSON.stringify(movieData.runtime, null, 2)}</pre> */}
      {converted}
    </div>
  );
}

export default MovieInfo;
