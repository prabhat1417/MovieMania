import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import './Search.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { API_KEY } from './Requests';

function SearchResults() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
            searchQuery
          )}&api_key=${API_KEY}&include_adult=false&language=en-US`
        );
        setResults(response.data.results);
      } catch (error) {
        console.log('Error fetching search results:', error);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);
  const openDescription = (result) => {
    // Determine the new path based on the current location and movie ID
    let newPath;
    if (result.media_type === 'movie') {
      newPath = `/description/${result.id}`;
    } else {
      newPath = `/tv_description/${result.id}`;
    }
  
    // Refresh the page and then navigate to the new path
    window.location.href = newPath;
  };
  return (
    <div className='search'>
      <Nav />
      <div className="posters">
        {results.map((result) => (
          <LazyLoadImage
            className="poster"
            key={result.id}
            src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
            alt={result.title || result.name}
            effect="blur"
            onClick={() => openDescription(result)}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
