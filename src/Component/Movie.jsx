import React from 'react';
import { useState } from 'react';
import '../CSS/Movie.css'
function Movie({onClose, name, path, title, overview, release, popularity}) {
    const [rating, setRating] = useState(0);

    const handleRatingClick = (newRating) => {
      setRating(newRating);
    };
  
//    console.log(name);
console.log(release);
const Star = ({ filled, onClick }) => (
    <span className={filled ? 'star filled' : 'star'} onClick={onClick}>
      ★
    </span>
  );
  
    return (
        <div className='overlay'>
            <div className="overlay-content">
            <button className="close-button" onClick={onClose}>
          Close
        </button>


      <img src={`https:image.tmdb.org/t/p/original/${path}`} className='movie_img' alt={title || name } />
      <div className="movie-info">
        <h2>{title}</h2>
        <p>{overview}</p>
        <p>Release Date: {release? release : '23/5/23'}</p>
        <div className="star-rating">
        <p>Rating</p>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          filled={value <= rating}
          onClick={() => handleRatingClick(value)}
        />
      ))}
    </div>

      </div>
    </div>

        </div>
    );
}

export default Movie;