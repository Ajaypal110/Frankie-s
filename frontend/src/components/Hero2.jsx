import React, { useEffect, useRef } from 'react';

const Hero2 = () => {
  return (
    <section className="hero-2-section" style={{
      position: 'sticky',
      top: 0,
      width: '100%',
      height: '50vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      zIndex: 20,
    }}>
      <style>{`
        @media (max-width: 768px) {
          .hero-2-section {
            height: 30vh !important;
          }
        }
      `}</style>
      <img
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
        src="https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        alt="Delicious gourmet tacos"
      />
    </section>
  );
};

export default Hero2;
