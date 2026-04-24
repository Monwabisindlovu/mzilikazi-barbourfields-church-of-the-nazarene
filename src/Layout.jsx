import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, Shield } from 'lucide-react';
import { Button } from './components/ui/button';

export default function Layout({ children }) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  /* NEW hidden triple-click admin access */
  const [adminTapCount, setAdminTapCount] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const handleAdminClick = () => {
    if (isAdmin) {
      navigate('/admin');
    } else {
      navigate('/login');
    }
  };

  /* ================= SCROLL ================= */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* CLOSE MOBILE MENU ON ROUTE CHANGE */
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  /* NEW triple-click hidden admin trigger */
  useEffect(() => {
    if (!adminTapCount) return;

    if (adminTapCount >= 3) {
      setAdminTapCount(0);
      handleAdminClick();
      return;
    }

    const timer = setTimeout(() => {
      setAdminTapCount(0);
    }, 1500);

    return () => clearTimeout(timer);
  }, [adminTapCount]);

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

  const isActive = path => {
    const currentPath = location.pathname;
    return currentPath === path || currentPath === path + '/';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ================= HEADER ================= */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-black/25 backdrop-blur-sm'}
        `}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3 min-w-0">
              <img
                src="/images/logo.jpg"
                alt="Church Logo"
                className="
                  w-10 h-10
                  sm:w-12 sm:h-12
                  rounded-full
                  object-cover
                  border-2 border-amber-400
                  shrink-0
                "
              />

              <div className="leading-tight min-w-0">
                <h1
                  className={`
                    font-bold
                    text-[13px]
                    sm:text-lg
                    truncate
                    ${isScrolled ? 'text-slate-900' : 'text-white'}
                  `}
                >
                  Mzilikazi Church
                </h1>

                <p
                  className={`
                    text-[10px]
                    sm:text-xs
                    truncate
                    ${isScrolled ? 'text-amber-600' : 'text-amber-300'}
                  `}
                >
                  of the Nazarene
                </p>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    px-3 py-2 rounded-xl text-sm font-medium transition-all
                    ${
                      isActive(link.path)
                        ? isScrolled
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-white/20 text-white'
                        : isScrolled
                          ? 'text-slate-700 hover:bg-amber-50 hover:text-amber-600'
                          : 'text-white/90 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}

              {isAdmin && (
                <button
                  onClick={handleAdminClick}
                  className="ml-2 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-xl text-sm font-medium flex items-center gap-1"
                >
                  <Shield className="w-4 h-4" />
                  Admin
                </button>
              )}
            </nav>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`
                lg:hidden p-2 rounded-xl transition
                ${isScrolled ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'}
              `}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <>
            <div
              onClick={() => setIsMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40"
            />

            <div className="lg:hidden fixed top-24 right-4 z-50">
              <div
                className="
                  w-[250px]
                  rounded-3xl
                  border border-white/30
                  bg-white/70
                  backdrop-blur-2xl
                  shadow-2xl
                  overflow-hidden
                "
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/40">
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-600">
                    Menu
                  </span>

                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-1 rounded-lg hover:bg-white/50 text-slate-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <nav className="p-3 space-y-1">
                  {navLinks.map(link => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`
                        block px-4 py-3 rounded-2xl text-[13px] font-semibold
                        ${
                          isActive(link.path)
                            ? 'bg-amber-100 text-amber-700'
                            : 'text-slate-700 hover:bg-white/60 hover:text-amber-600'
                        }
                      `}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {isAdmin && (
                    <button
                      onClick={handleAdminClick}
                      className="
                        mt-2 w-full px-4 py-3 rounded-2xl
                        bg-amber-500 hover:bg-amber-600
                        text-slate-900 font-semibold
                        flex items-center gap-2
                      "
                    >
                      <Shield className="w-4 h-4" />
                      Admin Dashboard
                    </button>
                  )}
                </nav>
              </div>
            </div>
          </>
        )}
      </header>

      {/* MAIN */}
      <main className="pt-20">{children}</main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h4 className="font-semibold mb-4">About</h4>

              <p className="text-slate-400 text-sm leading-relaxed">
                The Church of the Nazarene is a Protestant Christian church in the Wesleyan-Holiness
                tradition serving the community through faith, discipleship and mission.
              </p>
            </div>

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

            <div>
              <h4 className="font-semibold mb-4">Church Address</h4>

              <p className="text-slate-400 text-sm">
                41396 Barbourfields
                <br />
                Bulawayo, Zimbabwe
              </p>
            </div>
          </div>

          {/* Hidden Triple Click Admin */}
          <div className="border-t border-slate-800 mt-12 pt-8 flex justify-center">
            <button
              onClick={() => setAdminTapCount(prev => prev + 1)}
              className="
                text-sm
                text-slate-500
                hover:text-slate-400
                transition-colors
                tracking-wide
                select-none
                cursor-pointer
              "
              aria-label="Church Copyright"
            >
              © {new Date().getFullYear()} Mzilikazi Church
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
