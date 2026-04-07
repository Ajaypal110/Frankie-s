import React, { useEffect, useState } from 'react';

const WP_API = 'http://localhost:8884/wp-json/wp/v2';

const AgouraHillsMenuPage = ({ location = 'Agoura Hills' }) => {
  const [wpMenuItems, setWpMenuItems] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${WP_API}/menu_item?per_page=100`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setWpMenuItems(data); })
      .catch(() => {});
  }, []);

  return (
    <div>
      {/* Menu Header */}
      <section style={{
        background: '#1a1a1a', color: '#F5F1EB', textAlign: 'center',
        paddingTop: '140px', paddingBottom: '60px', paddingLeft: '24px', paddingRight: '24px',
      }}>
        <h1 style={{
          fontFamily: '"Playfair Display", serif', fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px',
        }}>{location}</h1>
        <p style={{
          fontFamily: '"Montserrat", sans-serif', fontSize: '10px',
          fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8a8580',
        }}>MENU</p>
      </section>

      {/* Menu Sections */}
      <section style={{ background: '#F5F1EB', padding: '80px 24px', minHeight: '40vh' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {/* Empty state message if nothing from WP either */}
          {wpMenuItems.length === 0 && (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <p style={{
                fontFamily: '"Courier Prime", monospace',
                fontSize: '14px',
                letterSpacing: '0.1em',
                color: '#8a8580',
                textTransform: 'uppercase'
              }}>Our new menu is currently being curated.<br />Please check back soon.</p>
            </div>
          )}

          {/* WP dynamic items if present */}
          {wpMenuItems.length > 0 && wpMenuItems.map((item, idx) => (
            <div key={idx} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              marginBottom: '20px',
            }}>
              <div>
                <p style={{
                  fontFamily: '"Playfair Display", serif', fontSize: '18px',
                  fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase',
                  marginBottom: '4px',
                }} dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
                <p style={{
                  fontFamily: '"Cormorant Garamond", serif', fontSize: '14px',
                  fontWeight: 300, fontStyle: 'italic', color: '#8a8580',
                }} dangerouslySetInnerHTML={{ __html: item.content.rendered.replace(/<[^>]*>/g, '') }} />
              </div>
              {item.meta?.price && (
                <p style={{
                  fontFamily: '"Montserrat", sans-serif', fontSize: '12px',
                  fontWeight: 500, letterSpacing: '0.1em',
                }}>{item.meta.price}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AgouraHillsMenuPage;
