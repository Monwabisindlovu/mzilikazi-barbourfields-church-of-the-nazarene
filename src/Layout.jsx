import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, Shield, Lock } from 'lucide-react';
import { Button } from './components/ui/button';

export default function Layout({ children }) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // ✅ FIXED NAV LINKS (match your routes)
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Mission', path: '/mission' },
    { label: 'Vision', path: '/vision' },
    { label: 'Leadership', path: '/leadership' },
    { label: 'Media', path: '/media' },
    { label: 'Events', path: '/events' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Partnership', path: '/partnership' },
  ];

  // ✅ Active link checker
  const isActive = path => location.pathname === path;

  const handleAdminClick = () => {
    if (isAdmin) {
      navigate('/admin');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg' : 'bg-black/30 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/images/logo.jpg"
                alt="Church Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-400"
              />
              <div className="hidden sm:block">
                <h1
                  className={`font-bold text-lg leading-tight ${
                    isScrolled ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  Mzilikazi Church
                </h1>
                <p className={`text-xs ${isScrolled ? 'text-amber-600' : 'text-amber-300'}`}>
                  of the Nazarene
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? isScrolled
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-white/20 text-white'
                      : isScrolled
                        ? 'text-slate-600 hover:text-amber-600 hover:bg-amber-50'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {isAdmin && (
                <button
                  onClick={handleAdminClick}
                  className="ml-2 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors"
                >
                  <Shield className="w-4 h-4" /> Admin
                </button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-lg ${isScrolled ? 'text-slate-900' : 'text-white'}`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t shadow-xl">
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-amber-100 text-amber-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {isAdmin && (
                <button
                  onClick={handleAdminClick}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium bg-amber-500 text-slate-900 flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" /> Admin Dashboard
                </button>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            {/* About */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://raw.githubusercontent.com/Monwabisindlovu/portfolio-landing_page/main/images/nazalog.jpg"
                  alt="Church Logo"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <h3 className="font-bold text-lg">Mzilikazi Church of the Nazarene</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                The Church of the Nazarene is a Protestant Christian church in the Wesleyan-Holiness
                tradition.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.nazarene.org/manual"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-amber-400"
                  >
                    Church Manual
                  </a>
                </li>
                <li>
                  <Link to="/contact" className="text-slate-400 hover:text-amber-400">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/partnership" className="text-slate-400 hover:text-amber-400">
                    Partnership
                  </Link>
                </li>
              </ul>
            </div>

            {/* Address */}
            <div>
              <h4 className="font-semibold mb-4">Church Address</h4>
              <p className="text-slate-400 text-sm">
                41396 Barbourfields
                <br />
                Bulawayo, Zimbabwe
              </p>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-slate-800 mt-12 pt-8 flex justify-between items-center">
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} Mzilikazi Church</p>

            <button
              type="button"
              onClick={handleAdminClick}
              className={`flex items-center gap-2 text-sm ${
                isAdmin ? 'text-amber-500' : 'text-slate-500'
              }`}
            >
              {isAdmin ? (
                <>
                  <Shield className="w-4 h-4" /> Admin
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" /> Admin Access
                </>
              )}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
