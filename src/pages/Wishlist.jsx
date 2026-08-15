import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaArrowRight, FaTrashAlt, FaGlobe, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import { useWishlist } from '../context/WishlistContext';
import Toast from '../components/Toast';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -25,
    transition: { duration: 0.3 },
  },
};

const formatPopulation = (pop) => {
  if (!pop) return 'N/A';
  if (pop >= 1_000_000_000) return `${(pop / 1_000_000_000).toFixed(1)}B`;
  if (pop >= 1_000_000) return `${(pop / 1_000_000).toFixed(1)}M`;
  if (pop >= 1_000) return `${(pop / 1_000).toFixed(0)}K`;
  return pop.toLocaleString();
};

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

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

  const getCoverImage = (countryName) => {
    const lowerName = countryName.toLowerCase();
    return coverImages[lowerName] || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=75';
  };

  const handleRemove = (code, name) => {
    removeFromWishlist(code);
    setToastMessage(`${name} removed from Wishlist`);
    setShowToast(true);
  };

  const handleClearAll = () => {
    clearWishlist();
    setShowClearConfirm(false);
    setToastMessage('Wishlist cleared');
    setShowToast(true);
  };

  return (
    <div style={{ background: 'var(--bg-soft)', minHeight: '100vh' }}>
      {/* ── Page Header ── */}
      <section style={{
        background: 'linear-gradient(160deg, #0C1A2E 0%, #0F4C81 55%, #1a3a6e 100%)',
        padding: '5.5rem 0 3.5rem',
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
        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '100px',
              padding: '0.4rem 1.1rem',
              color: '#ef4444',
              fontFamily: 'Manrope',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1.2rem',
            }}>
              <FaHeart size={11} style={{ fill: 'currentColor' }} />
              <span>Your Favorites</span>
            </div>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}>
              My <em style={{ fontStyle: 'italic', color: '#FFD166' }}>Wishlist</em>
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
              Discover and explore all your saved destinations for an unforgettable journey.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container" style={{ padding: '3rem 1rem 5rem' }}>
        {wishlist.length === 0 ? (
          <motion.div
            className="glass-card text-center"
            style={{ padding: '5rem 2rem' }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              style={{
                width: '100px',
                height: '100px',
                background: 'rgba(239, 68, 68, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
            >
              <FaHeart style={{ color: '#ef4444', fontSize: '2.5rem', opacity: 0.4 }} />
            </motion.div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '2rem',
              fontWeight: 600,
              color: 'var(--text-dark)',
              marginBottom: '0.8rem',
            }}>
              Your Wishlist is Empty
            </h2>
            <p style={{
              fontFamily: 'Manrope',
              color: 'var(--text-muted)',
              maxWidth: '450px',
              margin: '0 auto 2rem',
              fontSize: '0.95rem',
              lineHeight: 1.75,
            }}>
              Start building your dream travel itinerary by adding your favorite destinations to your wishlist. Every favorite brings you closer to your perfect journey.
            </p>
            <Link to="/destinations" style={{ textDecoration: 'none' }}>
              <motion.button
                className="btn-primary-brand"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Explore Destinations
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* ── Info Bar ── */}
            <motion.div
              className="glass-card"
              style={{ padding: '1.5rem 2rem', marginBottom: '2.5rem' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  fontFamily: 'Manrope',
                  fontWeight: 600,
                  color: 'var(--text-dark)',
                }}>
                  <FaHeart style={{ color: '#ef4444', fontSize: '1.1rem' }} />
                  <span>
                    {wishlist.length} {wishlist.length === 1 ? 'Destination' : 'Destinations'} Saved
                  </span>
                </div>
                <motion.button
                  onClick={() => setShowClearConfirm(true)}
                  style={{
                    background: 'none',
                    border: '1.5px solid var(--border-light)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '0.65rem 1.4rem',
                    color: '#ef4444',
                    fontFamily: 'Manrope',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease',
                  }}
                  whileHover={{ borderColor: '#ef4444', scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaTrashAlt size={13} />
                  <span>Clear Wishlist</span>
                </motion.button>
              </div>
            </motion.div>

            {/* ── Wishlist Cards ── */}
            <AnimatePresence mode="wait">
              <motion.div
                className="row g-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {wishlist.map((country, idx) => {
                  const name = country.name?.common || country.name || 'Unknown';
                  const capital = country.capital?.[0] || country.capital || 'N/A';
                  const region = country.region || 'World';
                  const flag = country.flags?.svg || country.flags?.png || country.flag || '';
                  const population = country.population;
                  const code = country.cca3;
                  const coverImg = getCoverImage(name);

                  return (
                    <motion.div
                      key={code}
                      className="col-sm-6 col-lg-4"
                      variants={cardVariants}
                    >
                      <motion.div
                        className="luxury-card h-100"
                        style={{
                          background: 'rgba(255, 255, 255, 0.7)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.5)',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                        whileHover={{ y: -12, boxShadow: '0 20px 60px rgba(15, 76, 129, 0.2)' }}
                        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                      >
                        {/* Image */}
                        <Link
                          to={`/destinations/${code}`}
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <div
                            className="img-zoom-wrap"
                            style={{
                              height: '220px',
                              borderRadius: 0,
                              position: 'relative',
                              overflow: 'hidden',
                            }}
                          >
                            <img
                              src={coverImg}
                              alt={`${name} travel destination`}
                              loading="lazy"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                                transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                              }}
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=75';
                              }}
                            />
                            <div
                              style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(12,26,46,0.65) 0%, transparent 55%)',
                              }}
                            />

                            {/* Badge */}
                            <div
                              style={{
                                position: 'absolute',
                                top: '1rem',
                                left: '1rem',
                                background: 'rgba(15, 76, 129, 0.85)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.15)',
                                borderRadius: '100px',
                                padding: '0.3rem 0.85rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                color: 'white',
                                fontFamily: 'Manrope, sans-serif',
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.06em',
                              }}
                            >
                              <FaGlobe size={10} />
                              <span>{region}</span>
                            </div>

                            {/* Flag */}
                            {flag && (
                              <img
                                src={flag}
                                alt={`${name} flag`}
                                style={{
                                  position: 'absolute',
                                  bottom: '0.85rem',
                                  right: '0.85rem',
                                  width: '36px',
                                  height: '24px',
                                  objectFit: 'cover',
                                  borderRadius: '4px',
                                  border: '1.5px solid rgba(255,255,255,0.5)',
                                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                                }}
                              />
                            )}
                          </div>

                          {/* Card Body */}
                          <div style={{ padding: '1.5rem' }}>
                            <h3
                              style={{
                                fontFamily: 'Cormorant Garamond, serif',
                                fontSize: '1.4rem',
                                fontWeight: 600,
                                color: 'var(--text-dark)',
                                marginBottom: '0.5rem',
                                lineHeight: 1.2,
                              }}
                            >
                              {name}
                            </h3>

                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.35rem',
                                marginBottom: '1.2rem',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.45rem',
                                }}
                              >
                                <FaMapMarkerAlt
                                  style={{
                                    color: 'var(--accent-warm)',
                                    fontSize: '0.78rem',
                                    flexShrink: 0,
                                  }}
                                />
                                <span
                                  style={{
                                    fontFamily: 'Manrope',
                                    fontSize: '0.83rem',
                                    color: 'var(--text-muted)',
                                  }}
                                >
                                  Capital:{' '}
                                  <strong style={{ color: 'var(--text-body)' }}>
                                    {capital}
                                  </strong>
                                </span>
                              </div>
                              {population && (
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.45rem',
                                  }}
                                >
                                  <FaUsers
                                    style={{
                                      color: 'var(--accent-warm)',
                                      fontSize: '0.78rem',
                                      flexShrink: 0,
                                    }}
                                  />
                                  <span
                                    style={{
                                      fontFamily: 'Manrope',
                                      fontSize: '0.83rem',
                                      color: 'var(--text-muted)',
                                    }}
                                  >
                                    Population:{' '}
                                    <strong style={{ color: 'var(--text-body)' }}>
                                      {formatPopulation(population)}
                                    </strong>
                                  </span>
                                </div>
                              )}
                            </div>

                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingTop: '1rem',
                                borderTop: '1px solid var(--border-light)',
                                gap: '0.75rem',
                              }}
                            >
                              <Link
                                to={`/destinations/${code}`}
                                style={{ textDecoration: 'none', flex: 1 }}
                              >
                                <motion.button
                                  className="btn-primary-brand"
                                  style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    padding: '0.65rem 1rem',
                                  }}
                                  whileHover={{ scale: 1.02, y: -2 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <span>Explore</span>
                                  <FaArrowRight size={12} />
                                </motion.button>
                              </Link>

                              <motion.button
                                onClick={() => handleRemove(code, name)}
                                style={{
                                  width: '44px',
                                  height: '44px',
                                  background: 'rgba(239, 68, 68, 0.1)',
                                  border: '1.5px solid rgba(239, 68, 68, 0.3)',
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#ef4444',
                                  cursor: 'pointer',
                                  flexShrink: 0,
                                }}
                                whileHover={{
                                  scale: 1.1,
                                  background: 'rgba(239, 68, 68, 0.2)',
                                }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={`Remove ${name} from wishlist`}
                              >
                                <FaTrashAlt size={15} />
                              </motion.button>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>

      {/* ── Clear Confirmation Modal ── */}
      <AnimatePresence>
        {showClearConfirm && (
          <>
            <motion.div
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(12, 26, 46, 0.82)',
                backdropFilter: 'blur(12px)',
                zIndex: 1060,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowClearConfirm(false)}
            />
            <div
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1070,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
              }}
            >
              <motion.div
                style={{
                  background: 'var(--bg-white)',
                  borderRadius: 'var(--radius-xl)',
                  width: '100%',
                  maxWidth: '420px',
                  padding: '2rem',
                  boxShadow: '0 30px 80px rgba(12, 26, 46, 0.4)',
                }}
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                  }}
                >
                  <FaTrashAlt style={{ color: '#ef4444', fontSize: '1.8rem' }} />
                </div>
                <h3
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1.6rem',
                    fontWeight: 600,
                    color: 'var(--text-dark)',
                    textAlign: 'center',
                    marginBottom: '0.8rem',
                  }}
                >
                  Clear Wishlist?
                </h3>
                <p
                  style={{
                    fontFamily: 'Manrope',
                    color: 'var(--text-muted)',
                    textAlign: 'center',
                    marginBottom: '1.8rem',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                  }}
                >
                  This will remove all {wishlist.length} destinations from your
                  wishlist. This action cannot be undone.
                </p>
                <div
                  style={{
                    display: 'flex',
                    gap: '0.8rem',
                  }}
                >
                  <motion.button
                    onClick={() => setShowClearConfirm(false)}
                    style={{
                      flex: 1,
                      background: 'var(--bg-blue-tint)',
                      border: '1.5px solid var(--border-light)',
                      borderRadius: 'var(--radius-pill)',
                      padding: '0.85rem 1.5rem',
                      color: 'var(--primary)',
                      fontFamily: 'Manrope',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={handleClearAll}
                    style={{
                      flex: 1,
                      background: '#ef4444',
                      border: 'none',
                      borderRadius: 'var(--radius-pill)',
                      padding: '0.85rem 1.5rem',
                      color: 'white',
                      fontFamily: 'Manrope',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Clear All
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

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

export default Wishlist;
