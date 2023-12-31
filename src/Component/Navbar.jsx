import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const navigate= useNavigate();
  const clickHandler=(e)=>{
    e.preventDefault();
    navigate('/login');

  }

  return (
    <header className="topNav">
      <nav className="navbar navbar-expand-md navbar-dark">
        <div className="container-fluid" style={{display:'flex', flexDirection: 'row', paddingTop: '3vh'}}>
          <Link className="navbar-brand" to="/">
            <img className="nav__logo" src="https://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo.png" alt="" />
          </Link>
          
          <div className="navbar_2">
            <form style={{paddingLeft: '160vh',display:'flex',flexDirection:'row'}} role="search">
              <select className='slct'>
                <option>English</option>
                <option>Hindi</option>
              </select>
              <button className="btn" onClick={clickHandler}>Signin</button>
            </form>
          </div>
        </div>
      </nav>
    </header>

  );
}