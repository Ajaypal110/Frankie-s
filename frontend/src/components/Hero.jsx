import React, { useEffect, useRef } from 'react';

const Hero = ({ data }) => {
  const imgRef = useRef(null);
  const heading = data?.title?.rendered || "FRANKIE'S";
  const subtitle = data?.acf?.hero_subtitle ||
    "AN EXPLORATION OF AUTHENTIC MEXICAN STREET FOOD. SOURCING FRESHEST LOCAL PRODUCE AND HIGHEST QUALITY MEATS AND SEAFOOD.";

  useEffect(() => {
    const timer = setTimeout(() => {
      if (imgRef.current) imgRef.current.classList.add('loaded');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-section">
      <img
        ref={imgRef}
        className="hero-bg"
        src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        alt="Mexican street food spread"
        loading="eager"
      />
    </section>
  );
};

export default Hero;
