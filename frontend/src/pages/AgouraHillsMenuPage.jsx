import React, { useEffect, useState } from 'react';

const CATEGORIES = [
  "Breakfast & More", 
  "Lunch & More", 
  "Kids", 
  "Drinks", 
  "Desserts", 
  "Sides", 
  "Catering"
];

const MENU_DATA = {
  "Breakfast & More": {
    description: "All of our breakfast burritos come with eggs and tots. (Except our vegan options) Any burrito can be made in a bowl, served \"wet\" or fried chimichanga style!",
    items: [
      { id: 1, name: "The Sunrise", price: "$15.50", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800", description: "Rise and shine in style! Cage-free soft scrambled eggs, artisanal smoked Niman Ranch bacon, golden crack tater tots, velvety cheddar queso, and chipotle aioli all wrapped snug in a warm, fire-grilled flour tortilla." },
      { id: 2, name: "The Southwestern Supreme", price: "$17.50", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=800", description: "Go bold at breakfast! Cage-free soft scrambled eggs, zesty chorizo, and melty pepper jack queso. Crispy crack tater tots and creamy avocado join the mix, finished with a splash of our signature house salsa- all wrapped snug in a warm fire-grilled flour tortilla." },
      { id: 3, name: "The Sol Verde (Green Sun)", price: "$18.50", image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&q=80&w=800", description: "Start your day with plant-powered flavor! Savory vegan chorizo, crispy cracked potatoes, and a golden tumeric scramble mingle with silky cashew queso, spicy (or mild) house salsa, creamy avocado, chile aioli, and fresh cilantro - all wrapped snug in a warm fire-grilled vegan tortilla." },
      { id: 4, name: "The Piggyback Delight", price: "$16.50", image: "https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?auto=format&fit=crop&q=80&w=800", description: "A flavor ride worth taking! Cage-free soft scrambled eggs, tender confit pulled pork, crispy jalapenos, and golden crack tater tots. Finished with melty white cheddar queso and a bright splash of salsa verde." },
      { id: 5, name: "A-Town Charger", price: "$19.50", image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800", description: "Bold Flavors, Bomb Players! Cage-free soft scrambled eggs, grass-fed flank steak, caramelized onions, tater tots, cheddar queso, salsa macha (contains nuts), avocado salsa, chipotle aioli - grilled flour tortilla." },
      { id: 6, name: "The Roman Sunrise", price: "$17.50", image: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&q=80&w=800", description: "Cage-free soft scrambled eggs with savory Italian sausage, roasted red peppers, and caramelized onions. Crispy crack tater tots, melted mozzarella, basil pesto, and Parmesan." },
      { id: 7, name: "The Sunset", price: "$15.50", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800", description: "Savor the flow of golden hour! Cage-free soft scrambled eggs, rich brown butter sausage, golden crack tater tots, silk cheddar queso, and right, zesty Pico de Gallo." },
      { id: 8, name: "The Smoky Rooster", price: "$16.50", image: "https://images.unsplash.com/photo-1505253304412-1f41d953931e?auto=format&fit=crop&q=80&w=800", description: "Wake up with a little kick! Slow-braised chicken tinga, cage-free scrambled eggs, crispy cracked potatoes, silky white cheddar queso and your choice of spicy or mild house salsa." },
      { id: 9, name: "Tres Tacos (Breakfast)", price: "$13.95", image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&q=80&w=800", description: "Cage-free scrambled eggs, choose any protein above, pico de gallo, guacamole & sour cream on a corn tortillas." },
      { id: 10, name: "Bacon Egg Cheese Sandwich", price: "$12.50", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800", description: "Classic breakfast excellence. Crispy bacon, fluffy eggs, and melted cheese on a perfectly toasted roll." },
      { id: 11, name: "MiReina Burrito", price: "$19.50", image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800", description: "Steak, Beans, Shredded Cheese, Tator Tots, Avocado - the ultimate breakfast royal treatment." }
    ]
  },
  "Lunch & More": {
    description: "All of our lunch burritos come with rice and pinto beans. No eggs, no tots! Perfect for a delicious lunch on the go or sit in.",
    items: [
      { id: 12, name: "SW Supreme", price: "$17.50", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=800", description: "House-made chorizo, Mexican rice and beans, pepper jack queso, creamy avocado salsa, pico de gallo, grilled flour tortilla." },
      { id: 13, name: "The Malibu Sun", price: "$18.50", image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&q=80&w=800", description: "Savory vegan chorizo, white rice and pinto beans, with silky cashew queso, vegan chipotle aioli, avocado salsa, and fresh cilantro." },
      { id: 14, name: "The Kanan Dume", price: "$16.50", image: "https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?auto=format&fit=crop&q=80&w=800", description: "Confit pulled pork (carnitas), crispy jalapenos. rice and pinto beans, cheddar queso, salsa verde, sour cream, grilled flour tortilla." },
      { id: 15, name: "THE HAWK", price: "$19.50", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800", description: "Grass-fed flank steak, caramelized onions, rice and pinto beans, cheddar queso, pico de gallo, chipotle aioli, grilled flour tortilla." },
      { id: 16, name: "THE CIELO", price: "$17.50", image: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&q=80&w=800", description: "Italian sausage, roasted red peppers, caramelized onions, melted mozzarella, and a touch of basil pesto, and tangy tomato relish." },
      { id: 17, name: "THE WILLOW WILDCAT", price: "$16.50", image: "https://images.unsplash.com/photo-1611066060196-419fba24da83?auto=format&fit=crop&q=80&w=800", description: "Slow-braised chicken tinga, pepper jack queso, rice, pinto beans, pico de gallo, avocado salsa, and grilled flour tortilla." },
      { id: 18, name: "EL GRANDE", price: "$21.50", image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800", description: "Carne Asada, Chicken Tinga, rice and beans, sour cream, guacamole, pepper jack queso, salsa verde - grilled flour tortilla." },
      { id: 19, name: "Lunch Bean and Cheese", price: "$11.95", image: "https://images.unsplash.com/photo-1562158074-9543be988388?auto=format&fit=crop&q=80&w=800", description: "Pinto Beans, pepperjack or cheddar queso wrap." },
      { id: 20, name: "Tres Tacos (Lunch)", price: "$13.95", image: "https://images.unsplash.com/photo-1512838243191-e81e8f2430bc?auto=format&fit=crop&q=80&w=800", description: "3 Soft corn tortilla, your choice of protein, rice and beans, pico de gallo, and guacamole." },
      { id: 21, name: "Agoura Loaded Nachos", price: "$14.95", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=800", description: "Brown butter sausage or choice of protein, pepper jack queso, jalapenos, pico gallo, guacamole, sour cream." }
    ]
  },
  "Kids": {
    description: "Smaller portions, same big flavor! Perfect for our younger Frankie's fans.",
    items: [
      { id: 22, name: "Kids Bacon Egg Cheese Burrito", price: "$10.95", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800", description: "Mini flour tortilla, eggs, bacon and shredded cheddar cheese." },
      { id: 23, name: "Kids Sausage Egg Cheese Burrito", price: "$10.95", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800", description: "Cage-free scrambled eggs, brown butter sausage, cheddar cheese." },
      { id: 24, name: "Kids Breakfast Sausage Quesadilla", price: "$10.95", image: "https://images.unsplash.com/photo-1562158074-9543be988388?auto=format&fit=crop&q=80&w=800", description: "Cage-free eggs, house brown butter sausage, and cheddar cheese." },
      { id: 25, name: "Kids Breakfast Bacon Quesadilla", price: "$10.95", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=800", description: "Cage-free eggs, crispy bacon, and cheddar cheese." },
      { id: 26, name: "Kids Pancakes & Bacon", price: "$13.95", image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80&w=800", description: "2 chocolate chip pancakes with 2 pieces of bacon with a side of Vermont maple syrup." },
      { id: 27, name: "Kids Bean and Cheese Burrito", price: "$7.95", image: "https://images.unsplash.com/photo-1562158074-9543be988388?auto=format&fit=crop&q=80&w=800", description: "Warm flour tortilla, simple beans and melted cheese." }
    ]
  },
  "Drinks": {
    description: "Made fresh in-house with the brightest ingredients. Simple, vibrant, and undeniably refreshing. Never Faked.",
    items: [
      { id: 28, name: "Horchata Agoura Fresca", price: "$7.50", image: "https://images.unsplash.com/photo-1513558161293-cdaf7659a992?auto=format&fit=crop&q=80&w=800", description: "Creamy, spiced, and refreshing house-made horchata." },
      { id: 29, name: "Jamaica Agoura Fresca", price: "$7.50", image: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&q=80&w=800", description: "Bright and tart hibiscus flower tea, served chilled." },
      { id: 30, name: "Watermelon Agoura Fresca", price: "$7.50", image: "https://images.unsplash.com/photo-1533512900330-802c01990920?auto=format&fit=crop&q=80&w=800", description: "Fresh pressed watermelon juice - perfect for hot Malibu days." },
      { id: 31, name: "Pineapple Mango Fresca", price: "$7.50", image: "https://images.unsplash.com/photo-1481671703460-040cb8a2d909?auto=format&fit=crop&q=80&w=800", description: "Tropical pineapple and sweet mango infusion." },
      { id: 32, name: "Fresh Orange Juice", price: "$6.00", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800", description: "Squeezed daily from the best local oranges." },
      { id: 33, name: "Fresh Lemonade", price: "$6.00", image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&q=80&w=800", description: "Zesty, sweet, and perfectly balanced fresh lemonade." }
    ]
  },
  "Desserts": {
    description: "Sweet treats to end your Frankie's experience on a high note.",
    items: [
      { id: 34, name: "House-Made Churro", price: "$4.50", image: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&q=80&w=800", description: "Crispy on the outside, soft inside, tossed in cinnamon sugar." },
      { id: 35, name: "Chocolate Chip Cookie", price: "$4.50", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800", description: "Gooey, buttery, and packed with premium chocolate." },
      { id: 36, name: "Raspberry Lemon Cookie", price: "$5.00", image: "https://images.unsplash.com/photo-1603532648955-0393e01c8a64?auto=format&fit=crop&q=80&w=800", description: "Tart raspberry meets bright citrus in this soft-baked favorite." },
      { id: 37, name: "Strawberry Cheesecake Cookie", price: "$6.00", image: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?auto=format&fit=crop&q=80&w=800", description: "Decadent cookie with a creamy cheesecake center and strawberry swirls." },
      { id: 38, name: "Cowgirl Cookie", price: "$5.00", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800", description: "Loaded with oats, chocolate, and salty crunch - a true classic." },
      { id: 39, name: "Maple Pecan Cinnamon Roll", price: "$8.50", image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&q=80&w=800", description: "Giant, fluffy cinnamon roll topped with maple glaze and toasted pecans." }
    ]
  },
  "Sides": {
    description: "The perfect accompaniments fried in decadent beef tallow for ultimate crunch.",
    items: [
      { id: 40, name: "Cracked Tots", price: "$6.50", image: "https://images.unsplash.com/photo-1573016608964-b49e66ec3692?auto=format&fit=crop&q=80&w=800", description: "Perfectly crisp, dangerously good. Cooked in decadent beef tallow for that signature Frankie's crunch." },
      { id: 41, name: "Loaded Cracked Tots", price: "$15.00", image: "https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?auto=format&fit=crop&q=80&w=800", description: "Infamous tots fried in beef tallow, piled with protein, chipotle aioli, sour cream, and guacamole." },
      { id: 42, name: "Chips & Queso", price: "$6.00", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=800", description: "House chips with a side of our velvety, melty pepper jack queso." },
      { id: 43, name: "Chips & Salsa", price: "$4.50", image: "https://images.unsplash.com/photo-1581447100595-3a811abc1930?auto=format&fit=crop&q=80&w=800", description: "Crispy house-made chips served with your choice of signature house salsa." },
      { id: 44, name: "Agoura Loaded Nachos", price: "$18.50", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=800", description: "Brown butter sausage or choice of protein, pepper jack queso, jalapenos, pico gallo, guacamole, sour cream." }
    ]
  },
  "Catering": {
    description: "WE MUST HAVE 48 HOURS ADVANCE NOTICE. Guaranteed to be the talk of the town with our flavor-packed catering boxes!",
    items: [
      { id: 45, name: "Fiesta Pack", price: "$150.00", image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800", description: "Feeds up to 10 people. Mix and match any of our starter burritos. Includes 1 large bag of chips and 2 choice salsas." },
      { id: 46, name: "Premium Pack", price: "$175.00", image: "https://images.unsplash.com/photo-1512838243191-e81e8f2430bc?auto=format&fit=crop&q=80&w=800", description: "Feeds up to 10 people. Mix and match burritos + large chips, 2 salsas, and a large side of house guacamole." },
      { id: 47, name: "Premier Pack", price: "$200.00", image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800", description: "The ultimate selection! 10 burritos, chips, 2 salsas, large guacamole, and a large side of pepperjack queso." }
    ]
  }
};

const AgouraHillsMenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("Breakfast & More");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentCategoryData = MENU_DATA[activeCategory] || { description: "Coming Soon", items: [] };
  
  // Search through items in the CURRENT category
  const filteredItems = currentCategoryData.items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* Category Nav & Search Header */}
      <div style={{ 
        paddingTop: '120px', 
        borderBottom: '1px solid #eee',
        position: 'sticky',
        top: 0,
        backgroundColor: '#fff',
        zIndex: 40,
        width: '100%'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '0 40px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          {/* Categories */}
          <nav style={{ display: 'flex', gap: '30px', overflowX: 'auto', paddingBottom: '15px', flex: 1 }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSearchQuery("");
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: activeCategory === cat ? '2px solid #000' : '2px solid transparent',
                  padding: '10px 0',
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: '14px',
                  fontWeight: activeCategory === cat ? '700' : '500',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  color: activeCategory === cat ? '#000' : '#666',
                  transition: 'all 0.3s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Search */}
          <div style={{ position: 'relative', marginBottom: '15px' }}>
            <input 
              type="text" 
              placeholder="Search dishes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '10px 15px 10px 40px',
                borderRadius: '30px',
                border: '1px solid #eee',
                fontFamily: '"Montserrat", sans-serif',
                fontSize: '14px',
                width: 'clamp(200px, 20vw, 300px)',
                outline: 'none',
                backgroundColor: '#f9f9f9'
              }}
            />
            <svg style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Hero Content Section */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 40px' }}>
        <h2 style={{ 
          fontFamily: '"Montserrat", sans-serif', 
          fontSize: '28px', 
          fontWeight: 700, 
          marginBottom: '15px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {activeCategory}
        </h2>
        <p style={{ 
          fontFamily: '"Montserrat", sans-serif', 
          fontSize: '15px', 
          color: '#333', 
          lineHeight: '1.6', 
          maxWidth: '900px',
          marginBottom: '40px'
        }}>
          {currentCategoryData.description}
        </p>

        {/* Menu Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '40px' 
        }}>
          {filteredItems.map(item => (
            <div key={item.id} className="menu-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                width: '100%',
                height: '320px',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '20px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 4px 15px rgba(0,0,0,0.06)'
              }}>
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <h3 style={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: '18px',
                  fontWeight: 700,
                  flex: 1
                }}>{item.name}</h3>
                <span style={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  marginLeft: '15px'
                }}>{item.price}</span>
              </div>
              
              <p style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: '14px',
                color: '#666',
                lineHeight: '1.6'
              }}>{item.description}</p>
            </div>
          ))}

          {/* Empty Search Result */}
          {filteredItems.length === 0 && (
            <div style={{ padding: '60px 0', color: '#999', fontStyle: 'italic', textAlign: 'center', gridColumn: '1 / -1' }}>
              <p>No items found matching your search in {activeCategory}.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgouraHillsMenuPage;
