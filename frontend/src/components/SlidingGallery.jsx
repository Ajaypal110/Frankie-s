import React, { useRef, useState } from 'react';

const SlidingGallery = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Premium Mexican cuisine photos corresponding to the requested aesthetic (Churros, Oysters, Fried Calamari, Tacos)
  const images = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Restaurant Atmospheric
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Premium Restaurant Interior
    "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Mexican Food Spread
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Elegant Restaurant 
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Fine Dining
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section style={{ width: '100%', overflow: 'hidden', padding: '0 0 60px 0', background: '#ffffff' }}>
      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '16px',
          padding: '0 20px',
          cursor: isDragging ? 'grabbing' : 'grab',
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none', /* IE and Edge */
        }}
        className="hide-scrollbar"
      >
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}} />
        
        {images.map((src, index) => (
          <div key={index} style={{ 
            minWidth: 'clamp(250px, 30vw, 400px)', 
            height: 'clamp(280px, 40vw, 450px)',
            flexShrink: 0,
            overflow: 'hidden',
            borderRight: index !== images.length - 1 ? '1px solid #1a1a1a' : 'none'
          }}>
            <img 
              src={src} 
              alt={`Frankies cuisine ${index + 1}`} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none',
                transition: 'transform 0.5s ease',
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SlidingGallery;
