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
            <img className="nav__logo" src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="" />
          </Link>
          
          <div className="navbar">
            <form style={{paddingLeft: '160vh'}} role="search">
              <select>
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