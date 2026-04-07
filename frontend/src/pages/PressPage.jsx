import React, { useEffect } from 'react';

const pressItems = [
  {
    source: 'MIAMI HERALD',
    headline: 'This outdoor Mexican restaurant just won a national TV contest for best taco',
    url: '#',
  },
  {
    source: 'MIAMI NEW TIMES',
    headline: "Miami's 2022 Best Tacos",
    url: '#',
  },
  {
    source: 'MIAMI NEW TIMES',
    headline: 'Good Morning America Proclaims Miami Taqueria Tops in U.S.',
    url: '#',
  },
  {
    source: 'BROKEN PALATE',
    headline: 'A Miami Taco Place is Crowned Number One',
    url: '#',
  },
];

const PressPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div>
      {/* Header */}
      <section style={{
        background: '#1a1a1a', color: '#F5F1EB', textAlign: 'center',
        paddingTop: '140px', paddingBottom: '80px', paddingLeft: '24px', paddingRight: '24px',
      }}>
        <h1 style={{
          fontFamily: '"Playfair Display", serif', fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase',
        }}>Press</h1>
      </section>

      {/* Press Items */}
      <section style={{ background: '#F5F1EB', padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {pressItems.map((item, idx) => (
            <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" style={{
              display: 'block', textDecoration: 'none', color: 'inherit',
              padding: '40px 0',
              borderBottom: idx < pressItems.length - 1 ? '1px solid rgba(26,26,26,0.1)' : 'none',
              transition: 'opacity 0.3s ease',
            }}
            onMouseOver={e => e.currentTarget.style.opacity = '0.6'}
            onMouseOut={e => e.currentTarget.style.opacity = '1'}
            >
              <p style={{
                fontFamily: '"Montserrat", sans-serif', fontSize: '10px',
                fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase',
                color: '#8a8580', marginBottom: '12px',
              }}>{item.source}</p>
              <h3 style={{
                fontFamily: '"Playfair Display", serif', fontSize: 'clamp(20px, 2.5vw, 28px)',
                fontWeight: 400, letterSpacing: '0.06em', lineHeight: 1.5,
                color: '#1a1a1a',
              }}>{item.headline}</h3>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PressPage;
