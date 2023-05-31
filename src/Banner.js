import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Banner.css';
import axios from "./axios";
import requests from "./Requests";
import MovieTrailer from "./MovieTrailer";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (movie.id) {
      location.pathname === '/'
        ? navigate(`/description/${movie.id}`)
        : navigate(`/tv_description/${movie.id}`);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        location.pathname === '/' ? requests.fetchPopular : requests.fetchNetflixOriginals
      );
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      setIsLoading(false);
    }

    fetchData();
  }, [location.pathname]);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string;
  }

  const bannerStyle = {
    backgroundImage: movie?.backdrop_path
      ? `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`
      : '',
    backgroundPosition: "top center",
    backgroundSize: "cover",
    height: "70vh",
  };

  if (isLoading) {
    return null; // You can show a loading spinner or skeleton component here
  }

  const handleBannerClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className='banner' style={bannerStyle}>
      <div className='banner_content' >
        <h1 className='banner_title'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className='banner_buttons'>
          <button onClick={handleClick} className='banner_button'>
            View
          </button>
          <button onClick={handleBannerClick} className='banner_button'>Play</button>
        </div>
        <h1 className='banner_description'>
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className='banner--fadeBottom' />
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <MovieTrailer movieId={movie.id} />
            <button className='close' onClick={handleCloseModal}>❌</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Banner;
