import React, { useEffect, useRef } from 'react';

const AboutPage = ({ data }) => {
  const sectionRef = useRef(null);

  const intro = data?.acf?.about_intro ||
    "Inspired by our creators, Frankie's is an exploration of authentic Mexican street food. Sourcing the freshest local produce and highest quality meats and seafood.";

  const story = data?.acf?.about_story ||
    "Frankie's has become a standard for quality and consistency for locals and visitors alike. Our atmosphere evolves throughout the day, from family, friends and colleagues sharing a great meal in the afternoon, to a bustling happy hour where you can enjoy our signature margaritas and top quality oysters for half the price, all the way through dinner to late night.";

  const chefHeading = data?.acf?.chef_heading || "CHEF NUNO GRULLON";
  const chefSubheading = data?.acf?.chef_subheading || "PASSIONATE CREATIVITY";

  const chefBio = data?.acf?.chef_bio ||
    "From our hand-pressed tortillas of heirloom corn from Oaxaca, to our award winning Birria made with short-rib, oxtail and beef cheek slow-braised overnight with our selection of Mexican chilis. It only begins there, this diverse menu has many fan favorites all made from scratch. From the notorious steak burrito to our famous loaded nachos layered with house made cheese sauce. Always leave room for dessert, light airy churros dipped in silky chocolate sauce, creamy caramel flan and a tres leches like you've never had before. Every dish we serve is to showcase our passion for food.";

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      sectionRef.current.querySelectorAll('section').forEach(s => observer.observe(s));
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      {/* Hero Banner */}
      <section style={{
        position: 'relative',
        height: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <img
          src="https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Restaurant interior"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
        <h1 className="fade-in" style={{
          position: 'relative', zIndex: 2, color: '#F5F1EB',
          fontFamily: '"Playfair Display", serif', fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase',
        }}>Get To Know Us</h1>
      </section>

      {/* Intro Section */}
      <section className="section-padding" style={{ background: '#F5F1EB', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p className="fade-in" style={{
            fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(17px, 2vw, 22px)',
            fontWeight: 300, lineHeight: 2, letterSpacing: '0.04em', color: '#2d2d2d',
          }}>{intro}</p>
          <div style={{ width: '40px', height: '1px', background: 'rgba(26,26,26,0.2)', margin: '48px auto' }} />
          <p className="fade-in" style={{
            fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(15px, 1.6vw, 18px)',
            fontWeight: 300, lineHeight: 2, letterSpacing: '0.03em', color: '#8a8580',
          }}>{story}</p>
        </div>
      </section>

      {/* Chef Section */}
      <section style={{ background: '#1a1a1a', color: '#F5F1EB' }} className="section-padding">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="fade-in" style={{
            fontFamily: '"Playfair Display", serif', fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px',
          }}>{chefHeading}</h2>
          <p className="fade-in" style={{
            fontFamily: '"Montserrat", sans-serif', fontSize: '11px', fontWeight: 500,
            letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '48px', color: '#8a8580',
          }}>{chefSubheading}</p>
          <p className="fade-in" style={{
            fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(15px, 1.6vw, 18px)',
            fontWeight: 300, lineHeight: 2, letterSpacing: '0.03em',
          }}>{chefBio}</p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
