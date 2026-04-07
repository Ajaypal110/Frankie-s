import React from 'react';

const ImageGrid = () => {
  return (
    <section style={{
      position: 'relative',
      zIndex: 40, 
      backgroundColor: '#ffffff',
      padding: '0 0 16px 0',
      width: '100%',
    }}>
      <style>{`
        /* Desktop Heights */
        .img-h-small { height: 450px; }
        .img-h-med { height: 600px; }
        .img-h-vsmall { height: 300px; }

        @media (max-width: 768px) {
          .image-grid-container {
            gap: 4px !important;
            padding: 0 4px !important;
          }
          .image-col {
            gap: 4px !important;
          }
          /* Scaled Mobile Heights */
          .img-h-small { height: 200px !important; }
          .img-h-med { height: 280px !important; }
          .img-h-vsmall { height: 120px !important; }
        }
      `}</style>
      <div 
        className="image-grid-container"
        style={{
          display: 'flex',
          width: '100%',
          gap: '8px',
          padding: '0',
          boxSizing: 'border-box'
        }}>
        {/* Left Column */}
        <div className="image-col" style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <img 
            className="image-item img-h-small"
            src="/grid-cocktail.png" 
            alt="Signature Cocktail" 
            style={{ width: '100%', objectFit: 'cover', display: 'block', background: '#eee' }}
          />
          <img 
            className="image-item img-h-small"
            src="/grid-calamari.png" 
            alt="Fried Calamari" 
            style={{ width: '100%', objectFit: 'cover', display: 'block', background: '#eee' }}
          />
        </div>

        {/* Right Column */}
        <div className="image-col" style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <img 
            className="image-item img-h-med"
            src="/grid-oysters.png" 
            alt="Oyster Platter" 
            style={{ width: '100%', objectFit: 'cover', display: 'block', background: '#eee' }}
          />
          <img 
            className="image-item img-h-vsmall"
            src="/grid-churros.png" 
            alt="Churros with Chocolate" 
            style={{ width: '100%', objectFit: 'cover', display: 'block', background: '#eee' }}
          />
        </div>
      </div>
    </section>
  );
};

export default ImageGrid;
