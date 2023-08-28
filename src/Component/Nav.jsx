import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Nav.css';
import SearchIcon from '@mui/icons-material/Search';
import bg from '../Image/netflix-profile-pictures-1000-x-1000-dyrp6bw6adbulg5b.webp'
function Nav(props) {
    const [show,handleShow]= useState(false);
    useEffect(() => {
        window.addEventListener('scroll',() => {
            if(window.scrollY > 100){
                handleShow(true);
            }
            else {
                handleShow(false);
            }
        });
        return () => {
            window.removeEventListener('scroll',null);
        };
    },[]);
    const [isSearchVisible, setSearchVisible] = useState(false);

  const handleSearchClick = () => {
    setSearchVisible(!isSearchVisible);
  };

    return (
        <div className={`nav ${show && 'nav_black'}`} >
            <Link to='/'>
            <img className="nav_logo" src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="netflix_logo" />
            </Link>
            <Link className='nav_link' to='/trailer'> Home</Link>
            <Link className='nav_link_list' to='/list'>My List</Link>
            <SearchIcon onClick={handleSearchClick} className='search'/>
            {isSearchVisible && (
          <input type="text" placeholder="Search..." className='search_input'/>
        )}

            <img className='nav_avatar' src={bg}
            alt='profileimage'    
            />
        </div>
    );
}

export default Nav;