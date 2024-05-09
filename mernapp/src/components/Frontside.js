import React from 'react';
import './Frontside.css';

export default function Frontside() {
  return (
    <div className="frontside-container">
      <div className="image-container">
        <img className="image" src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png" alt="Your Image" style={{objectFit: "contain !important"}}/>
        <div className="button-container">
          <form className="d-flex" >
            <input className="form-control me-5" type="search" placeholder="Search" aria-label="Search" />
            <button className="bsearch btn-outline-success"  type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
  );
}


