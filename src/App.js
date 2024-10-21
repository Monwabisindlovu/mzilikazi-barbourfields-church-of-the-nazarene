import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Mission from './components/Mission';
import Vision from './components/Vision';
import Leadership from './components/Leadership';
import Media from './components/Media';
import UpcomingEvents from './components/UpcomingEvents';
import ContactUs from './components/ContactUs';
import Partnership from './components/Partnership'; // Corrected import

function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1024px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' });

  return (
    <Router>
      <div className={`App ${isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'}`}>
        {/* Header Section with Logo */}
        <header className="App-header">
          <img
            src="https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/nazalog1.jpg?raw=true"
            alt="Church Logo"
            className="App-logo"
          />
          <h1 className="App-title">Mzilikazi/Barbourfields Church of the Nazarene</h1>
          <p className="gold-text">Holiness Unto The Lord!</p>
        </header>
        
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/media" element={<Media />} />
          <Route path="/upcoming-events" element={<UpcomingEvents />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/Partnership" element={<Partnership />} /> {/* Corrected path */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
