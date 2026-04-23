import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, Shield, Lock } from 'lucide-react';
import { Button } from './components/ui/button';
import { createPageUrl } from '@/utils';

export default function Layout({ children }) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  /* ================= SCROLL ================= */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ================= CLOSE MOBILE MENU ================= */
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  /* ================= NAV LINKS ================= */
  const navLinks = [
    { label: 'Home', path: 'Home' },
    { label: 'About Us', path: 'AboutUs' },
    { label: 'Mission', path: 'Mission' },
    { label: 'Vision', path: 'Vision' },
    { label: 'Leadership', path: 'Leadership' },
    { label: 'Media', path: 'Media' },
    { label: 'Events', path: 'UpcomingEvents' },
    { label: 'Contact Us', path: 'ContactUs' },
    { label: 'Partnership', path: 'Partnership' },
  ];

  /* ================= ACTIVE LINK ================= */
  const isActive = path => {
    const currentPath = location.pathname;
    const targetPath = createPageUrl(path);
    return currentPath === targetPath || currentPath === targetPath + '/';
  };

  /* ================= ADMIN HANDLER ================= */
  const handleAdminClick = () => {
    if (isAdmin) {
      navigate('/admin');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ================= HEADER ================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* LOGO */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-3">
              <img
                src="https://raw.githubusercontent.com/Monwabisindlovu/portfolio-landing_page/main/images/nazalog.jpg"
                alt="Church Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-400"
              />
              <div className="hidden sm:block">
                <h1
                  className={`font-bold text-lg leading-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}
                >
                  Mzilikazi Church
                </h1>
                <p className={`text-xs ${isScrolled ? 'text-amber-600' : 'text-amber-300'}`}>
                  of the Nazarene
                </p>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={createPageUrl(link.path)}
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
                <Button
                  size="sm"
                  onClick={handleAdminClick}
                  className="ml-2 bg-amber-500 hover:bg-amber-600 text-slate-900"
                >
                  <Shield className="w-4 h-4 mr-1" /> Admin
                </Button>
              )}
            </nav>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-lg ${isScrolled ? 'text-slate-900' : 'text-white'}`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ================= MOBILE DRAWER ================= */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            {isMenuOpen && (
              <div
                className="lg:hidden fixed inset-0 z-40 bg-black/40"
                onClick={() => setIsMenuOpen(false)}
              />
            )}

            {/* Drawer */}
            <div
              className={`lg:hidden fixed top-0 right-0 h-full z-50 bg-white shadow-2xl border-l border-slate-100 transform transition-transform duration-300 ease-in-out ${
                isMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
              style={{
                width: '30vw',
                minWidth: '160px',
                maxWidth: '240px',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-3 py-4 border-b border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">
                  Menu
                </span>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Links */}
              <nav className="px-2 py-3 space-y-1 overflow-y-auto">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={createPageUrl(link.path)}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-[11px] font-semibold transition-colors leading-tight ${
                      isActive(link.path)
                        ? 'bg-amber-100 text-amber-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-amber-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {isAdmin && (
                  <Link
                    to={createPageUrl('Admin')}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-[11px] font-semibold bg-amber-500 text-slate-900 mt-2"
                  >
                    <Shield className="w-3 h-3 inline mr-1" />
                    Admin
                  </Link>
                )}
              </nav>
            </div>
          </>
        )}
      </header>

      {/* ================= MAIN ================= */}
      <main className="pt-20">{children}</main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="font-bold text-lg mb-2">Mzilikazi Church of the Nazarene</h3>
              <p className="text-slate-400 text-sm">
                Wesleyan-Holiness tradition church serving the community.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link to={createPageUrl('ContactUs')}>Contact</Link>
                </li>
                <li>
                  <Link to={createPageUrl('Partnership')}>Partnership</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Address</h4>
              <p className="text-slate-400 text-sm">
                41396 Barbourfields
                <br />
                Bulawayo, Zimbabwe
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-10 pt-6 text-sm text-slate-500 flex justify-between">
            <span>© {new Date().getFullYear()} Mzilikazi Church</span>

            <button onClick={handleAdminClick} className="flex items-center gap-1">
              {isAdmin ? <Shield className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              Admin
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
