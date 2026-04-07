import React from 'react';

const ImageGrid = () => {
  return (
    <section style={{
      position: 'relative',
      zIndex: 40, 
      backgroundColor: '#ffffff',
      padding: '0',
      width: '100%',
    }}>
      <div style={{
        display: 'flex',
        width: '100%',
        gap: '0',
        padding: '0',
        boxSizing: 'border-box'
      }}>
        {/* Left Column */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '0' }}>
          <img 
            src="https://picsum.photos/id/163/800/600" 
            alt="Food 1" 
            style={{ width: '100%', height: '400px', objectFit: 'cover', display: 'block', background: '#eee' }}
          />
          <img 
            src="https://picsum.photos/id/429/800/800" 
            alt="Food 2" 
            style={{ width: '100%', height: '500px', objectFit: 'cover', display: 'block', background: '#eee' }}
          />
        </div>

        {/* Right Column */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '0' }}>
          <img 
            src="https://picsum.photos/id/493/800/1000" 
            alt="Food 3" 
            style={{ width: '100%', height: '600px', objectFit: 'cover', display: 'block', background: '#eee' }}
          />
          <img 
            src="https://picsum.photos/id/292/800/600" 
            alt="Food 4" 
            style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block', background: '#eee' }}
          />
        </div>
      </div>
    </section>
  );
};

export default ImageGrid;
