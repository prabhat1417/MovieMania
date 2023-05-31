import React, { useState, useEffect } from 'react';
import Nav from "./Nav";
import Banner from "./Banner";
import Row from "./Row";
import requests from "./Requests";
import Preloader from './Preloader';

const TV = () => {
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
          <Row title="ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
          <Row title="Trending Now" fetchUrl={requests.fetchTrendingtv} />
          <Row title="Top Rated" fetchUrl={requests.fetchTopRatedtv} />
          <Row title="Action & Adventure" fetchUrl={requests.fetchActiontv} />
          <Row title="Drama" fetchUrl={requests.fetchDramatv} />
          <Row title="Animation" fetchUrl={requests.fetchAnimetv} />
          <Row title="Crime" fetchUrl={requests.fetchCrimetv} />
          <Row title="Comedy" fetchUrl={requests.fetchComedytv} />
          <Row title="Sci-fi" fetchUrl={requests.fetchScitv} />
          <Row title="Reality Shows" fetchUrl={requests.fetchRealitytv} />
          <Row title="War & Politics" fetchUrl={requests.fetchWartv} />
          <Row title="Documentaries" fetchUrl={requests.fetchDoctv} />

        </div>
      )}
    </div>
  );
};



export default TV;
