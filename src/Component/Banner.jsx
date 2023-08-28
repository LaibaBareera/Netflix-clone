import React, { useEffect, useState } from 'react';
import axios from '../axios';
import request from '../request';
import InfoIcon from '@mui/icons-material/Info';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import '../CSS/Banner.css'
import { useNavigate } from 'react-router-dom';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import Movie from './Movie';

function Banner(props) {
    const [movie, setMovies] = useState([]);
    const [trailerUrl,setTrailerUrl] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        async function fetchdata(){
            const reqst = await axios.get(request.fetchTrending);
            setMovies(reqst.data.results[Math.floor(Math.random() * reqst.data.results.length -1)]);
            return reqst;
        }
        fetchdata();
    },[])
    function truncate(str,n){
        return str?.length > n ? str.substr(0,n-1) + "..." : str;
    }
    const handleClick =(movie)=>{
        if(trailerUrl){
            setTrailerUrl("");
        }
        else{
            movieTrailer(movie?.name || "")
            .then((url)=>{
                const urlParams=new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            }
            ).catch((err)=>{
                console.log(err);
            })
        }
    }
    const opts={
        height: '390',
        width: "100%",
        playerVars: {
            autoplay: '1'
        },
    };
    const [showOverlay, setShowOverlay] = useState(false);

  const openOverlay = () => {
    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };


    return (
       <header className='banner'
       style={{backgroundSize:"cover",
                backgroundImage:`url("https:image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: 'center center'}}>
        <div className='banner_content'>
        <h1 className='banner_title'>
            {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className='banner_buttons'>
        <button className='banner_button' onClick={()=>{
            handleClick(movie)
        }}> <PlayArrowIcon className='play'/><span className='play_button'>Play</span> </button>
        <button className='banner_button' onClick={openOverlay}><InfoIcon className='play' /> <span className='play_button'>More Info</span></button>
        {showOverlay && <Movie onClose={closeOverlay} name={movie?.name} path={movie?.poster_path} title={movie?.title} overview={movie?.overview} release={movie?.release_date} popularity={movie?.popularity} />}

        </div>
        <h1 className='banner_description'>
        {truncate(movie?.overview,150)}
        </h1>
        </div>
        {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>}
       </header>
    );
}

export default Banner;