import React, { useState, useEffect } from 'react';
import Nav from "./Nav";
import Banner from "./Banner";
import Row from "./Row";
import requests from "./Requests";
import Preloader from './Preloader';

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="homescreen">
          < Nav />
          < Banner />
          <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
          <Row title="Upcoming" fetchUrl={requests.fetchUpcoming} />
          <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
          <Row title="Action" fetchUrl={requests.fetchActionMovies} />
          <Row title="Adventure" fetchUrl={requests.fetchAdventureMovies} />
          <Row title="Thriller" fetchUrl={requests.fetchThriller} />
          <Row title="Comedy" fetchUrl={requests.fetchComedyMovies} />
          <Row title="Sci-fi" fetchUrl={requests.fetchScifi} />
          <Row title="Horror" fetchUrl={requests.fetchHorrorMovies} />
          <Row title="Romance" fetchUrl={requests.fetchRomanceMovies} />
          <Row title="Animation" fetchUrl={requests.fetchAnimation} />
          <Row title="War" fetchUrl={requests.fetchWar} />
          <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
        </div>
      )}
    </div>
  );
};



export default HomeScreen;
