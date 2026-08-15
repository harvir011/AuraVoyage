import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCompass, FaHome, FaSearch } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0C1A2E 0%, #0F4C81 50%, #071122 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative glow orbs */}
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '20%', left: '10%',
          width: '350px', height: '350px',
          background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)', pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ x: [0, -30, 20, 0], y: [0, 25, -15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: '15%', right: '8%',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(255,183,3,0.08) 0%, transparent 70%)',
          filter: 'blur(50px)', pointerEvents: 'none',
        }}
      />

      <motion.div
        className="text-center"
        style={{ maxWidth: '580px', position: 'relative', zIndex: 1 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Icon */}
        <motion.div
          style={{
            width: '90px', height: '90px',
            background: 'linear-gradient(135deg, rgba(255,183,3,0.2), rgba(244,162,97,0.2))',
            border: '2px solid rgba(255,183,3,0.3)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 2rem',
          }}
          animate={{ rotate: [0, 15, -10, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <FaCompass size={40} style={{ color: '#FFB703' }} />
        </motion.div>

        {/* 404 number */}
        <motion.div
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(5rem, 15vw, 9rem)',
            fontWeight: 700,
            lineHeight: 1,
            background: 'linear-gradient(135deg, #FFB703, #F4A261)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem',
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
        >
          404
        </motion.div>

        {/* Handwritten accent */}
        <div style={{
          fontFamily: 'Caveat, cursive',
          fontSize: '1.4rem', color: 'rgba(244,162,97,0.8)',
          marginBottom: '1rem',
        }}>
          off the beaten path
        </div>

        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
          fontWeight: 600, color: '#ffffff',
          marginBottom: '1.2rem',
        }}>
          Page Not Found
        </h1>
        <p style={{
          fontFamily: 'Manrope', fontSize: '1rem', fontWeight: 300,
          color: 'rgba(255,255,255,0.6)',
          maxWidth: '440px', margin: '0 auto 3rem', lineHeight: 1.75,
        }}>
          The page or destination route you're looking for has been moved, renamed, or doesn't exist in our global catalog.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/"
              className="btn-accent-brand d-inline-flex align-items-center gap-2"
              style={{ textDecoration: 'none', padding: '1rem 2rem' }}
            >
              <FaHome />
              <span>Return to Homepage</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/destinations"
              className="btn-outline-light-brand d-inline-flex align-items-center gap-2"
              style={{ textDecoration: 'none', padding: '1rem 2rem' }}
            >
              <FaSearch />
              <span>Explore Destinations</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
