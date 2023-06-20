import React, { useState, useEffect } from 'react';
import Nav from "./Nav";
import Cast from "./Cast";
import requests from "./Requests";
import Row from "./Row";
import Preloader from "./Preloader";
import './Description.css';
import { useParams } from 'react-router-dom';
import axios from "./axios";
import imdb from './images/imdb.png';
import MovieTrailer from "./MovieTrailer";
import { API_KEY } from './Requests';

function Description() {
  const { movieId } = useParams();
  const [movie, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    async function fetchMovieData() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
        setMovieData(response.data);
      } catch (error) {
        console.error('Error fetching movie data:', error.message);
      }
    }

    fetchMovieData();
  }, [movieId]);

  if (!movie) {
    return <div><Preloader /></div>;
  }

  const handlePlayClick = () => {
    setIsModalOpen(true);
  };

  const bannerStyle = {
    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
    backgroundPosition: "left center",
    backgroundSize: "cover",
    height: "100vh",
  };

  return (
    <div>
      {isLoading ? (
        <Preloader />
      ) : (
        <div>
          <Nav />
          <div className="description">
            <header className='description' style={bannerStyle}>
              <div className='movie_content'>
                <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className='rat'>
                  <img src={imdb} alt="Example" />
                  <p className='vote'>{movie.vote_average.toFixed(2)}<span className='line'>|</span>{movie.release_date.substr(0, 4)}<span className='line'>|</span>{Math.floor(movie.runtime / 60)} h {movie.runtime % 60 > 0 ? movie.runtime % 60 + "m" : ""}</p>
                </div>
                <p>
                  {movie.genres.map((genre) => (
                    <span className='genres' key={genre.id}>{genre.name}</span>
                  ))}
                </p>
                <h1 className='movie_description'>
                  {movie?.overview}
                </h1>
                <button className='btn' onClick={handlePlayClick}>
                    Play
                </button>
              </div>
              <div className='banner--fadeBottom' />
            </header>
          </div>
          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal">
                <MovieTrailer movieId={movieId} />
                <button className='close' onClick={() => setIsModalOpen(false)}>❌</button>
              </div>
            </div>
          )}
          <Cast title="CAST" fetchUrl={`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`} />
          <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
        </div>
      )}
    </div>
  );
}

export default Description;
