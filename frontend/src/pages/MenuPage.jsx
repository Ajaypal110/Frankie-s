import React, { useEffect, useState } from 'react';

const WP_API = 'http://localhost:8884/wp-json/wp/v2';

const defaultMenuSections = [
  {
    title: 'ON THE HALF SHELL',
    items: [
      { name: 'Oysters', desc: 'Passion Fruit Cocktail Sauce', price: '1/2......20 | DOZEN.....39' },
    ]
  },
  {
    title: 'STARTERS',
    items: [
      { name: 'Crispy Calamari', desc: 'Horseradish Crema, Pickled Onion, Pickled Jalapeños', price: '17' },
      { name: 'Guacamole & Chips', desc: 'Cilantro, Cotija, Lime', price: '11' },
      { name: 'Chips & Salsa', desc: 'Tomato, Chipotle, Lime, Cilantro, Onion', price: '7' },
      { name: 'Elote', desc: 'Mexican Street Corn, Mayo, Cotija, Cilantro, Lime', price: '7' },
      { name: 'Uptown Nachos', desc: 'Melted Queso Mixto, Roasted Corn, Pickled Jalapeño, Radish, Spring Onion', price: 'Pollo 15 | Steak 17 | Shrimp 17' },
      { name: 'Classic Caesar Salad', desc: 'Baby Romaine, House Croutons, Cotija, Egg', price: 'Pollo 15 | Steak 17 | Shrimp 17' },
    ]
  },
  {
    title: 'TACOS',
    items: [
      { name: 'Pollo Asado', desc: 'Chicken, Crema, Cotija, Pickled Carrots', price: '5' },
      { name: 'Hongos', desc: 'Wild Mushrooms Guiso, Caramelized Pear, Red Onion', price: '6' },
      { name: 'Barbacoa', desc: 'Oxtail, Beef Cheek, Short Rib, Pickled Onion', price: '6' },
      { name: 'Al Pastor', desc: 'Pork Shoulder, Pineapple, Onion', price: '5' },
    ]
  },
  {
    title: 'SPECIALTIES',
    items: [
      { name: 'Flautas', desc: 'Braised Beef, Queso Mixto, Consommé', price: '13' },
      { name: 'Birria', desc: 'Pollo, Queso, Crema, Cilantro', price: '13' },
      { name: 'Steak Burrito', desc: 'Crispy Potatoes, Queso Mixto, Chipotle Crema, Pico, Guacamole', price: '15' },
      { name: 'Chicken Burrito', desc: 'Crispy Potatoes, Queso Mixto, Chipotle Crema, Pico, Guacamole', price: '15' },
      { name: 'Shrimp Burrito', desc: 'Red Rice, Cilantro Crema, Pico, Guacamole', price: '16' },
    ]
  },
  {
    title: 'DULCES',
    items: [
      { name: 'Churros', desc: 'Chocolate Ganache', price: '8' },
      { name: 'Tres Leches', desc: 'Chantilly, Chocolate Pearls', price: '7' },
      { name: 'Vanilla Bean Flan', desc: 'Carmelo', price: '7' },
    ]
  },
  {
    title: 'BEVERAGES',
    items: [
      { name: 'Mexican Coke', desc: '', price: '3.75' },
      { name: 'Diet Coke', desc: '', price: '3.75' },
      { name: 'Jarritos', desc: 'Tamarind, Mandarin, Pineapple', price: '3.75' },
      { name: 'Topo Chico', desc: '', price: '3.75' },
      { name: 'Water', desc: '', price: '2' },
    ]
  },
  {
    title: 'HAPPY HOUR',
    subtitle: 'MONDAY - FRIDAY 4-7PM',
    items: [
      { name: '$4 Tacos', desc: '', price: '' },
      { name: '$5 Chips & Salsa', desc: '', price: '' },
      { name: '$1 Oysters', desc: '', price: '' },
    ]
  },
];

const MenuPage = ({ location = 'MiMo' }) => {
  const [wpMenuItems, setWpMenuItems] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${WP_API}/menu_item?per_page=100`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setWpMenuItems(data); })
      .catch(() => {});
  }, []);

  const menuSections = wpMenuItems.length > 0 ? [] : defaultMenuSections;

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
      <section style={{ background: '#F5F1EB', padding: '80px 24px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {menuSections.map((section, sIdx) => (
            <div key={sIdx} style={{ marginBottom: '64px' }}>
              <h2 style={{
                fontFamily: '"Playfair Display", serif', fontSize: 'clamp(22px, 3vw, 32px)',
                fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase',
                textAlign: 'center', marginBottom: '8px', color: '#1a1a1a',
              }}>{section.title}</h2>
              {section.subtitle && (
                <p style={{
                  fontFamily: '"Montserrat", sans-serif', fontSize: '10px',
                  fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase',
                  textAlign: 'center', marginBottom: '32px', color: '#8a8580',
                }}>{section.subtitle}</p>
              )}
              {!section.subtitle && (
                <div style={{ width: '40px', height: '1px', background: 'rgba(26,26,26,0.15)', margin: '16px auto 32px' }} />
              )}
              {section.items.map((item, iIdx) => (
                <div key={iIdx} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  marginBottom: '20px', gap: '16px', flexWrap: 'wrap',
                }}>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <p style={{
                      fontFamily: '"Playfair Display", serif', fontSize: '18px',
                      fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase',
                      marginBottom: '4px', color: '#1a1a1a',
                    }}>{item.name}</p>
                    {item.desc && (
                      <p style={{
                        fontFamily: '"Cormorant Garamond", serif', fontSize: '14px',
                        fontWeight: 300, fontStyle: 'italic', color: '#8a8580',
                        letterSpacing: '0.02em',
                      }}>{item.desc}</p>
                    )}
                  </div>
                  {item.price && (
                    <p style={{
                      fontFamily: '"Montserrat", sans-serif', fontSize: '12px',
                      fontWeight: 500, letterSpacing: '0.1em', color: '#1a1a1a',
                      whiteSpace: 'nowrap',
                    }}>{item.price}</p>
                  )}
                </div>
              ))}
            </div>
          ))}

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

export default MenuPage;
