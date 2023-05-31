import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Cast.css';

function Cast({ title, fetchUrl }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchUrl);
      setCast(response.data.cast.slice(0, 10));
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="cast">
      <h2 className="title">{title}</h2>
      <div className="cast_list">
        {cast &&
          cast.map((person) =>
            person.profile_path ? (
              <div key={person.id} className="cast_item">
                <img
                  className="cast_image"
                  src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
                  alt={person.name}
                />
                <p className="cast_name">{person.name}</p>
              </div>
            ) : null
          )}
      </div>
    </div>
  );
}

export default Cast;
