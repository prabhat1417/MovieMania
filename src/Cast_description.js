import React, { useState, useEffect } from 'react';
import Nav from "./Nav";
import Castmovie from "./Cast_movies";
import Preloader from "./Preloader";
import './Cast_description.css';
import { useParams } from 'react-router-dom';
import axios from "./axios";
import { API_KEY } from './Requests';

function Description() {
  const { personId } = useParams();
  const [person, setpersonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    async function fetchMovieData() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/person/${personId}?api_key=${API_KEY}&language=en-US`);
        setpersonData(response.data);
      } catch (error) {
        console.error('Error fetching movie data:', error.message);
      }
    }

    fetchMovieData();
  }, [personId]);

  if (!person) {
    return <div> <Preloader /></div>;
  }
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string;
  }

  const bannerStyle = {
    background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(31,4,4,1) 51%, rgba(255,0,48,1) 100%)",
    backgroundPosition: "left center",
    backgroundSize: "cover",
    height: "80vh",
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
              <div className='person_content'>
               <div>
               <h1>{person?.name}</h1>
               <div className='bio'>
                  <p className='personal'>{person?.birthday?.substring(0,4)}<span className='line'>|</span>{person?.place_of_birth}</p>
                </div>
                <h1 className='person_description'>
                {truncate(person?.biography, 800)}
                </h1>
               </div>
                <img className='person' src={`https://image.tmdb.org/t/p/original/${person?.profile_path}`} alt="person" /> 
                
              </div>
              <div className='banner--fadeBottom' />
            </header>
          </div>
          <Castmovie title="Movies" fetchUrl={`https://api.themoviedb.org/3/person/${person.id}/movie_credits?api_key=${API_KEY}&language=en-US`} />
          <Castmovie title="TV" fetchUrl={`https://api.themoviedb.org/3/person/${person.id}/tv_credits?api_key=${API_KEY}&language=en-US`} />
        </div>
      )}
    </div>
  );
}

export default Description;
