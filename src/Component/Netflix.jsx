// ... (imports and constants)
import React from "react";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DemoComment from "./DemoComment";
import Youtube from 'react-youtube';
import movieTrailer from "movie-trailer";
import { useNavigate } from 'react-router-dom';
const base_url ='https://image.tmdb.org/t/p/original/';
const ApiKey = 'b0082684398664a4f99cb234dc50dd65';
function Netflix() {
    const { id }  = useParams();
    const [rating, setRating] = useState(0);
    const [movieDetail, setMovieDetail] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState("");
    const navigate= useNavigate();
    const handleRatingClick = (newRating) => {
      setRating(newRating);
    };
  
    useEffect(() => {
      fetchTVKEy(id);
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
        movieTrailer(movie?.name || "")
          .then((url) => {
            console.log("Found trailer URL:", url); // Add this line

            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get('v'));
          })
          .catch((err) => {
            console.log("Error fetching trailer:", err); // Add this line
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
        }} />
        <h1 style={{ color: 'white'}} className="contain_data">{(movieDetail)?.title || (movieDetail)?.name}</h1>
          {(movieDetail) && (
            <div className='movie-inf' style={{ paddingTop: '50px' }}>
            <div className="imge">            
              {trailerUrl ? ( 
                <Youtube videoId={trailerUrl} opts={opts} className="you" />
              ) : (
                <img
                  className="movies_img"
                  src={`${base_url}${movieDetail?.poster_path}`}
                  alt={(movieDetail)?.name}
                />
              )}
                </div>
              <div className='data'>
                <p>Release Date: {(movieDetail)?.release_date || (movieDetail)?.first_air_date}</p>
                <p>Rating: {(movieDetail)?.vote_average}</p>
                <p>Overview: {(movieDetail)?.overview}</p>
                <p>Rating: {(movieDetail?.popularity)}</p>
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
  
  export default Netflix;
  