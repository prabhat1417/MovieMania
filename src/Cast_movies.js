import React, { useState, useEffect } from 'react';
import axios from './axios';
import "./Row.css";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.cast);
    }
    fetchData();
  }, [fetchUrl]);

  const openDescription = (type,id) => {
    let newPath;
    if (title === "Movies") {
      newPath = `/description/${id}`;
    }
    else {
      newPath = `/tv_description/${id}`;
    }
  
    // Refresh the page and then navigate to the new path
    window.location.href = newPath;
  };
  

  return (
    <div className="row">
      <h2 className='title'>{title}</h2>
      <div className='row_posters'>
        {movies && movies.map((movie) => (
          (isLargeRow && movie.poster_path) ||
          (!isLargeRow && movie.backdrop_path)) && (
            <LazyLoadImage
              className="row_poster"
              key={movie.id}
              src={`${base_url}${movie.poster_path}`}
              alt={movie.name}
              effect="blur"
              onClick={() => openDescription(movie.media_type,movie.id)}
            />
          )
        )}
      </div>
    </div>
  );
}

export default Row;
