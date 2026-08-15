import React from 'react';
import { motion } from 'framer-motion';
import { FaGlobeAmericas } from 'react-icons/fa';

const Loader = ({ text = 'Loading...' }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6rem 2rem',
      textAlign: 'center',
    }}>
      {/* Spinning globe */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
        style={{
          width: '64px', height: '64px',
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '1.5rem',
          boxShadow: '0 8px 30px rgba(15, 76, 129, 0.3)',
        }}
      >
        <FaGlobeAmericas size={30} color="white" />
      </motion.div>

      {/* Shimmer dots */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '1.2rem' }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            style={{
              width: '8px', height: '8px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            }}
            animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}
      </div>

      <p style={{
        fontFamily: 'Manrope, sans-serif',
        fontSize: '0.9rem', color: 'var(--text-muted)',
        fontWeight: 500, margin: 0,
      }}>
        {text}
      </p>
    </div>
  );
};

export default Loader;
