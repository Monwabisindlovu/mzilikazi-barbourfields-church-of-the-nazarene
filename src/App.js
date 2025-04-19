import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Header from './components/Header'; // ✅ Reusable styled header

// Page components
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Mission from './components/Mission';
import Vision from './components/Vision';
import Leadership from './components/Leadership';
import Media from './components/Media';
import UpcomingEvents from './components/UpcomingEvents';
import ContactUs from './components/ContactUs';
import Partnership from './components/Partnership';

function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1024px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' });

  return (
    <Router>
      <div className={`App ${isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'} bg-white min-h-screen`}>
        
        {/* ✅ Single Header - logo, title & navigation */}
        <Header />

        {/* ✅ Page Content */}
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/media" element={<Media />} />
            <Route path="/upcoming-events" element={<UpcomingEvents />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/partnership" element={<Partnership />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
