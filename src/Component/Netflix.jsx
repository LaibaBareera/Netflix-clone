// ... (imports and constants)
import React from "react";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import Youtube from 'react-youtube';
import movieTrailer from "movie-trailer";
const base_url= "https://api.themoviedb.org/3";
const ApiKey = 'b0082684398664a4f99cb234dc50dd65';
function Netflix() {
    const id = useParams();
    const [rating, setRating] = useState(0);
    const [movieDetail, setMovieDetail] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState("");
  
    const handleRatingClick = (newRating) => {
      setRating(newRating);
    };
  
    useEffect(() => {
      fetchTVKEy(id.id);
    }, [id]);
  
    useEffect(() => {
      if (movieDetail) {
        handleClick(movieDetail);
      }
    }, [movieDetail]);
  
    
  
    const fetchTVKEy = async (id) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${ApiKey}&language=en-US`
        );
        const data = await response.json();
        setMovieDetail(data);
      } catch (error) {
        console.error('Error fetching TV show details:', error);
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
          {(movieDetail) && (
            <div className='movie-info' style={{ paddingTop: '50px' }}>
              <h1>{(movieDetail)?.title || (movieDetail)?.name}</h1>
              {trailerUrl ? (
                <Youtube videoId={trailerUrl} opts={opts} />
              ) : (
                <img
                  className="movies_img"
                  src={`${base_url}${(movieDetail)?.poster_path || (movieDetail)?.backdrop_path}`}
                  alt={(movieDetail)?.title || (movieDetail)?.name}
                />
              )}
  
              <div className=''>
                <p>Release Date: {(movieDetail)?.release_date || (movieDetail)?.first_air_date}</p>
                <p>Rating: {(movieDetail)?.vote_average}</p>
                <p>Overview: {(movieDetail)?.overview}</p>
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
  
  export default Netflix;
  