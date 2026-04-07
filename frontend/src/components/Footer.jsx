import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <Link to="/">
            <img 
              src="/logo.png" 
              alt="Frankie's Logo" 
              style={{
                height: '80px',
                width: 'auto',
                filter: 'brightness(0) invert(1)',
                opacity: 0.9
              }} 
            />
          </Link>
        </div>

        <div className="footer-grid">
          {/* Column 1: Locations */}
          <div className="footer-column">
            <h4 className="footer-heading">LOCATIONS</h4>
            
            <div className="footer-location-block">
              <p className="footer-address">
                7100 BISCAYNE BLVD,<br />
                MIAMI, FL 33138
              </p>
              <a href="#" className="footer-map-link">VIEW ON MAP</a>
            </div>

            <div className="footer-location-block">
              <p className="footer-address">
                COMING SOON:<br />
                COCONUT GROVE
              </p>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="footer-column">
            <h4 className="footer-heading">EXPLORE</h4>
            <nav className="footer-nav">
              <Link to="/" className="footer-link">HOME</Link>
              <Link to="/about" className="footer-link">ABOUT</Link>
              <Link to="/locations" className="footer-link">LOCATIONS</Link>
              <Link to="/miamimenu" className="footer-link">MENUS</Link>
              <Link to="/press" className="footer-link">PRESS</Link>
            </nav>
          </div>

          {/* Column 3: Contact & Social */}
          <div className="footer-column">
            <h4 className="footer-heading">SAY HOLA</h4>
            <nav className="footer-nav">
              <span className="footer-link">INFO@FRANKIESMEXICAN.COM</span>
              <a href="https://instagram.com" className="footer-link" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
              <a href="#" className="footer-link">ORDER ONLINE</a>
              <a href="#" className="footer-link">RESERVATIONS</a>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} FRANKIE'S BURRITO. ALL RIGHTS RESERVED.
          </p>
          <div className="footer-soc-links">
            <a href="#" className="footer-link">FB</a>
            <a href="#" className="footer-link">IG</a>
            <a href="#" className="footer-link">TW</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
