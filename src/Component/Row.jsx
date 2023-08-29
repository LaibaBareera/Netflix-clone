import React, { useEffect, useState } from 'react';
import axios from '../axios';
import '../CSS/Row.css'
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const base_url ='https://image.tmdb.org/t/p/original/';

function Row({title,fetchUrl,isLargeRow,TV}) {
    const [movies, setMovies] = useState([]);
    const [page,setPage] = useState(1);
    const navigate = useNavigate();
    const handleInfinite = ()=>{
        try{
            if (window.innerWidth + document.documentElement.scrollWidth+1 >= document.documentElement.scrollLeft){
                setPage((prev)=>prev + 1);
            }

         }
        catch(err){

        }

    }
    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            // console.log(request);
            setMovies((prev)=> [...prev,...request.data.results]);
            return request;
        }
        fetchData();
    },[fetchUrl,page])
   
    console.table(movies);
    return (
        <div className='row'>
            <h2 style={{color:'white'}}>{title}</h2>
            <div className='row-posters' style={{display:'flex', flexDirection: 'row'}}>
                {movies.map(val => (<><img 
                className={`row_poster ${isLargeRow && 'row_posterLarge'}`} 
                key={val.id}
                onClick={()=>{
                    TV===true ? navigate(`/netflix/${val.id}`):
                    navigate(`/info/${val.id}`);
                }} 
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
            
        </div>
    );
}

export default Row;