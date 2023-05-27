import React from 'react'
import './Banner.css'

function Banner() {
  function truncate(string,n){
    return string?.length > n ? string.substr(0,n-1)+'...': string;
  }
  return (
    <header className='banner' style={{
        backgroundImage: `url("https://th.bing.com/th/id/OIP.zqzGylXzPLtaWKSD2xOtyAHaEo?pid=ImgDet&rs=1")`,
        backgroundPosition: "center center",
    }}>
      <div className='banner_content'>
        <h1 className='banner_title'>Movie name</h1>
        <div className='banner_buttons'>
            <button className='banner_button'>Play</button>
            <button className='banner_button'>My List</button>
        </div>
        <h1 className='banner_description'>This is a test description.
        {truncate(`This is a test description.This is a test description.
        This is a test description.
        This is a test description.This is a test description.
        This is a test description.This is a test description.
        This is a test description.This is a test description.
        This is a test description.This is a test description.`,150)}
        </h1>
      </div>
      <div className='banner--fadeBottom'/> 
    </header>
  )
}

export default Banner