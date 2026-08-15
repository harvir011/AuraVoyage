import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaGlobeAmericas, FaMapMarkerAlt, FaCompass, FaStar, FaChevronDown, FaHeart } from 'react-icons/fa';
import { MdFlightTakeoff } from 'react-icons/md';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  }
};

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const navigate = useNavigate();

  const handleHeroSearch = (e) => {
    e.preventDefault();
    let url = '/destinations';
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append('search', searchQuery.trim());
    if (selectedRegion) params.append('region', selectedRegion);
    if (params.toString()) url += `?${params.toString()}`;
    navigate(url);
  };

  const trustedStats = [
    { value: '250+', label: 'Destinations' },
    { value: '50K+', label: 'Happy Travelers' },
    { value: '15yr', label: 'Experience' },
  ];

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginTop: '-80px',
        paddingTop: '80px',
      }}
    >
      {/* ── Background Image with cinematic zoom ── */}
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1.02 }}
        transition={{ duration: 14, ease: 'easeOut' }}
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2200&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      />

      {/* ── Multi-layer gradient overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'var(--hero-gradient-overlay)',
      }} />

      {/* ── Decorative floating glow orbs ── */}
      <motion.div
        animate={{ x: [0, 50, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.9, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '20%', right: '5%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(255, 183, 3, 0.12) 0%, transparent 70%)',
          filter: 'blur(40px)', zIndex: 2, pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ x: [0, -40, 25, 0], y: [0, 40, -15, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: '15%', left: '3%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%)',
          filter: 'blur(60px)', zIndex: 2, pointerEvents: 'none',
        }}
      />

      {/* ── Floating trust badge – top right ── */}
      <motion.div
        className="d-none d-lg-flex"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{
          position: 'absolute', top: '30%', right: '4%', zIndex: 5,
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '20px',
          padding: '1rem 1.4rem',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          color: 'white',
        }}
      >
        <div style={{ background: 'rgba(255,183,3,0.2)', borderRadius: '50%', padding: '0.6rem' }}>
          <FaStar style={{ color: '#FFB703', fontSize: '1.3rem' }} />
        </div>
        <div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 700, lineHeight: 1 }}>4.9 / 5</div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.72rem', opacity: 0.65, marginTop: '2px' }}>12,000+ reviews</div>
        </div>
      </motion.div>

      {/* ── Floating "New" badge – left ── */}
      <motion.div
        className="d-none d-lg-flex"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        style={{
          position: 'absolute', top: '42%', left: '3%', zIndex: 5,
          background: 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '16px',
          padding: '0.9rem 1.2rem',
          display: 'flex', flexDirection: 'column', gap: '0.2rem',
          color: 'white',
          minWidth: '160px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaHeart style={{ color: '#F4A261', fontSize: '0.85rem' }} />
          <span style={{ fontSize: '0.7rem', opacity: 0.7, fontFamily: 'Manrope, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Just Loved</span>
        </div>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', fontWeight: 600 }}>Santorini, Greece</div>
        <div style={{ display: 'flex', gap: '2px' }}>
          {[...Array(5)].map((_, i) => <FaStar key={i} style={{ color: '#FFB703', fontSize: '0.7rem' }} />)}
        </div>
      </motion.div>

      {/* ── Hero Content ── */}
      <motion.div
        className="container position-relative py-5"
        style={{ zIndex: 3 }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="row justify-content-center text-center">
          <div className="col-lg-10 col-xl-9">

            {/* Eyebrow badge */}
            <motion.div variants={itemVariants}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                background: 'rgba(255,183,3,0.15)',
                border: '1px solid rgba(255,183,3,0.35)',
                borderRadius: '100px',
                padding: '0.45rem 1.2rem',
                marginBottom: '1.5rem',
                color: '#FFD166',
                fontFamily: 'Manrope, sans-serif',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                <MdFlightTakeoff />
                <span>Bespoke World Tours & Luxury Retreats</span>
              </div>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={itemVariants}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(3.2rem, 7vw, 5.8rem)',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.08,
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em',
              }}
            >
              Discover Your Next{' '}
              <em style={{
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #FFB703 0%, #F4A261 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Adventure
              </em>
            </motion.h1>

            {/* Handwritten accent */}
            <motion.div variants={itemVariants} style={{ marginBottom: '1rem' }}>
              <span style={{
                fontFamily: 'Caveat, cursive',
                fontSize: '1.4rem',
                color: 'rgba(244, 162, 97, 0.9)',
                letterSpacing: '0.02em',
              }}>
                where will you go next?
              </span>
            </motion.div>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                color: 'rgba(255,255,255,0.72)',
                maxWidth: '680px',
                margin: '0 auto 2.5rem',
                lineHeight: 1.75,
                fontWeight: 300,
              }}
            >
              Explore the world's most breathtaking destinations. Tailored itineraries, pristine landscapes, and unmatched luxury stays crafted just for you.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}
            >
              <motion.a
                href="/destinations"
                className="btn-accent-brand d-inline-flex align-items-center gap-2"
                style={{ textDecoration: 'none', padding: '1rem 2.2rem', fontSize: '1rem' }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              >
                <FaCompass />
                <span>Explore Destinations</span>
              </motion.a>

              <motion.a
                href="/about"
                className="btn-outline-light-brand d-inline-flex align-items-center gap-2"
                style={{ textDecoration: 'none', padding: '1rem 2.2rem', fontSize: '1rem' }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              >
                <span>Our Story</span>
              </motion.a>
            </motion.div>

            {/* ── Search Widget ── */}
            <motion.div
              variants={itemVariants}
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '1.5rem',
                maxWidth: '880px',
                margin: '0 auto 3rem',
              }}
            >
              <form onSubmit={handleHeroSearch}>
                <div className="row g-3 align-items-end text-start">
                  <div className="col-md-5">
                    <label style={{ fontFamily: 'Manrope', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      <FaMapMarkerAlt style={{ color: '#FFB703' }} /> Destination
                    </label>
                    <input
                      type="text"
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.12)',
                        border: '1px solid rgba(255,255,255,0.25)',
                        borderRadius: '12px',
                        padding: '0.8rem 1.2rem',
                        color: '#ffffff',
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '0.95rem',
                        outline: 'none',
                      }}
                      placeholder="e.g. France, Japan, Italy..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label style={{ fontFamily: 'Manrope', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      <FaGlobeAmericas style={{ color: '#FFB703' }} /> Region
                    </label>
                    <select
                      style={{
                        width: '100%',
                        background: 'rgba(12,26,46,0.75)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '12px',
                        padding: '0.8rem 1.2rem',
                        color: '#ffffff',
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '0.95rem',
                        outline: 'none',
                        cursor: 'pointer',
                      }}
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                    >
                      <option value="" style={{ background: '#0C1A2E' }}>All Continent Regions</option>
                      <option value="Africa" style={{ background: '#0C1A2E' }}>Africa</option>
                      <option value="Americas" style={{ background: '#0C1A2E' }}>Americas</option>
                      <option value="Asia" style={{ background: '#0C1A2E' }}>Asia</option>
                      <option value="Europe" style={{ background: '#0C1A2E' }}>Europe</option>
                      <option value="Oceania" style={{ background: '#0C1A2E' }}>Oceania</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <motion.button
                      type="submit"
                      className="btn-primary-brand w-100 d-flex align-items-center justify-content-center gap-2"
                      style={{ padding: '0.85rem 1rem' }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <FaSearch />
                      <span>Search</span>
                    </motion.button>
                  </div>
                </div>
              </form>
            </motion.div>

            {/* ── Trust Stats ── */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2.5rem',
              }}
            >
              {trustedStats.map((stat, i) => (
                <div key={i} style={{ textAlign: 'center', color: 'rgba(255,255,255,0.8)' }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.9rem', fontWeight: 700, lineHeight: 1, color: '#FFD166' }}>{stat.value}</div>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.75rem', opacity: 0.65, marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>

          </div>
        </div>

        {/* ── Scroll down indicator ── */}
        <motion.div
          style={{
            position: 'absolute', bottom: '-2rem', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
            color: 'rgba(255,255,255,0.45)',
            cursor: 'pointer',
          }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
          className="d-none d-md-flex"
        >
          <span style={{ fontFamily: 'Manrope', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Scroll</span>
          <FaChevronDown size={13} style={{ color: '#FFB703' }} />
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Hero;
