import React, { useEffect, useState } from 'react';

const CATEGORIES = [
  "All",
  "Breakfast & More", 
  "Lunch & More", 
  "Kids", 
  "Drinks", 
  "Desserts", 
  "Sides", 
  "Catering"
];

const ORDER_BASE_URL = "https://frankiesbreakfastburritos.toast.site/order/frankies-breakfast-burritos-28708-roadside-drive";

const MENU_DATA = {
  "Breakfast & More": {
    description: "All of our breakfast burritos come with eggs and tots. (Except our vegan options) Any burrito can be made in a bowl, served \"wet\" or fried chimichanga style!",
    items: [
      { id: 1, name: "The Sunrise", price: "$15.50", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-the-sunrise_862190b3-68cd-4550-8db2-28c0b34054a5`, description: "Rise and shine in style! Cage-free soft scrambled eggs, artisanal smoked Niman Ranch bacon, golden crack tater tots, velvety cheddar queso, and chipotle aioli." },
      { id: 2, name: "The Southwestern Supreme", price: "$17.50", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-the-southwesten-supreme_20b2f58b-6f7b-4523-90df-b226178efe58`, description: "Go bold at breakfast! Cage-free soft scrambled eggs, zesty chorizo, and melty pepper jack queso. Crispy crack tater tots and creamy avocado join the mix." },
      { id: 3, name: "The Sol Verde (Green Sun)", price: "$18.50", image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-the-sol-verde-green-sun_1fdda587-eea3-460e-9d6a-e250386f13dc`, description: "Start your day with plant-powered flavor! Savory vegan chorizo, crispy cracked potatoes, and a golden tumeric scramble." },
      { id: 4, name: "The Piggyback Delight", price: "$16.50", image: "https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-the-piggyback-delight_6bd3d879-bcb6-4012-99f9-1a8b78f91265`, description: "A flavor ride worth taking! Cage-free soft scrambled eggs, tender confit pulled pork, crispy jalapenos, and golden crack tater tots." },
      { id: 5, name: "A-Town Charger", price: "$19.50", image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-atown-charger_07786cbe-1554-4771-b88b-d0e79ac18b6f`, description: "Bold Flavors, Bomb Players! Cage-free soft scrambled eggs, grass-fed flank steak, caramelized onions, tater tots, cheddar queso." },
      { id: 6, name: "The Roman Sunrise", price: "$17.50", image: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-the-roman-sunrise_e15de234-81da-4866-8883-5a1ed56d7d3a`, description: "Cage-free soft scrambled eggs with savory Italian sausage, roasted red peppers, mozzarella, basil pesto, and Parmesan." },
      { id: 7, name: "The Sunset", price: "$15.50", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-the-sunset_7fe378a2-1fdb-45de-a159-2638ebe383a3`, description: "Savor the flow of golden hour! Cage-free soft scrambled eggs, rich brown butter sausage, golden crack tater tots, silk cheddar queso." },
      { id: 8, name: "The Smoky Rooster", price: "$16.50", image: "https://images.unsplash.com/photo-1505253304412-1f41d953931e?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-the-smoky-rooster_b21978fd-19c6-40ec-96e7-668d1bda5cc2`, description: "Wake up with a little kick! Slow-braised chicken tinga, cage-free scrambled eggs, crispy cracked potatoes, silky white cheddar queso." },
      { id: 9, name: "Tres Tacos (Breakfast)", price: "$13.95", image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-tres-tacos-breakfast_cc0e5084-4e12-49b3-b4bd-4b9fc55cbdb0`, description: "Cage-free scrambled eggs, choose any protein above, pico de gallo, guacamole & sour cream on corn tortillas." },
      { id: 10, name: "Bacon Egg Cheese Sandwich", price: "$12.50", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-bacon-egg-cheese-sandwich_4204fe2a-ab4e-46f9-ad89-4bb82a43c6e4`, description: "Classic breakfast excellence. Crispy bacon, fluffy eggs, and melted cheese on a perfectly toasted roll." },
      { id: 11, name: "MiReina Burrito", price: "$19.50", image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-mireina-burrito_6d0e1040-9eb8-48d5-b9af-b2a9212a6a5e`, description: "Steak, Beans, Shredded Cheese, Tator Tots, Avocado - the ultimate breakfast royal treatment." }
    ]
  },
  "Lunch & More": {
    description: "All of our lunch burritos come with rice and pinto beans. No eggs, no tots! Perfect for a delicious lunch on the go or sit in.",
    items: [
      { id: 12, name: "SW Supreme", price: "$17.50", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-the-southwesten-supreme_20b2f58b-6f7b-4523-90df-b226178efe58`, description: "House-made chorizo, rice and beans, pepper jack queso, avocado salsa, pico de gallo, grilled flour tortilla." },
      { id: 13, name: "The Malibu Sun", price: "$18.50", image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-the-sol-verde-green-sun_1fdda587-eea3-460e-9d6a-e250386f13dc`, description: "Savory vegan chorizo, white rice and pinto beans, with silky cashew queso and vegan chipotle aioli." },
      { id: 14, name: "The Kanan Dume", price: "$16.50", image: "https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-the-piggyback-delight_6bd3d879-bcb6-4012-99f9-1a8b78f91265`, description: "Confit pulled pork (carnitas), crispy jalapenos, rice and pinto beans, cheddar queso, salsa verde." },
      { id: 15, name: "THE HAWK", price: "$19.50", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-the-hawk_54c7bd07-5057-487e-8d2e-39e895983f80`, description: "Grass-fed flank steak, rice and pinto beans, cheddar queso, pico de gallo, chipotle aioli." },
      { id: 16, name: "THE CIELO", price: "$17.50", image: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-the-cielo_48e5df7d-ea7e-4596-8e1c-dcb6920f85d2`, description: "Italian sausage, roasted red peppers, caramelized onions, melted mozzarella, and a touch of basil pesto." },
      { id: 17, name: "THE WILLOW WILDCAT", price: "$16.50", image: "https://images.unsplash.com/photo-1611066060196-419fba24da83?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-the-willow-wildcat_448d7c3e-b9c2-4f7a-9868-b94a19fa71a3`, description: "Slow-braised chicken tinga, pepper jack queso, rice, pinto beans, pico de gallo, avocado salsa." },
      { id: 18, name: "EL GRANDE", price: "$21.50", image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-el-grande_bcd3632e-f4d2-4c33-bbce-a4c7e6e13add`, description: "Carne Asada, Chicken Tinga, rice and beans, sour cream, guacamole, pepper jack queso, salsa verde." },
      { id: 19, name: "Lunch Bean and Cheese", price: "$11.95", image: "https://images.unsplash.com/photo-1562158074-9543be988388?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-lunch-bean-and-cheese_cb76c513-7983-428a-b9fa-28902b633b73`, description: "Pinto Beans, pepperjack or cheddar queso wrap." },
      { id: 20, name: "Tres Tacos (Lunch)", price: "$13.95", image: "https://images.unsplash.com/photo-1512838243191-e81e8f2430bc?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-tres-tacos-lunch_05d43ed6-b87f-4555-9b9d-3a942cceb2ca`, description: "3 Soft corn tortilla, your choice of protein, rice and beans, pico de gallo, and guacamole." },
      { id: 21, name: "Agoura Loaded Nachos", price: "$14.95", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-chips-queso_ef46924e-dbed-4395-8854-3e91122be265`, description: "Choice of protein, pepper jack queso, jalapenos, pico gallo, guacamole, sour cream." }
    ]
  },
  "Kids": {
    description: "Smaller portions, same big flavor! Perfect for our younger Frankie's fans.",
    items: [
      { id: 22, name: "Kids Bacon Egg Cheese Burrito", price: "$10.95", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-kids-bacon-egg-and-cheese-burrito_2bd8098b-784d-487c-9a18-c1a01e58bd1a`, description: "Mini flour tortilla, eggs, bacon and shredded cheddar cheese." },
      { id: 23, name: "Kids Sausage Egg Cheese Burrito", price: "$10.95", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-kids-sausage-egg-and-cheese-burrito_69ad3acc-5826-4a12-aa89-0e081682e817`, description: "Cage-free scrambled eggs, brown butter sausage, cheddar cheese." },
      { id: 24, name: "Kids Breakfast Sausage Quesadilla", price: "$10.95", image: "https://images.unsplash.com/photo-1562158074-9543be988388?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-kids-breakfast-sausage-quesadilla_99d5e548-ba0d-4ba2-a9d3-0d3d8184e332`, description: "Cage-free eggs, house brown butter sausage, and cheddar cheese." }
    ]
  },
  "Drinks": {
    description: "Made fresh in-house with the brightest ingredients. Simple, vibrant, and refreshingly real. Never Faked.",
    items: [
      { id: 28, name: "Pineapple Mango Fresca", price: "$7.50", image: "https://images.unsplash.com/photo-1481671703460-040cb8a2d909?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-pineapple-mango-fresca_ef4ebcbf-55e8-4476-b1cd-fd237aeebceb`, description: "Tropical pineapple and sweet mango infusion." },
      { id: 29, name: "Fresh Orange Juice", price: "$6.00", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-fresh-orange-juice_9033c724-06fa-4727-83c5-965953ae539d`, description: "Squeezed daily from the best local oranges." },
      { id: 30, name: "Fresh Lemonade", price: "$6.00", image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-fresh-lemonade_8a0cf52a-01ef-45cc-a98d-9c8097411a28`, description: "Zesty, sweet, and perfectly balanced fresh lemonade." },
      { id: 31, name: "Black Iced Tea", price: "$5.00", image: "https://images.unsplash.com/photo-1513558161293-cdaf7659a992?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-black-iced-tea_796d8e8e-b2bd-482d-834d-281ebea7247a`, description: "Icy cold, unsweetened premium black tea." }
    ]
  },
  "Desserts": {
    description: "Sweet treats to end your Frankie's experience on a high note.",
    items: [
      { id: 34, name: "House-Made Churros", price: "$4.50", image: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-house-made-churros_b496924e-dbed-4395-8854-3e91122be265`, description: "Crispy on the outside, soft inside, tossed in cinnamon sugar." },
      { id: 35, name: "Chocolate Chip Cookie", price: "$4.50", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-chocolate-chip-cookie_269e801c-6d2c-473d-82d3-9f5b61ecb7f7`, description: "Gooey, buttery, and packed with premium chocolate." },
      { id: 36, name: "Raspberry Lemon Cookie", price: "$5.00", image: "https://images.unsplash.com/photo-1603532648955-0393e01c8a64?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-raspberry-lemon-cookie_e03bc5e8-c82d-4484-a1bb-cee62e629dd0`, description: "Tart raspberry meets bright citrus in this soft-baked favorite." },
      { id: 37, name: "Strawberry Cheesecake Cookie", price: "$6.00", image: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-strawberry-cheesecake-cookie_2c57eebc-46a7-445a-880b-08014c8bbf79`, description: "Decadent cookie with a creamy cheesecake center and strawberry swirls." },
      { id: 38, name: "Cowgirl Cookie", price: "$5.00", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-cowgirl-cookie_964ecbfa-1a25-4db5-ab6c-60cfa0cd4d94`, description: "Loaded with oats, chocolate, and salty crunch - a true classic." },
      { id: 39, name: "Maple Pecan Cinnamon Roll", price: "$8.50", image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-maple-pecan-cinnamon-roll_5619779c-6a9f-43d4-a3d2-d95d858114d2`, description: "Giant, fluffy cinnamon roll topped with maple glaze and toasted pecans." }
    ]
  },
  "Sides": {
    description: "The perfect accompaniments fried in decadent beef tallow for ultimate crunch.",
    items: [
      { id: 40, name: "Cracked Tots", price: "$6.50", image: "https://images.unsplash.com/photo-1573016608964-b49e66ec3692?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-chips_94101e18-687f-474c-8e99-42b4d8123bb0`, description: "Perfectly crisp, dangerously good. Cooked in decadent beef tallow." },
      { id: 41, name: "Loaded Cracked Tots", price: "$15.00", image: "https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-chips-queso_ef46924e-dbed-4395-8854-3e91122be265`, description: "Infamous tots fried in beef tallow, piled with protein and queso." },
      { id: 42, name: "Chips & Queso", price: "$6.00", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-chips-queso_ef46924e-dbed-4395-8854-3e91122be265`, description: "House chips with a side of our velvety, melty pepper jack queso." },
      { id: 43, name: "Chips & Salsa", price: "$4.50", image: "https://images.unsplash.com/photo-1581447100595-3a811abc1930?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-chips-salsa_3f345c26-6cd6-473d-9d46-a4c3f8f91265`, description: "Crispy house-made chips served with your choice of signature house salsa." }
    ]
  },
  "Catering": {
    description: "WE MUST HAVE 48 HOURS ADVANCE NOTICE. Guaranteed to be the talk of the town!",
    items: [
      { id: 45, name: "Fiesta Pack", price: "$150.00", image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-fiesta-pack_3a1206b0-71d7-4227-a7ff-c52c7b7b8c9c`, description: "Feeds up to 10 people. Mix and match any of our starter burritos." },
      { id: 46, name: "Premium Pack", price: "$175.00", image: "https://images.unsplash.com/photo-1512838243191-e81e8f2430bc?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-premium-pack_b6ef22ad-92c5-4eb8-beec-2066b9608c75`, description: "Feeds up to 10 people. Mix and match burritos + large chips and guacamole." },
      { id: 47, name: "Premier Pack", price: "$200.00", image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800", orderLink: `${ORDER_BASE_URL}/item-premier-pack_4f3cef15-9df7-4fec-b237-9a941914eafd`, description: "The ultimate selection! 10 burritos, chips, 2 salsas, large guacamole, and queso." }
    ]
  }
};

const AgouraHillsMenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderGrid = (items) => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
      gap: '40px' 
    }}>
      {items.map(item => (
        <a 
          key={item.id} 
          href={item.orderLink || ORDER_BASE_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="menu-card" 
          style={{ 
            display: 'flex', 
            flexDirection: 'column',
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
            position: 'relative'
          }}
        >
          <div style={{
            width: '100%',
            aspectRatio: '1/1',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '20px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
            position: 'relative'
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
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
            {/* Order Now Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0,0,0,0.8)',
              color: '#fff',
              padding: '8px 20px',
              borderRadius: '30px',
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              pointerEvents: 'none'
            }} className="order-overlay">
              Order Now
            </div>
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
        </a>
      ))}
      <style>{`
        .menu-card:hover .order-overlay {
          opacity: 1;
        }
      `}</style>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
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
        <div className="menu-header-container" style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '0 40px',
          gap: '20px'
        }}>
          {/* Categories */}
          <nav style={{ 
            display: 'flex', 
            gap: '30px', 
            overflowX: 'auto', 
            paddingBottom: '15px', 
            flex: 1,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }} className="category-nav">
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
          <div className="search-container" style={{ position: 'relative', marginBottom: '15px' }}>
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
                backgroundColor: '#f9f9f9',
                boxSizing: 'border-box'
              }}
            />
            <svg style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .menu-header-container {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 0 20px !important;
            gap: 10px !important;
          }
          .category-nav {
            width: 100%;
            padding-bottom: 5px !important;
          }
          .search-container {
            width: 100%;
          }
          .search-container input {
            width: 100% !important;
          }
          .category-nav::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>

      {/* Hero Content Section */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 40px' }} className="menu-grid-container">
        {CATEGORIES.filter(c => c !== "All").map(category => {
          if (activeCategory !== "All" && activeCategory !== category) return null;

          const data = MENU_DATA[category];
          const filteredItems = data.items.filter(item => 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (searchQuery && filteredItems.length === 0) return null;

          return (
            <div key={category} style={{ marginBottom: '80px' }}>
              <h2 style={{ 
                fontFamily: '"Montserrat", sans-serif', 
                fontSize: 'clamp(22px, 4vw, 28px)', 
                fontWeight: 700, 
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {category}
              </h2>
              <p style={{ 
                fontFamily: '"Montserrat", sans-serif', 
                fontSize: '15px', 
                color: '#333', 
                lineHeight: '1.6', 
                maxWidth: '900px',
                marginBottom: '40px'
              }}>
                {data.description}
              </p>
              {renderGrid(filteredItems)}
            </div>
          );
        })}

        {/* Global Empty State */}
        {searchQuery && CATEGORIES.filter(c => (activeCategory === "All" || activeCategory === c)).every(c => (MENU_DATA[c]?.items || []).filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()) || i.description.toLowerCase().includes(searchQuery.toLowerCase())).length === 0) && (
          <div style={{ padding: '60px 0', color: '#999', fontStyle: 'italic', textAlign: 'center' }}>
            <p>No items found matching your search.</p>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .menu-grid-container {
            padding: 40px 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AgouraHillsMenuPage;
