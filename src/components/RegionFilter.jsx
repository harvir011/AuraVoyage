import React from 'react';
import { motion } from 'framer-motion';

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

const RegionFilter = ({ selectedRegion, setSelectedRegion }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
      <span style={{
        fontFamily: 'Manrope, sans-serif',
        fontSize: '0.78rem', fontWeight: 600,
        color: 'var(--text-muted)',
        textTransform: 'uppercase', letterSpacing: '0.06em',
        marginRight: '0.25rem',
      }}>
        Region:
      </span>

      <motion.button
        onClick={() => setSelectedRegion('')}
        style={{
          background: selectedRegion === '' ? 'linear-gradient(135deg, var(--primary), var(--secondary))' : 'transparent',
          color: selectedRegion === '' ? '#ffffff' : 'var(--text-muted)',
          border: selectedRegion === '' ? 'none' : '1.5px solid var(--border-light)',
          borderRadius: '100px',
          padding: '0.4rem 1rem',
          fontFamily: 'Manrope, sans-serif',
          fontSize: '0.82rem', fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          boxShadow: selectedRegion === '' ? '0 4px 14px rgba(15,76,129,0.25)' : 'none',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        All
      </motion.button>

      {regions.map((region) => {
        const isActive = selectedRegion === region;
        return (
          <motion.button
            key={region}
            onClick={() => setSelectedRegion(region)}
            style={{
              background: isActive ? 'linear-gradient(135deg, var(--primary), var(--secondary))' : 'transparent',
              color: isActive ? '#ffffff' : 'var(--text-muted)',
              border: isActive ? 'none' : '1.5px solid var(--border-light)',
              borderRadius: '100px',
              padding: '0.4rem 1rem',
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.82rem', fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              boxShadow: isActive ? '0 4px 14px rgba(15,76,129,0.25)' : 'none',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {region}
          </motion.button>
        );
      })}
    </div>
  );
};

export default RegionFilter;
