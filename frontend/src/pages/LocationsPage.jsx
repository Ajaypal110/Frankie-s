import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const locations = [
  {
    name: 'Agoura Hills',
    city: 'Agoura Hills',
    address: '28708 Roadside Drive, Agoura Hills, CA',
    menuLink: '/agoura', // Force pointing to agoura page
    image: '/locations-agoura.png',
  },
];

const LocationsPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div>
      {/* Reduced Height Hero Section */}
      <section style={{
        position: 'relative', 
        height: '35vh',
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center', 
        overflow: 'hidden',
        background: '#1a1a1a',
      }}>
        <h1 style={{
          color: '#F5F1EB', 
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 400,
          letterSpacing: '0.15em', 
          textTransform: 'uppercase',
          marginTop: '40px'
        }}>Locations</h1>
      </section>

      {/* Location Card Grid (Scaled Down) */}
      <section className="section-padding" style={{ background: '#F5F1EB' }}>
        <div style={{
          maxWidth: '600px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr',
          gap: '60px',
        }}>
          {locations.map((loc, idx) => (
            <Link key={idx} to="/agoura" style={{ textDecoration: 'none', color: 'inherit', display: 'block', opacity: 1, visibility: 'visible' }}>
              <div style={{
                overflow: 'hidden', position: 'relative',
                aspectRatio: '4/3', marginBottom: '24px',
              }}>
                <img src={loc.image} alt={loc.name} className="safe-hover-scale" style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                }} />
              </div>
              <h3 style={{
                fontFamily: '"Playfair Display", serif', fontSize: '28px',
                fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase',
                marginBottom: '8px',
              }}>{loc.name}</h3>
              <p style={{
                fontFamily: '"Montserrat", sans-serif', fontSize: '10px',
                fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase',
                color: '#8a8580', marginBottom: '4px',
              }}>{loc.city}</p>
              <p style={{
                fontFamily: '"Cormorant Garamond", serif', fontSize: '15px',
                fontWeight: 300, color: '#2d2d2d', letterSpacing: '0.02em',
                marginBottom: '24px'
              }}>{loc.address}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LocationsPage;
