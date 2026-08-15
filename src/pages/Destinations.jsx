import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DestinationCard from '../components/DestinationCard';
import SearchBar from '../components/SearchBar';
import RegionFilter from '../components/RegionFilter';
import Loader from '../components/Loader';
import { fetchAllCountries } from '../services/countriesApi';
import { FaGlobe, FaSortAmountDown, FaRedo } from 'react-icons/fa';

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

const Destinations = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [visibleCount, setVisibleCount] = useState(12);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    const regionParam = params.get('region');
    if (searchParam) setSearchTerm(searchParam);
    if (regionParam) setSelectedRegion(regionParam);
  }, [location.search]);

  useEffect(() => {
    const getCountries = async () => {
      setLoading(true);
      const data = await fetchAllCountries();
      setCountries(data);
      setLoading(false);
    };
    getCountries();
  }, []);

  const filteredCountries = useMemo(() => {
    return countries
      .filter((country) => {
        const countryName = country.name?.common?.toLowerCase() || '';
        const capitalName = Array.isArray(country.capital)
          ? country.capital[0]?.toLowerCase()
          : '';
        const matchesSearch =
          countryName.includes(searchTerm.toLowerCase()) ||
          capitalName.includes(searchTerm.toLowerCase());
        const matchesRegion = selectedRegion
          ? country.region?.toLowerCase() === selectedRegion.toLowerCase()
          : true;
        return matchesSearch && matchesRegion;
      })
      .sort((a, b) => {
        if (sortBy === 'population') return (b.population || 0) - (a.population || 0);
        return (a.name?.common || '').localeCompare(b.name?.common || '');
      });
  }, [countries, searchTerm, selectedRegion, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedRegion('');
    setSortBy('name');
    setVisibleCount(12);
  };

  return (
    <div style={{ background: 'var(--bg-soft)', minHeight: '100vh' }}>
      {/* ── Page Header ── */}
      <section style={{
        background: 'linear-gradient(160deg, #0C1A2E 0%, #0F4C81 55%, #1a3a6e 100%)',
        padding: '5.5rem 0 3.5rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-100px', right: '-80px',
          width: '450px', height: '450px',
          background: 'radial-gradient(circle, rgba(255,183,3,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(255,183,3,0.15)', border: '1px solid rgba(255,183,3,0.3)',
              borderRadius: '100px', padding: '0.4rem 1.1rem',
              color: '#FFD166', fontFamily: 'Manrope', fontSize: '0.78rem',
              fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
              marginBottom: '1.2rem',
            }}>
              <FaGlobe size={11} />
              <span>Global Directory</span>
            </div>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 700, color: '#ffffff',
              lineHeight: 1.1, marginBottom: '1rem',
            }}>
              Explore All <em style={{ fontStyle: 'italic', color: '#FFD166' }}>Destinations</em>
            </h1>
            <p style={{
              fontFamily: 'Manrope', fontSize: '1.05rem', fontWeight: 300,
              color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto',
              lineHeight: 1.75,
            }}>
              Filter through world countries, discover rich cultural capitals, and plan your luxury journey.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container" style={{ padding: '3rem 1rem 5rem' }}>

        {/* ── Filter Bar ── */}
        <motion.div
          className="glass-card"
          style={{ padding: '1.8rem 2rem', marginBottom: '2rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="row g-3 align-items-center">
            <div className="col-lg-6">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={(term) => { setSearchTerm(term); setVisibleCount(12); }}
                placeholder="Search country or capital..."
              />
            </div>
            <div className="col-lg-4 ms-lg-auto">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <FaSortAmountDown style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <select
                  style={{
                    flex: 1, border: '1.5px solid var(--border-light)',
                    borderRadius: '100px', padding: '0.7rem 1.2rem',
                    fontFamily: 'Manrope', fontSize: '0.88rem',
                    color: 'var(--text-dark)', background: 'var(--bg-white)', outline: 'none', cursor: 'pointer',
                  }}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort destinations"
                >
                  <option value="name">Sort by Name (A–Z)</option>
                  <option value="population">Sort by Population (High–Low)</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
            <RegionFilter
              selectedRegion={selectedRegion}
              setSelectedRegion={(region) => { setSelectedRegion(region); setVisibleCount(12); }}
            />
          </div>
        </motion.div>

        {/* ── Results Bar ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '1.8rem', flexWrap: 'wrap', gap: '0.5rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'Manrope', fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.9rem' }}>
            <FaGlobe style={{ color: 'var(--primary)' }} />
            <span>Showing {Math.min(filteredCountries.length, visibleCount)} of {filteredCountries.length} Destinations</span>
            {selectedRegion && (
              <span style={{
                background: 'var(--primary)', color: 'white',
                borderRadius: '100px', padding: '0.2rem 0.8rem',
                fontSize: '0.75rem', fontWeight: 600,
              }}>{selectedRegion}</span>
            )}
          </div>

          {(searchTerm || selectedRegion || sortBy !== 'name') && (
            <button
              onClick={handleResetFilters}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--primary)', fontFamily: 'Manrope', fontSize: '0.85rem',
                fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem',
              }}
            >
              <FaRedo size={11} />
              Reset Filters
            </button>
          )}
        </div>

        {/* ── Content ── */}
        {loading ? (
          <Loader text="Loading global destinations..." />
        ) : filteredCountries.length === 0 ? (
          <motion.div
            className="glass-card text-center"
            style={{ padding: '4rem 2rem' }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{
              width: '80px', height: '80px',
              background: 'var(--bg-blue-tint)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}>
              <FaGlobe style={{ color: 'var(--primary)', fontSize: '2rem' }} />
            </div>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.7rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '0.8rem' }}>
              No Destinations Found
            </h3>
            <p style={{ fontFamily: 'Manrope', color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 2rem', fontSize: '0.9rem' }}>
              We couldn't find any country matching "{searchTerm}" {selectedRegion && `in ${selectedRegion}`}. Try adjusting your search or reset filters.
            </p>
            <button className="btn-primary-brand" onClick={handleResetFilters}>
              Clear Search Filters
            </button>
          </motion.div>
        ) : (
          <AnimatePresence>
            <div className="row g-4">
              {filteredCountries.slice(0, visibleCount).map((country, idx) => (
                <DestinationCard
                  key={country.cca3 || country.name?.common}
                  country={country}
                  index={idx}
                />
              ))}
            </div>

            {visibleCount < filteredCountries.length && (
              <motion.div
                className="text-center"
                style={{ marginTop: '3rem' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  className="btn-outline-brand"
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  style={{ padding: '1rem 3rem', fontSize: '1rem' }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Load More Destinations ({filteredCountries.length - visibleCount} remaining)
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Destinations;
