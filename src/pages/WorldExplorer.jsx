import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaGlobe, FaTimes } from 'react-icons/fa';
import WorldMap from '../components/WorldMap';
import CountryPanel from '../components/CountryPanel';
import Toast from '../components/Toast';
import './WorldExplorer.css';

const WorldExplorer = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setAllCountries(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setToastMessage('Error loading countries');
        setShowToast(true);
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  // Handle search
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    if (query.trim().length === 0) {
      setShowResults(false);
      return;
    }

    const results = allCountries.filter((country) => {
      const name = country.name?.common?.toLowerCase() || '';
      const capital = country.capital?.[0]?.toLowerCase() || '';
      const searchTerm = query.toLowerCase();
      return name.includes(searchTerm) || capital.includes(searchTerm);
    });

    setFilteredCountries(results);
    setShowResults(true);
  }, [allCountries]);

  const handleCountrySelect = (country) => {
    console.log('Selected country:', country);
    setSelectedCountry(country);
    setShowResults(false);
    setSearchQuery('');
    const countryName = country.name?.common || 'Country';
    setToastMessage(`Exploring ${countryName}...`);
    setShowToast(true);
  };

  const handleClosePanel = () => {
    setSelectedCountry(null);
  };

  return (
    <div className="world-explorer" style={{ background: 'var(--bg-soft)', minHeight: '100vh' }}>
      {/* ── Header ── */}
      <section className="explorer-header" style={{
        background: 'linear-gradient(160deg, #0C1A2E 0%, #0F4C81 55%, #1a3a6e 100%)',
        padding: '4rem 0 3rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-80px',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(255,183,3,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,183,3,0.15)',
              border: '1px solid rgba(255,183,3,0.3)',
              borderRadius: '100px',
              padding: '0.4rem 1.1rem',
              color: '#FFD166',
              fontFamily: 'Manrope',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1.2rem',
            }}>
              <FaGlobe size={11} />
              <span>Interactive Explorer</span>
            </div>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.5rem, 6vw, 3.8rem)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}>
              Discover the <em style={{ fontStyle: 'italic', color: '#FFD166' }}>World</em>
            </h1>
            <p style={{
              fontFamily: 'Manrope',
              fontSize: '1.05rem',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.75,
            }}>
              Explore countries, dive into rich culture, and plan your next adventure with detailed insights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className="container" style={{ padding: '2rem 1rem', maxWidth: '100%' }}>
        {/* Search Bar */}
        <motion.div
          className="glass-card"
          style={{ padding: '1.5rem 2rem', marginBottom: '2rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div style={{ position: 'relative' }}>
            <FaSearch style={{
              position: 'absolute',
              left: '1.2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--primary)',
              fontSize: '1rem',
            }} />
            <input
              type="text"
              placeholder="Search countries or capitals..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                width: '100%',
                border: '1.5px solid var(--border-light)',
                borderRadius: '100px',
                padding: '1rem 1rem 1rem 3rem',
                fontFamily: 'Manrope',
                fontSize: '0.95rem',
                color: 'var(--text-dark)',
                background: 'var(--bg-white)',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--secondary)';
                e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border-light)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Search Results */}
          <AnimatePresence>
            {showResults && filteredCountries.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 0.5rem)',
                  left: '2rem',
                  right: '2rem',
                  background: 'var(--bg-white)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-lg)',
                  maxHeight: '400px',
                  overflowY: 'auto',
                  zIndex: 100,
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                {filteredCountries.slice(0, 10).map((country, idx) => (
                  <motion.button
                    key={country.cca3}
                    onClick={() => handleCountrySelect(country)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    style={{
                      width: '100%',
                      padding: '1rem 1.2rem',
                      border: 'none',
                      borderBottom: idx < filteredCountries.slice(0, 10).length - 1 ? '1px solid var(--border-light)' : 'none',
                      background: 'transparent',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--bg-blue-tint)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>
                      {country.flags?.svg ? (
                        <img
                          src={country.flags.svg}
                          alt={country.name.common}
                          style={{ width: '32px', height: '24px', objectFit: 'cover', borderRadius: '4px' }}
                        />
                      ) : (
                        '🌍'
                      )}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-dark)' }}>
                        {country.name.common}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {country.capital?.[0] && `Capital: ${country.capital[0]}`}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Map and Panel Container */}
        <motion.div
          style={{
            position: 'relative',
            height: '700px',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-card)',
            background: 'var(--bg-white)',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {!loading ? (
            <WorldMap selectedCountry={selectedCountry} onCountrySelect={handleCountrySelect} />
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              background: 'var(--bg-white)',
              color: 'var(--text-muted)',
            }}>
              <p>Loading map...</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Country Panel */}
      <AnimatePresence>
        {selectedCountry && (
          <CountryPanel country={selectedCountry} onClose={handleClosePanel} />
        )}
      </AnimatePresence>

      {/* Toast */}
      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default WorldExplorer;
