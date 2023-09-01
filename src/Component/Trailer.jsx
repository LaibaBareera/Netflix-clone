// ... (imports and constants)
import React from "react";
import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DemoComment from "./DemoComment";
import Nav from "./Nav";
import Youtube from 'react-youtube';
import movieTrailer from "movie-trailer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const base_url ='https://image.tmdb.org/t/p/original/';
const ApiKey = 'b0082684398664a4f99cb234dc50dd65';

function Trailer() {
  const id = useParams();
  const [rating, setRating] = useState(0);
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const navigate = useNavigate();
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
      <div className='containe'>
      <ArrowBackIcon className="arw"
        onClick={()=>{
          navigate(-1);
        }}
      />
      <h1 style={{ color: 'white'}} className="contain_data">{(movieDetails)?.title || (movieDetails)?.name}</h1>

        {(movieDetails) && (
          <div className='movie-inf' style={{ paddingTop: '5px' }}>
            <div className="imge">            
            {trailerUrl ? (
              <Youtube videoId={trailerUrl} opts={opts} className="you"/>
            ) : (
              <img
                className="movies_img"
                src={`${base_url}${(movieDetails)?.poster_path || (movieDetails)?.backdrop_path}`}
                alt={(movieDetails)?.title || (movieDetails)?.name}
              />
            )}</div>
         

            <div className='data'>
              <p>Release Date: {(movieDetails)?.release_date || (movieDetails)?.first_air_date}</p>
              <p>Rating: {(movieDetails)?.vote_average}</p>
              <p>Overview: {(movieDetails)?.overview}</p>
              <p>Rating: {(movieDetails)?.popularity}</p>
             

              <div className='bv3_form'>
              <h1>
                Post Review
              </h1>
              <div style={{display:'flex',flexDirection:'row'}}>
              {[1, 2, 3, 4, 5].map((value) => (
                <Star
                  key={value}
                  filled={value <= rating}
                  onClick={() => handleRatingClick(value)}
                />
              ))}
              </div>
            
      <form>
        <textarea className='bv3_input' type='text' placeholder='Enter your Review'/>
        <button type='submit' className='bv3_btn'>Post</button>
        </form>
      </div>

  
            </div>
          </div>
        )}

    </div>
    <div className="movie-page">
    {trailerUrl && (
  <div className="comments-section">
    <h2>Comment</h2>
    <DemoComment videoID={trailerUrl} />
    {/* Add comment components here */}
  </div>
)}

         

      </div>
    </>
  );
}

export default Trailer;
