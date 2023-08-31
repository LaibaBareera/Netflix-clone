import React,{useState,useEffect} from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/Related.css'
const base_url ='https://image.tmdb.org/t/p/original/';


function Related({fetchUrl}) {
    const navigate = useNavigate();
    const [movies,setMovies] = useState([]);
    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            // console.log(request)
            const res  = request.data.results.slice(0,6);
            setMovies(res);
            return request;
        }
        fetchData();
    },[fetchUrl])
    return (
        
        //Releted.jsx Code

        <div>
        <div className="movie-container">
      {movies.map(movie => ( 
        <div key={movie.id} className="movie-card">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            onClick={()=>{
                navigate(`/info/${movie.id}`);
            }}
            className="movie-image"
          />
          <p className="movie-name">{movie.title || movie.name}</p>
        </div>
    
      ))}
    </div>

            
        </div>
    );
}

export default Related;