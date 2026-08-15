import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGlobeAmericas, FaSearch, FaCalendarCheck, FaTimes, FaChevronRight, FaHeart, FaSun, FaMoon } from 'react-icons/fa';
import { HiMenuAlt3 } from 'react-icons/hi';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ onOpenBookingModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { wishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsNavOpen(false);
    setShowSearchInput(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/destinations?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchInput(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Explorer', path: '/world-explorer' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // When on home and not scrolled: transparent + light text over dark hero
  const isTransparent = isHome && !scrolled;

  const mobileMenuVariants = {
    closed: { 
      opacity: 0, 
      y: -10, 
      height: 0, 
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } 
    },
    open: {
      opacity: 1, 
      y: 0, 
      height: 'auto',
      transition: { 
        duration: 0.4, 
        ease: [0.16, 1, 0.3, 1], 
        staggerChildren: 0.05, 
        delayChildren: 0.05 
      }
    }
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <header className={`av-header ${scrolled ? 'scrolled' : 'top'} ${isTransparent ? 'transparent' : 'solid'}`}>
      <div className="av-header-container">
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: scrolled ? '72px' : '82px',
          transition: 'min-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {/* ── Brand Logo ── */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <motion.div
              className="av-logo-box"
              whileHover={{ rotate: 10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              <FaGlobeAmericas size={24} color="white" />
            </motion.div>
            <span style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.9rem',
              fontWeight: 700,
              color: isTransparent ? '#ffffff' : 'var(--text-dark)',
              letterSpacing: '-0.01em',
              transition: 'color 0.4s ease',
              lineHeight: 1,
            }}>
              Aura<span style={{ color: isTransparent ? 'var(--accent)' : 'var(--accent-warm)' }}>Voyage</span>
            </span>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <nav className="d-none d-lg-flex align-items-center" style={{ gap: '1.5rem' }}>
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path} 
                className={({ isActive }) => 
                  `nav-link-av ${isActive ? 'active' : ''} ${isTransparent ? 'light' : ''}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* ── Right Actions: Search + Theme + Wishlist + CTA ── */}
          <div className="d-none d-lg-flex align-items-center" style={{ gap: '1rem' }}>
            <AnimatePresence mode="wait">
              {showSearchInput ? (
                <motion.form
                  key="search-form"
                  onSubmit={handleSearchSubmit}
                  style={{ position: 'relative' }}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: '220px' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <input
                    type="text"
                    className="input-brand"
                    style={{ width: '100%', paddingRight: '2.5rem', fontSize: '0.85rem', height: '38px', borderRadius: '8px' }}
                    placeholder="Search destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <button
                    type="submit"
                    style={{ position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    aria-label="Submit Search"
                  >
                    <FaSearch size={13} />
                  </button>
                </motion.form>
              ) : (
                <motion.button
                  key="search-btn"
                  className={`nav-icon-btn ${isTransparent ? 'light' : ''}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowSearchInput(true)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Search"
                >
                  <FaSearch size={16} />
                </motion.button>
              )}
            </AnimatePresence>

            <motion.button
              onClick={toggleTheme}
              className={`nav-icon-btn ${isTransparent ? 'light' : ''}`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Toggle theme"
            >
              <motion.div
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {theme === 'light' ? <FaSun size={16} /> : <FaMoon size={16} />}
              </motion.div>
            </motion.button>

            <Link to="/wishlist" style={{ textDecoration: 'none' }}>
              <motion.button
                className={`nav-icon-btn ${isTransparent ? 'light' : ''}`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Wishlist"
              >
                <FaHeart
                  size={16}
                  style={{
                    fill: wishlist.length > 0 ? 'currentColor' : 'none',
                    stroke: isTransparent ? 'white' : '#ef4444',
                    strokeWidth: wishlist.length > 0 ? 0 : '1.5px',
                  }}
                />
                {wishlist.length > 0 && (
                  <span className="nav-wishlist-badge">
                    {wishlist.length}
                  </span>
                )}
              </motion.button>
            </Link>

            <motion.button
              className="nav-book-btn"
              onClick={onOpenBookingModal}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              <FaCalendarCheck size={14} />
              <span>Book Now</span>
            </motion.button>
          </div>

          {/* ── Mobile Toggle ── */}
          <motion.button
            className="d-lg-none"
            style={{
              background: 'none', border: 'none',
              color: isTransparent ? 'white' : 'var(--text-dark)',
              cursor: 'pointer', padding: '0.5rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onClick={() => setIsNavOpen(!isNavOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isNavOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <FaTimes size={22} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <HiMenuAlt3 size={26} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>

        {/* ── Mobile Menu Drawer ── */}
        <AnimatePresence>
          {isNavOpen && (
            <motion.div
              className="mobile-drawer d-lg-none"
              style={{ overflow: 'hidden', borderTop: '1px solid var(--border-light)', marginLeft: '-2.5rem', marginRight: '-2.5rem', paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div style={{ paddingTop: '1.5rem', paddingBottom: '2rem' }}>
                {navLinks.map((link) => (
                  <motion.div key={link.path} variants={mobileItemVariants}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) => 
                        `mobile-nav-link ${isActive ? 'active' : ''}`
                      }
                      onClick={() => setIsNavOpen(false)}
                    >
                      <span>{link.name}</span>
                      <FaChevronRight size={12} style={{ opacity: 0.5 }} />
                    </NavLink>
                  </motion.div>
                ))}

                <motion.div variants={mobileItemVariants} style={{ paddingTop: '1.25rem', marginTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
                  <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <input
                      type="text"
                      className="input-brand"
                      style={{ flex: 1, fontSize: '0.9rem', height: '44px', borderRadius: '8px' }}
                      placeholder="Search country..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="nav-book-btn" style={{ padding: '0 1.2rem', height: '44px', width: '48px' }} aria-label="Search">
                      <FaSearch size={14} />
                    </button>
                  </form>

                  <NavLink
                    to="/wishlist"
                    className={({ isActive }) => 
                      `mobile-nav-link ${isActive ? 'active' : ''}`
                    }
                    style={{ marginBottom: '1.25rem' }}
                    onClick={() => setIsNavOpen(false)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <FaHeart
                        size={16}
                        style={{
                          fill: wishlist.length > 0 ? '#ef4444' : 'none',
                          color: '#ef4444',
                          stroke: '#ef4444',
                          strokeWidth: wishlist.length > 0 ? 0 : '1.5px',
                        }}
                      />
                      <span>Wishlist</span>
                    </div>
                    {wishlist.length > 0 ? (
                      <span style={{
                        background: '#ef4444',
                        color: 'white',
                        borderRadius: '50%',
                        width: '20px', height: '20px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.7rem', fontWeight: 700,
                      }}>
                        {wishlist.length}
                      </span>
                    ) : (
                      <FaChevronRight size={12} style={{ opacity: 0.5 }} />
                    )}
                  </NavLink>

                  <div
                    onClick={toggleTheme}
                    className="mobile-nav-link"
                    style={{ cursor: 'pointer', marginBottom: '1.5rem' }}
                  >
                    <span>Theme: {theme === 'light' ? 'Light' : 'Dark'}</span>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {theme === 'light' ? <FaSun size={16} /> : <FaMoon size={16} />}
                    </div>
                  </div>

                  <button
                    className="nav-book-btn w-100"
                    style={{ padding: '1rem', fontSize: '0.9rem' }}
                    onClick={() => { setIsNavOpen(false); onOpenBookingModal(); }}
                  >
                    <FaCalendarCheck size={16} />
                    <span>Book Now</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;

