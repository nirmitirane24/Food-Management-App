import React from 'react';
import './Footer.css'; 


export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <link to="/" className="footer-logo">
          {/* <svg className="footer-icon" width="30" height="24">
            
          </svg> */}
        </link>
        <span className="footer-text"></span>
      </div>
      <ul className="footer-right">

      </ul>
    </footer>
  );
}
