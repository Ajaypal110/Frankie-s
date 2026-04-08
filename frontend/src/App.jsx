import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from './config';
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

function HomePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_BASE_URL}/frankies/v1/home?t=${new Date().getTime()}`)
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Could not fetch home data", err));
  }, []);

  if (!data) return null;

  return (
    <>
      <Hero data={data} />
      <SecretSauce data={data} />
      <div style={{ position: 'relative' }}>
        <Hero2 data={data} />
        <TableTalk data={data} />
      </div>
      <ImageGrid data={data} />
    </>
  );
}

function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get('redirect');

    if (!redirectPath) {
      return;
    }

    window.history.replaceState({}, '', redirectPath);
  }, []);

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
