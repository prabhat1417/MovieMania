import React, { useEffect, useRef } from 'react';
import './MovieTrailer.css';
import { API_KEY } from './Requests';

const MovieTrailer = ({ movieId }) => {
  const playerInstanceRef = useRef(null);

  const loadYouTubePlayer = (videoId) => {
    playerInstanceRef.current = new window.YT.Player('player', {
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
      },
      events: {
        onStateChange: handlePlayerStateChange,
      },
    });
  };

  const getMovieTrailer = () => {
    const apiUrl = window.location.pathname.startsWith('/tv')
      ? `https://api.themoviedb.org/3/tv/${movieId}/videos?api_key=${API_KEY}`
      : `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`;
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const trailers = data.results.filter((video) => video.type === 'Trailer');
        if (trailers.length > 0) {
          const trailerKey = trailers[0].key;
          const trailerUrl = `https://www.youtube.com/watch?v=${trailerKey}`;
          const videoId = trailerUrl.split('v=')[1];
          loadYouTubePlayer(videoId);
        } else {
          alert('Sorry, no trailer found for this movie/tv series.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Sorry, no trailer found for this movie/tv series.');
      });
  };
  

  const handlePlayerStateChange = (event) => {
    // Pause video when it ends
    if (event.data === window.YT.PlayerState.ENDED) {
      playerInstanceRef.current.pauseVideo();
    }
  };

  useEffect(() => {
    if (typeof window.YT === 'undefined' || typeof window.YT.Player === 'undefined') {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = getMovieTrailer;
    } else {
      getMovieTrailer();
    }
  }, []);

  return (
    <div className="video-modal">
      <div className="video-modal-content">
        <div className="video-wrapper">
          <div id="player" />
        </div>
      </div>
    </div>
  );
};

export default MovieTrailer;
