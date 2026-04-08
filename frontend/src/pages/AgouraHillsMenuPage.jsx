import React, { useEffect, useState } from 'react';
import { ORDER_BASE_URL, API_BASE_URL } from '../config';

const CATEGORIES = [
  "All", "Breakfast & More", "Lunch & More", "Kids", "Drinks", "Desserts", "Sides", "Catering"
];

const CAT_MAP = {
  "Breakfast & More": "breakfast",
  "Lunch & More": "lunch",
  "Kids": "kids",
  "Drinks": "drinks",
  "Desserts": "desserts",
  "Sides": "sides",
  "Catering": "catering"
};

const DEFAULT_MENU_DATA = {
  "Breakfast & More": { description: "All of our breakfast burritos come with eggs and tots. (Except our vegan options) Any burrito can be made in a bowl, served \"wet\" or fried chimichanga style!", count: 11 },
  "Lunch & More": { description: "All of our lunch burritos come with rice and pinto beans. No eggs, no tots! Perfect for a delicious lunch on the go or sit in.", count: 10 },
  "Kids": { description: "Smaller portions, same big flavor! Perfect for our younger Frankie's fans.", count: 3 },
  "Drinks": { description: "Made fresh in-house with the brightest ingredients. Simple, vibrant, and refreshingly real. Never Faked.", count: 4 },
  "Desserts": { description: "Sweet treats to end your Frankie's experience on a high note.", count: 6 },
  "Sides": { description: "The perfect accompaniments fried in decadent beef tallow for ultimate crunch.", count: 4 },
  "Catering": { description: "WE MUST HAVE 48 HOURS ADVANCE NOTICE. Guaranteed to be the talk of the town!", count: 3 }
};

const buildMenuData = (apiData) => {
  const result = {};
  for (const [uiLabel, conf] of Object.entries(DEFAULT_MENU_DATA)) {
    const slug = CAT_MAP[uiLabel];
    result[uiLabel] = {
      description: apiData?.[`${slug}_description`] || conf.description,
      items: []
    };
    
    // Loop until we find no more items for this category
    let i = 1;
    while (true) {
        const name = apiData?.[`${slug}_${i}_name`];
        if (!name) break; // End of list

        result[uiLabel].items.push({
            id: `${slug}_${i}`,
            name: name,
            price: apiData[`${slug}_${i}_price`] || '',
            image: apiData[`${slug}_${i}_image`] || '',
            orderLink: apiData[`${slug}_${i}_orderlink`] || ORDER_BASE_URL,
            description: apiData[`${slug}_${i}_description`] || ''
        });
        i++;
    }
  }
  return result;
};

const AgouraHillsMenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);
  const [menuData, setMenuData] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_BASE_URL}/frankies/v1/menu?t=${new Date().getTime()}`)
      .then(res => res.json())
      .then(json => {
         setData(json);
         setMenuData(buildMenuData(json));
      })
      .catch(err => {
         console.error("Failed to fetch menu", err);
         setMenuData(buildMenuData(null));
      });
  }, []);

  const renderGrid = (items) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px' }}>
      {items.map(item => (
        <a key={item.id} href={item.orderLink || ORDER_BASE_URL} target="_blank" rel="noopener noreferrer" className="menu-card" 
          style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit', cursor: 'pointer', position: 'relative' }}>
          
          <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: '16px', overflow: 'hidden', marginBottom: '20px', backgroundColor: '#f9f9f9', boxShadow: '0 4px 15px rgba(0,0,0,0.06)', position: 'relative' }}>
            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
                 onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                 onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }} />
            <div className="order-overlay" style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(0,0,0,0.8)', color: '#fff', padding: '8px 20px', borderRadius: '30px', fontFamily: '"Montserrat", sans-serif', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0, transition: 'opacity 0.3s ease', pointerEvents: 'none' }}>Order Now</div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
            <h3 style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '18px', fontWeight: 700, flex: 1 }}>{item.name}</h3>
            <span style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginLeft: '15px' }}>{item.price}</span>
          </div>
          
          <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '14px', color: '#666', lineHeight: '1.6' }}>{item.description}</p>
        </a>
      ))}
      <style>{`.menu-card:hover .order-overlay { opacity: 1; }`}</style>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <div style={{ paddingTop: '120px', borderBottom: '1px solid #eee', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 40, width: '100%' }}>
        <div className="menu-header-container" style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', gap: '20px' }}>
          
          <nav className="category-nav" style={{ display: 'flex', gap: '30px', overflowX: 'auto', paddingBottom: '15px', flex: 1, scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => { setActiveCategory(cat); setSearchQuery(""); }}
                style={{
                  background: 'none', border: 'none', padding: '10px 0', fontFamily: '"Montserrat", sans-serif', fontSize: '14px',
                  cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.3s ease',
                  borderBottom: activeCategory === cat ? '2px solid #000' : '2px solid transparent',
                  fontWeight: activeCategory === cat ? '700' : '500',
                  color: activeCategory === cat ? '#000' : '#666'
                }}>
                {cat}
              </button>
            ))}
          </nav>

          <div className="search-container" style={{ position: 'relative', marginBottom: '15px' }}>
            <input type="text" placeholder="Search dishes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '10px 15px 10px 40px', borderRadius: '30px', border: '1px solid #eee', fontFamily: '"Montserrat", sans-serif', fontSize: '14px', width: 'clamp(200px, 20vw, 300px)', outline: 'none', backgroundColor: '#f9f9f9', boxSizing: 'border-box' }} />
            <svg style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .menu-header-container { flex-direction: column !important; align-items: flex-start !important; padding: 0 20px !important; gap: 10px !important; }
          .category-nav { width: 100%; padding-bottom: 5px !important; }
          .search-container { width: 100%; }
          .search-container input { width: 100% !important; }
          .category-nav::-webkit-scrollbar { display: none; }
        }
      `}</style>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 40px' }} className="menu-grid-container">
        {Object.keys(menuData).length === 0 ? (
           <div style={{ textAlign: 'center', padding: '60px 0', color: '#999', fontStyle: 'italic' }}>Loading menu...</div>
        ) : (
          CATEGORIES.filter(c => c !== "All").map(category => {
            if (activeCategory !== "All" && activeCategory !== category) return null;

            const conf = menuData[category];
            const filteredItems = (conf?.items || []).filter(item => 
              item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.description.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (searchQuery && filteredItems.length === 0) return null;
            if (filteredItems.length === 0 && !searchQuery) return null; 

            return (
              <div key={category} style={{ marginBottom: '80px' }}>
                <h2 style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 700, marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {category}
                </h2>
                {conf.description && (
                  <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '15px', color: '#333', lineHeight: '1.6', maxWidth: '900px', marginBottom: '40px' }}>
                    {conf.description}
                  </p>
                )}
                {renderGrid(filteredItems)}
              </div>
            );
          })
        )}

        {searchQuery && Object.keys(menuData).length > 0 && 
         CATEGORIES.filter(c => (activeCategory === "All" || activeCategory === c))
           .every(c => (menuData[c]?.items || [])
           .filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()) || i.description.toLowerCase().includes(searchQuery.toLowerCase())).length === 0) && (
          <div style={{ padding: '60px 0', color: '#999', fontStyle: 'italic', textAlign: 'center' }}>
            <p>No items found matching your search.</p>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .menu-grid-container { padding: 40px 20px !important; }
        }
      `}</style>
    </div>
  );
};

export default AgouraHillsMenuPage;
