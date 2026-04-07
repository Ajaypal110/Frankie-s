import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAbout = location.pathname === '/about';
  const isPress = location.pathname === '/press';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Use dark colors if scrolled OR on the About/Press pages (which have a white top)
  const isDarkTheme = scrolled || isAbout || isPress;
  const textColor = isDarkTheme ? '#1a1a1a' : '#F5F1EB';

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: 'transparent',
          transition: 'all 0.5s ease',
        }}
      >
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 15px', 
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          height: '100%',
        }}>
          {/* Hamburger (Left) */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <button
              className="hamburger"
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-around', 
                background: 'transparent', 
                border: 'none', 
                cursor: 'pointer', 
                padding: '8px', 
                zIndex: 60,
                marginLeft: '-15px', 
              }}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg width="62" height="42" viewBox="0 0 42 28" fill={textColor} style={{ 
                transition: 'fill 0.5s ease',
                filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.3))'
              }}>
                <path d="M 2,4 Q 15,3 40,4.5 Q 25,6.5 2,6 Z" />
                <path d="M 1,14 Q 20,15 41,13.5 Q 25,16 1,15 Z" />
                <path d="M 3,23.5 Q 15,22 39,24 Q 20,26 3,24.5 Z" />
              </svg>
            </button>
          </div>

          {/* Logo (Perfectly Centered) */}
          <Link to="/" style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
          }}>
            <img 
              src="/logo.png" 
              alt="Frankie's Logo" 
              style={{
                height: 'clamp(40px, 10vw, 65px)',
                width: 'auto',
                filter: isDarkTheme ? 'none' : 'brightness(0) invert(1)',
                transition: 'filter 0.5s ease',
              }} 
            />
          </Link>

          {/* Empty div for symmetry */}
          <div style={{ flex: 1 }}></div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5F1EB" strokeWidth="1.5">
            <line x1="4" y1="4" x2="20" y2="20" />
            <line x1="20" y1="4" x2="4" y2="20" />
          </svg>
        </button>
        <nav className="mobile-menu-links">
          <Link to="/" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/about" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>About</Link>
          <Link to="/locations" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Locations</Link>
          <Link to="/menu" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Menus</Link>
          <Link to="/press" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Press</Link>
          <a href="https://frankiesbreakfastburritos.toast.site/" target="_blank" rel="noopener noreferrer" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Order</a>
        </nav>

      </div>
    </>
  );
};

export default Navbar;
