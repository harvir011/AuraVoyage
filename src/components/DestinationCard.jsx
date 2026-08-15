import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaGlobeAmericas, FaUsers, FaArrowRight, FaHeart } from 'react-icons/fa';
import { MdOutlineExplore } from 'react-icons/md';
import { useWishlist } from '../context/WishlistContext';
import Toast from './Toast';

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }
  })
};

const formatPopulation = (pop) => {
  if (!pop) return 'N/A';
  if (pop >= 1_000_000_000) return `${(pop / 1_000_000_000).toFixed(1)}B`;
  if (pop >= 1_000_000) return `${(pop / 1_000_000).toFixed(1)}M`;
  if (pop >= 1_000) return `${(pop / 1_000).toFixed(0)}K`;
  return pop.toLocaleString();
};

const DestinationCard = ({ country, index = 0 }) => {
  const name = country.name?.common || country.name || 'Unknown';
  const capital = country.capital?.[0] || country.capital || 'N/A';
  const region = country.region || 'World';
  const flag = country.flags?.svg || country.flags?.png || country.flag || '';
  const population = country.population;
  const code = country.cca3 || (country.name?.common?.toLowerCase().replace(/\s/g, '-'));

  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted(code)) {
      removeFromWishlist(code);
      setToastMessage('Removed from Wishlist');
    } else {
      addToWishlist(country);
      setToastMessage('Added to Wishlist ❤️');
    }
    setShowToast(true);
  };

  // Destination cover images via Unsplash — keyed by country name
  const coverImages = {
    'france': 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=75',
    'japan': 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=75',
    'italy': 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=75',
    'brazil': 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=75',
    'australia': 'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?w=600&q=75',
    'india': 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=75',
    'canada': 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&q=75',
    'united states': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=75',
    'greece': 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=75',
    'morocco': 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&q=75',
    'thailand': 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=75',
    'peru': 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=75',
    'new zealand': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=75',
    'switzerland': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=75',
    'kenya': 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=600&q=75',
    'maldives': 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=75',
    'norway': 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=600&q=75',
    'china': 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600&q=75',
    'egypt': 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=600&q=75',
    'spain': 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&q=75',
  };

  const lowerName = name.toLowerCase();
  const coverImg = coverImages[lowerName]
    || `https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=75`;

  const wishlisted = isWishlisted(code);

  return (
    <motion.div
      className="col-sm-6 col-lg-4"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20px' }}
      custom={index}
    >
      <motion.div
        className="luxury-card h-100"
        whileHover={{ y: -10 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        style={{ cursor: 'pointer', position: 'relative' }}
      >
        {/* ── Image ── */}
        <Link to={`/destinations/${code}`} style={{ textDecoration: 'none', display: 'block' }}>
          <div
            className="img-zoom-wrap"
            style={{ height: '210px', borderRadius: 0, position: 'relative', overflow: 'hidden' }}
          >
            <img
              src={coverImg}
              alt={`${name} travel destination`}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=75'; }}
            />
            {/* overlay on hover */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(12,26,46,0.65) 0%, transparent 55%)',
            }} />

            {/* Wishlist Heart Button */}
            <motion.button
              onClick={handleWishlistToggle}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: '44px',
                height: '44px',
                background: 'var(--surface)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border-light)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#ef4444',
                boxShadow: 'var(--shadow-soft)',
                zIndex: 10,
              }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <motion.div
                animate={wishlisted ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
              >
                <FaHeart
                  size={18}
                  style={{
                    fill: wishlisted ? '#ef4444' : 'none',
                    stroke: '#ef4444',
                    strokeWidth: wishlisted ? 0 : '2px',
                  }}
                />
              </motion.div>
            </motion.button>

            {/* region badge top-left */}
            <div style={{
              position: 'absolute', top: '1rem', left: '1rem',
              background: 'var(--primary)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '100px',
              padding: '0.3rem 0.85rem',
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              color: 'white',
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.7rem', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>
              <FaGlobeAmericas size={10} />
              <span>{region}</span>
            </div>

            {/* flag bottom-right */}
            {flag && (
              <img
                src={flag}
                alt={`${name} flag`}
                style={{
                  position: 'absolute', bottom: '0.85rem', right: '0.85rem',
                  width: '36px', height: '24px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  border: '1.5px solid rgba(255,255,255,0.5)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }}
              />
            )}
          </div>

          {/* ── Card Body ── */}
          <div style={{ padding: '1.5rem' }}>
            <h3 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.4rem', fontWeight: 600,
              color: 'var(--text-dark)',
              marginBottom: '0.5rem',
              lineHeight: 1.2,
            }}>
              {name}
            </h3>

            <div style={{
              display: 'flex', flexDirection: 'column', gap: '0.35rem',
              marginBottom: '1.2rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <FaMapMarkerAlt style={{ color: 'var(--accent-warm)', fontSize: '0.78rem', flexShrink: 0 }} />
                <span style={{ fontFamily: 'Manrope', fontSize: '0.83rem', color: 'var(--text-muted)' }}>
                  Capital: <strong style={{ color: 'var(--text-body)' }}>{capital}</strong>
                </span>
              </div>
              {population && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <FaUsers style={{ color: 'var(--accent-warm)', fontSize: '0.78rem', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Manrope', fontSize: '0.83rem', color: 'var(--text-muted)' }}>
                    Population: <strong style={{ color: 'var(--text-body)' }}>{formatPopulation(population)}</strong>
                  </span>
                </div>
              )}
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-light)',
            }}>
              <span style={{
                fontFamily: 'Manrope', fontSize: '0.78rem', fontWeight: 600,
                color: 'var(--primary)',
                textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>
                Explore
              </span>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                style={{
                  width: '34px', height: '34px',
                  background: 'var(--bg-blue-tint)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <FaArrowRight style={{ color: 'var(--primary)', fontSize: '0.75rem' }} />
              </motion.div>
            </div>
          </div>
        </Link>

        {showToast && (
          <Toast
            message={toastMessage}
            type="success"
            onClose={() => setShowToast(false)}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default DestinationCard;
