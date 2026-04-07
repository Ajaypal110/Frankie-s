import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Hero2 from './components/Hero2';
import SecretSauce from './components/SecretSauce';
import TableTalk from './components/TableTalk';
import ImageGrid from './components/ImageGrid';
import FollowUs from './components/FollowUs';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';
import LocationsPage from './pages/LocationsPage';
import AgouraHillsMenuPage from './pages/AgouraHillsMenuPage';
import PressPage from './pages/PressPage';
import AgouraHillsPage from './pages/AgouraHillsPage';

const WP_API_URL = 'http://localhost:8884/wp-json/wp/v2';

function HomePage() {
  const [pageData, setPageData] = useState(null);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${WP_API_URL}/pages?slug=home&_fields=id,title,acf,meta`)
      .then(res => res.json())
      .then(data => { if (data && data.length > 0) setPageData(data[0]); })
      .catch(() => {});

    fetch(`${WP_API_URL}/testimonial?_fields=id,title,content`)
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setTestimonials(data); })
      .catch(() => {});
  }, []);

  return (
    <>
      <Hero data={pageData} />
      <SecretSauce data={pageData} />
      <div style={{ position: 'relative' }}>
        <Hero2 />
        <TableTalk items={testimonials} />
      </div>
      <ImageGrid />
    </>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/agourahillsmenu" element={<AgouraHillsMenuPage location="Agoura Hills" />} />
          <Route path="/press" element={<PressPage />} />
          <Route path="/agoura" element={<AgouraHillsPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
