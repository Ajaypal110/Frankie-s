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
    <div ref={sectionRef} style={{ background: '#fff', overflowX: 'hidden' }}>
      <style>{`
        @media (max-width: 1024px) {
          .about-editorial-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .about-hero-section {
            height: 50vh !important;
          }
          .sticky-col {
            position: relative !important;
            top: 0 !important;
          }
          .editorial-image-container {
            height: 400px !important;
          }
          .intro-section {
            padding: 120px 20px 60px 20px !important;
          }
        }
      `}</style>

      {/* Intro Section */}
      <section className="intro-section" style={{ 
        background: '#ffffff', 
        textAlign: 'left',
        padding: '180px 40px 100px 40px',
        width: '100%'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 className="fade-in" style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(28px, 6vw, 42px)',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '40px',
            color: '#1a1a1a'
          }}>GET TO KNOW US</h1>
          
          <div style={{ maxWidth: '1250px' }}>
            <p className="fade-in" style={{
              fontFamily: '"Courier Prime", monospace', 
              fontSize: '15px',
              lineHeight: 2, 
              color: '#333',
              marginBottom: '30px'
            }}>{intro}</p>
            
            <p className="fade-in" style={{
              fontFamily: '"Courier Prime", monospace', 
              fontSize: '15px',
              lineHeight: 2, 
              color: '#333'
            }}>{story}</p>
          </div>
        </div>
      </section>

      {/* Hero Banner */}
      <section className="about-hero-section hero-section" style={{ height: '80vh', zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Restaurant interior"
          className="hero-bg"
          style={{ objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
      </section>

      {/* Chef Section */}
      <section style={{ 
        position: 'relative',
        zIndex: 10,
        background: '#ffffff', 
        padding: '120px 40px 80px 40px', 
        width: '100%' 
      }} className="section-padding">
        <div className="about-editorial-grid" style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr 1fr',
          gap: '60px',
          alignItems: 'flex-start'
        }}>
          
          {/* Left: Chef Heading */}
          <div className="fade-in sticky-col">
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(28px, 4vw, 36px)',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#1a1a1a',
              marginBottom: '16px'
            }}>CHEF NUNO GRULLON:</h2>
            <p style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#8a8580',
              lineHeight: 2
            }}>PASSIONATE CREATIVITY<br />FROM THE BRONX TO MIAMI</p>
          </div>

          {/* Center: Chef Portrait */}
          <div className="fade-in editorial-image-container sticky-col" style={{ position: 'relative', overflow: 'hidden', height: '600px' }}>
            <img 
              src="/chef-about.png" 
              alt="Chef Nuno Grullon" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

          {/* Right: Narrative Bio */}
          <div className="fade-in" style={{ textAlign: 'left' }}>
            <p style={{
              fontFamily: '"Courier Prime", monospace',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.8,
              letterSpacing: '0.02em',
              color: '#333'
            }} dangerouslySetInnerHTML={{ __html: "Chef Nuno Grullon, A New York native started working in restaurants at the early age of sixteen. Over the years while continuing expand his culinary knowledge and skill, started receiving recognition and accolades, appearing on Bravo's television show \"Best New Restaurant\" produced by Gordon Ramsay and has also toured central America with the culinary magazine \"Buen Provecho\". In 2019 Chef Nuno Grullon decided to put his skill and vision into his first business, on a unique corner of Biscayne Boulevard and NE 66th Street. Uptown 66 would become a welcome addition to Miami's Upper east Side MiMo District. Uptown 66 is an exploration of authentic Mexican street food through the lens of Chef Nuno.<br/><br/>Receiving national accreditation from Good Morning America with their birria taco winning \"Best Taco in America\". Despite the success of his first venture, Grullon had a vision for a much broader impact in Miami culinary and hospitality. Grullon set forward to bring a concept that would challenge him to push the boundaries of his skillset and creativity and showcase his culinary passion in a way Miami has yet to see fully. Grand Central would become the outlet for that passion. Opting for pure quality and perfect execution over innovation, Grullon would present American classics with subtle French influence raising the bar for what should be expected from the young restaurant group." }}>
            </p>
          </div>

        </div>
      </section>

      {/* Passion for Food Section */}
      <section style={{ 
        position: 'relative',
        zIndex: 10,
        background: '#ffffff', 
        padding: '40px 40px 80px 40px', 
        width: '100%' 
      }} className="section-padding">
        <div className="about-editorial-grid" style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '0.8fr 1.2fr 1fr',
          gap: '60px',
          alignItems: 'flex-start'
        }}>
          
          {/* Left: Illustration Column */}
          <div style={{ textAlign: 'left', paddingTop: '40px' }} className="fade-in">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="7.5" cy="5.5" r="0.4" fill="#1a1a1a" />
              <circle cx="8.5" cy="5.5" r="0.4" fill="#1a1a1a" />
              <path d="M6 7.5h4v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7.5z" />
              <path d="M7 4.5h2v3H7z" />
              <circle cx="15.5" cy="5.5" r="0.4" fill="#1a1a1a" />
              <circle cx="16.5" cy="5.5" r="0.4" fill="#1a1a1a" />
              <path d="M14 7.5h4v12a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V7.5z" />
              <path d="M15 4.5h2v3h-2z" />
            </svg>
          </div>

          {/* Center: Story Continuation */}
          <div style={{ textAlign: 'left' }} className="fade-in">
            <p style={{
              fontFamily: '"Courier Prime", monospace',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 2,
              letterSpacing: '0.02em',
              color: '#333'
            }}>
              From our hand-pressed tortillas of heirloom corn from Oaxaca, to our award winning Birria made with short-rib, oxtail and beef cheek slow-braised overnight with our selection of Mexican chilis. It only begins there, this diverse menu has many fan favorites all made from scratch.
              <br /><br />
              From the notorious steak burrito to our famous loaded nachos layered with house made cheese sauce. Always leave room for dessert, light airy churros dipped in silky chocolate sauce, creamy caramel flan and a tres leches like you've never had before. Every dish we serve is to showcase our passion for food.
            </p>
          </div>

          {/* Right: Food Lifestyle Image */}
          <div className="fade-in editorial-image-container" style={{ position: 'relative', overflow: 'hidden', height: '650px' }}>
            <img 
              src="/food-passion.png" 
              alt="Frankie's culinary spread" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

        </div>
      </section>

      {/* Finishing Lifestyle Banner */}
      <section className="about-hero-section hero-section" style={{ height: '70vh', zIndex: 0 }}>
        <img 
          src="/about-lifestyle.png" 
          alt="Outdoor dining at Frankie's" 
          className="hero-bg"
          style={{ objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)' }} />
      </section>

      <div style={{ position: 'relative', zIndex: 10, height: '20px', background: '#ffffff' }} />
    </div>
  );
};

export default AboutPage;
