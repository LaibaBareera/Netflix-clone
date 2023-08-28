import React, { useEffect, useState } from 'react';
import axios from '../axios';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import '../CSS/Row.css'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';
const base_url ='https://image.tmdb.org/t/p/original/';

function Row({title,fetchUrl,isLargeRow}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl,setTrailerUrl] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            // console.log(request);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl])
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
    console.table(movies);
    return (
        <div className='row'>
            <h2 style={{color:'white'}}>{title}</h2>
            <div className='row-posters' style={{display:'flex', flexDirection: 'row'}}>
                {movies.map(val => (<><img 
                className={`row_poster ${isLargeRow && 'row_posterLarge'}`} 
                key={val.id} 
                onClick={()=>{handleClick(val)}}
                src={`${base_url}${isLargeRow ? val.poster_path: val.backdrop_path}`} 
                alt={val.name} />
                {/* <div className='img_description'>
                    <PlayCircleIcon onClick={()=>{
                        navigate(`/movie${val.id}`);
                    }}/>
                    <AddCircleOutlineIcon />
                    <ThumbUpOffAltIcon />
                    <KeyboardArrowDownIcon />
                </div> */}
                </>
                ))}

            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>}
        </div>
    );
}

export default Row;