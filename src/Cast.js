import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Cast.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Cast({ title, fetchUrl }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchUrl);
      setCast(response.data.cast.slice(0, 10));
    }
    fetchData();
  }, [fetchUrl]);

  function opencast(person) {
    let newPath = `/cast/${person.id}`;
    window.location.href = newPath;
  }

  return (
    <div className="cast">
      <h2 className="title">{title}</h2>
      <div className="cast_list">
        {cast &&
          cast.map((person) =>
            person.profile_path ? (
              <div key={person.id} className="cast_item">
                <div className="cast_image_container">
                  <LazyLoadImage
                    className="cast_image"
                    src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
                    alt={person.name}
                    effect="blur"
                    onClick={() => opencast(person)}
                  />
                  <p className="cast_name">{person.name}</p>
                </div>
              </div>
            ) : null
          )}
      </div>
    </div>
  );
}

export default Cast;
