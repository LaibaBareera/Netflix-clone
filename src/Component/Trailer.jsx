// ... (imports and constants)
import React from "react";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import Youtube from 'react-youtube';
import movieTrailer from "movie-trailer";
const base_url= "https://api.themoviedb.org/3";
const ApiKey = 'b0082684398664a4f99cb234dc50dd65';
function Trailer() {
  const id = useParams();
  const [rating, setRating] = useState(0);
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");

  const handleRatingClick = (newRating) => {
    setRating(newRating);
  };

  useEffect(() => {
    fetchTrailerKey(id.id);
  }, [id]);

  useEffect(() => {
    if (movieDetails) {
      handleClick(movieDetails);
    }
  }, [movieDetails]);

  const fetchTrailerKey = async (id) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${ApiKey}&language=en-US`
      );
      const data = await response.json();
      setMovieDetails(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };


  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const opts = {
    height: '700px',
    width: '1650px',
    playerVars: {
      autoplay: '1',
    },
  };

  const Star = ({ filled, onClick }) => (
    <span className={filled ? 'star filled' : 'star'} onClick={onClick}>
      ★
    </span>
  );

  return (
    <>
      <Nav />
      <div className='container'>
        {(movieDetails) && (
          <div className='movie-info' style={{ paddingTop: '50px' }}>
            <h1>{(movieDetails)?.title || (movieDetails)?.name}</h1>
            {trailerUrl ? (
              <Youtube videoId={trailerUrl} opts={opts} />
            ) : (
              <img
                className="movies_img"
                src={`${base_url}${(movieDetails)?.poster_path || (movieDetails)?.backdrop_path}`}
                alt={(movieDetails)?.title || (movieDetails)?.name}
              />
            )}

            <div className=''>
              <p>Release Date: {(movieDetails)?.release_date || (movieDetails)?.first_air_date}</p>
              <p>Rating: {(movieDetails)?.vote_average}</p>
              <p>Overview: {(movieDetails)?.overview}</p>
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
        )}
      </div>
    </>
  );
}

export default Trailer;