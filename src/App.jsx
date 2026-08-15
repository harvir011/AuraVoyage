import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import DestinationDetails from './pages/DestinationDetails';
import Wishlist from './pages/Wishlist';
import WorldExplorer from './pages/WorldExplorer';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import CustomCursor from './components/CustomCursor';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';
import { FaCalendarCheck, FaCheckCircle, FaShieldAlt, FaTimes } from 'react-icons/fa';
import './App.css';

/* ── Scroll to top on route change ── */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/* ── Animated Route Wrapper ── */
const AnimatedRoutes = ({ onOpenBookingModal }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home onOpenBookingModal={onOpenBookingModal} />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:code" element={<DestinationDetails onOpenBookingModal={onOpenBookingModal} />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/world-explorer" element={<WorldExplorer />} />
          <Route path="/about" element={<About onOpenBookingModal={() => onOpenBookingModal('')} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

/* ─────────────────── Main App ─────────────────── */
function App() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [targetDestination, setTargetDestination] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2 Guests',
    date: '',
    specialNotes: '',
  });

  const handleOpenModal = (destinationName = '') => {
    setTargetDestination(destinationName || 'Your Dream Destination');
    setShowBookingModal(true);
    setBookingSubmitted(false);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
    setBookingSubmitted(false);
    document.body.style.overflow = '';
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  /* Shared form input style */
  const inputStyle = {
    width: '100%',
    border: '1.5px solid var(--border-light)',
    borderRadius: '10px',
    padding: '0.8rem 1rem',
    fontFamily: 'Manrope, sans-serif',
    fontSize: '0.9rem',
    color: 'var(--text-dark)',
    background: 'var(--bg-primary)',
    outline: 'none',
  };

  return (
    <ThemeProvider>
      <WishlistProvider>
        <Router>
          <ScrollToTop />
          <CustomCursor />

          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar onOpenBookingModal={() => handleOpenModal('')} />

            <main style={{ flex: 1 }}>
              <AnimatedRoutes onOpenBookingModal={handleOpenModal} />
            </main>

            <Footer />

        {/* ══════════ Global Booking Modal ══════════ */}
        <AnimatePresence>
          {showBookingModal && (
            <>
              {/* Backdrop */}
              <motion.div
                style={{
                  position: 'fixed', inset: 0, zIndex: 1060,
                  background: 'rgba(7, 17, 31, 0.82)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseModal}
              />

              {/* Modal Panel */}
              <div style={{
                position: 'fixed', inset: 0, zIndex: 1070,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '1rem',
                overflowY: 'auto',
              }}>
                <motion.div
                  style={{
                    background: 'var(--bg-white)',
                    borderRadius: 'var(--radius-xl)',
                    width: '100%',
                    maxWidth: '640px',
                    overflow: 'hidden',
                    boxShadow: '0 30px 80px rgba(12, 26, 46, 0.4)',
                    position: 'relative',
                  }}
                  initial={{ opacity: 0, scale: 0.92, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 30 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div style={{
                    background: 'linear-gradient(160deg, #0C1A2E 0%, #0F4C81 60%, #1a3a6e 100%)',
                    padding: '2rem 2rem 1.8rem',
                    position: 'relative',
                  }}>
                    {/* Close button */}
                    <motion.button
                      onClick={handleCloseModal}
                      aria-label="Close booking modal"
                      style={{
                        position: 'absolute', top: '1.2rem', right: '1.2rem',
                        width: '36px', height: '36px',
                        background: 'rgba(255,255,255,0.12)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', cursor: 'pointer',
                      }}
                      whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.22)' }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTimes size={14} />
                    </motion.button>

                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      background: 'rgba(255,183,3,0.18)', border: '1px solid rgba(255,183,3,0.3)',
                      borderRadius: '100px', padding: '0.3rem 0.9rem',
                      color: '#FFD166', fontFamily: 'Manrope', fontSize: '0.72rem',
                      fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                      marginBottom: '0.8rem',
                    }}>
                      Bespoke Concierge
                    </div>
                    <h2 style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '1.9rem', fontWeight: 700,
                      color: '#ffffff', margin: 0, lineHeight: 1.1,
                    }}>
                      Book Your Private Expedition
                    </h2>
                  </div>

                  {/* Modal Body */}
                  <div style={{ padding: '2rem' }}>
                    {bookingSubmitted ? (
                      <motion.div
                        className="text-center"
                        style={{ padding: '2rem 1rem' }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                        >
                          <FaCheckCircle size={64} style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }} />
                        </motion.div>
                        <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.7rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '0.8rem' }}>
                          Reservation Request Received!
                        </h4>
                        <p style={{ fontFamily: 'Manrope', fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '380px', margin: '0 auto 2rem', lineHeight: 1.75 }}>
                          Thank you, <strong style={{ color: 'var(--primary)' }}>{bookingData.name || 'Valued Traveler'}</strong>. Your private tour request for <strong style={{ color: 'var(--primary)' }}>{targetDestination}</strong> has been assigned to our senior concierge team.
                        </p>

                        {/* Summary pill */}
                        <div style={{
                          background: 'var(--bg-blue-tint)',
                          border: '1px solid var(--border-light)',
                          borderRadius: 'var(--radius-md)',
                          padding: '1.2rem',
                          maxWidth: '380px', margin: '0 auto 2rem',
                          textAlign: 'left',
                        }}>
                          {[
                            { label: 'Destination', value: targetDestination },
                            { label: 'Group Size', value: bookingData.guests },
                            { label: 'Preferred Date', value: bookingData.date || 'Flexible' },
                          ].map(({ label, value }, i) => (
                            <div key={i} style={{
                              display: 'flex', justifyContent: 'space-between',
                              paddingBottom: i < 2 ? '0.65rem' : 0,
                              marginBottom: i < 2 ? '0.65rem' : 0,
                              borderBottom: i < 2 ? '1px solid var(--border-light)' : 'none',
                              fontFamily: 'Manrope', fontSize: '0.84rem',
                            }}>
                              <span style={{ color: 'var(--text-muted)' }}>{label}:</span>
                              <strong style={{ color: 'var(--text-dark)' }}>{value}</strong>
                            </div>
                          ))}
                        </div>

                        <motion.button
                          className="btn-primary-brand"
                          onClick={handleCloseModal}
                          style={{ padding: '0.9rem 2.5rem' }}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Done
                        </motion.button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleBookingSubmit}>
                        {/* Destination info banner */}
                        <div style={{
                          background: 'var(--bg-blue-tint)',
                          border: '1px solid var(--border-light)',
                          borderRadius: 'var(--radius-md)',
                          padding: '0.9rem 1.1rem',
                          marginBottom: '1.5rem',
                          display: 'flex', alignItems: 'center', gap: '0.6rem',
                          fontFamily: 'Manrope', fontSize: '0.86rem',
                          color: 'var(--text-body)',
                        }}>
                          <FaShieldAlt style={{ color: 'var(--primary)', flexShrink: 0 }} />
                          <span>Reserving: <strong style={{ color: 'var(--primary)' }}>{targetDestination}</strong> · Zero deposit required for initial consultation.</span>
                        </div>

                        <div className="row g-3">
                          <div className="col-md-6">
                            <label style={{ fontFamily: 'Manrope', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dark)', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              Full Name *
                            </label>
                            <input
                              type="text" required placeholder="e.g. Eleanor Vance"
                              value={bookingData.name}
                              onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                              style={inputStyle}
                              onFocus={(e) => { e.target.style.borderColor = 'var(--secondary)'; e.target.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.1)'; }}
                              onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
                            />
                          </div>
                          <div className="col-md-6">
                            <label style={{ fontFamily: 'Manrope', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dark)', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              Email Address *
                            </label>
                            <input
                              type="email" required placeholder="eleanor@example.com"
                              value={bookingData.email}
                              onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                              style={inputStyle}
                              onFocus={(e) => { e.target.style.borderColor = 'var(--secondary)'; e.target.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.1)'; }}
                              onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
                            />
                          </div>

                          <div className="col-md-4">
                            <label style={{ fontFamily: 'Manrope', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dark)', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              Phone Number *
                            </label>
                            <input
                              type="tel" required placeholder="+1 (555) 000-0000"
                              value={bookingData.phone}
                              onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                              style={inputStyle}
                              onFocus={(e) => { e.target.style.borderColor = 'var(--secondary)'; e.target.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.1)'; }}
                              onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
                            />
                          </div>

                          <div className="col-md-4">
                            <label style={{ fontFamily: 'Manrope', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dark)', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              Party Size
                            </label>
                            <select
                              value={bookingData.guests}
                              onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })}
                              style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }}
                              onFocus={(e) => { e.target.style.borderColor = 'var(--secondary)'; e.target.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.1)'; }}
                              onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
                            >
                              <option value="Solo Traveler">1 Solo Traveler</option>
                              <option value="2 Guests">2 Guests (Couple)</option>
                              <option value="3-5 Family">3–5 Family / Friends</option>
                              <option value="6+ Private Charter">6+ Private Charter</option>
                            </select>
                          </div>

                          <div className="col-md-4">
                            <label style={{ fontFamily: 'Manrope', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dark)', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              Start Date
                            </label>
                            <input
                              type="date"
                              value={bookingData.date}
                              onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                              style={inputStyle}
                              onFocus={(e) => { e.target.style.borderColor = 'var(--secondary)'; e.target.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.1)'; }}
                              onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
                            />
                          </div>

                          <div className="col-12">
                            <label style={{ fontFamily: 'Manrope', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dark)', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              Special Preferences
                            </label>
                            <textarea
                              rows="3"
                              placeholder="Flight preferences, dietary requirements, villa style, anniversary celebrations..."
                              value={bookingData.specialNotes}
                              onChange={(e) => setBookingData({ ...bookingData, specialNotes: e.target.value })}
                              style={{ ...inputStyle, borderRadius: '14px', resize: 'vertical', lineHeight: 1.7 }}
                              onFocus={(e) => { e.target.style.borderColor = 'var(--secondary)'; e.target.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.1)'; }}
                              onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
                            />
                          </div>

                          <div className="col-12" style={{ marginTop: '0.5rem' }}>
                            <motion.button
                              type="submit"
                              className="btn-primary-brand w-100 d-flex align-items-center justify-content-center gap-2"
                              style={{ padding: '1rem' }}
                              whileHover={{ scale: 1.02, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <FaCalendarCheck />
                              <span>Confirm Reservation Request</span>
                            </motion.button>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </motion.div>
              </div>
            </>
          )}
          </AnimatePresence>
          </div>
        </Router>
      </WishlistProvider>
    </ThemeProvider>
  );
}

export default App;
