import React, { useState, useEffect } from 'react'
import "./Nav.css"
import coverImage from './images/cover.png';

function Nav() {
  const [show,handleShow]=useState(false);
  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  }
  
  useEffect(() => {
    window.addEventListener("scroll",transitionNavBar);
    return () => {
    window.removeEventListener("scroll",transitionNavBar);
    }
  }, [])
  

  return (
    <div className={`nav ${show && "nav_black"}`}>
    <div className="nav_contents">
      <img className='nav_logo' src={coverImage} alt="logo" />
      <img className='nav_avatar' src="https://th.bing.com/th?id=OIP._VoTfUzENldEmDbFEcQi4QHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="avatar" />
    </div>
    </div>
  )
}

export default Nav