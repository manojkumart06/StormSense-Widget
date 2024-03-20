import React from 'react';
import "./header.css";

// Header component to display the application title
const Header = () => {
  return (
    <div className='header'>
      <img className = "logo-img"src="https://cdn-icons-png.flaticon.com/256/4968/4968583.png"alt="logo-img"/>
      <h1>STORMSENSE-WIDGET</h1>
    </div>
  )
}

export default Header;
