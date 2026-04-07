import React, { useEffect } from 'react';

const OrderPage = () => {
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
          marginBottom: '16px',
        }}>Order</h1>
        <p style={{
          fontFamily: '"Montserrat", sans-serif', fontSize: '11px',
          fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: '#8a8580',
        }}>Select a location to place your order</p>
      </section>

      {/* Location buttons */}
      <section style={{ background: '#F5F1EB', padding: '100px 24px', textAlign: 'center' }}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '24px', maxWidth: '400px', margin: '0 auto',
        }}>
          <a href="/miamimenu" className="menu-btn" style={{
            width: '100%', textAlign: 'center', color: '#1a1a1a', borderColor: '#1a1a1a',
          }}>MiMo</a>
          <a href="/hallandalemenu" className="menu-btn" style={{
            width: '100%', textAlign: 'center', color: '#1a1a1a', borderColor: '#1a1a1a',
          }}>Hallandale</a>
        </div>
      </section>
    </div>
  );
};

export default OrderPage;
