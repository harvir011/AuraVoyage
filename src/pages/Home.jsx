import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import DestinationCard from '../components/DestinationCard';
import Loader from '../components/Loader';
import CountUp from '../components/CountUp';
import { getFeaturedDestinations } from '../services/countriesApi';
import {
  FaDollarSign,
  FaUserCheck,
  FaHeadset,
  FaQuoteLeft,
  FaStar,
  FaArrowRight,
  FaGlobe,
  FaPaperPlane,
  FaShieldAlt,
  FaAward,
  FaCheckCircle,
} from 'react-icons/fa';
import { MdFlightTakeoff } from 'react-icons/md';

/* ─ Animation Variants ─ */
const fadeUp = {
  hidden: { opacity: 0, y: 45 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
};

/* ─ Why Choose Us data ─ */
const whyCards = [
  {
    icon: FaDollarSign,
    title: 'Affordable Luxury',
    desc: 'Exclusive direct-contracted rates with five-star resorts and private villas, delivering unparalleled value without compromise.',
  },
  {
    icon: FaUserCheck,
    title: 'Expert Local Guides',
    desc: 'Hand-selected certified historians and native guides who unlock hidden gems, cultural secrets, and VIP access everywhere.',
  },
  {
    icon: FaHeadset,
    title: '24/7 Global Support',
    desc: 'Your personal travel concierge is available around the clock for flight changes, dinner reservations, or emergency care.',
  },
];

/* ─ Testimonials data ─ */
const testimonials = [
  {
    quote: 'Our custom tour to Japan was flawless from start to finish. The private ryokan in Kyoto and helicopter tour over Fuji exceeded every expectation!',
    name: 'Sophia Martinez',
    destination: 'Traveled to Tokyo & Kyoto',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  },
  {
    quote: 'AuraVoyage arranged a last-minute safari lodge in Kenya that was completely sold out everywhere else. Unbelievable 24/7 concierge!',
    name: 'Marcus Vance',
    destination: 'Traveled to Kenya',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  },
  {
    quote: 'The Swiss Alps itinerary was breathtaking. Every hotel transfer, ski pass, and fondue dinner was seamlessly arranged. Absolute 10/10!',
    name: 'Elena Rostova',
    destination: 'Traveled to Switzerland',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
  },
];

const Home = ({ onOpenBookingModal }) => {
  const [featuredCountries, setFeaturedCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      setLoading(true);
      const data = await getFeaturedDestinations();
      setFeaturedCountries(data);
      setLoading(false);
    };
    loadFeatured();
  }, []);

  return (
    <div className="home-page overflow-hidden">

      {/* ══════════ 1. HERO ══════════ */}
      <Hero />

      {/* ══════════ 2. FEATURED DESTINATIONS ══════════ */}
      <section style={{ padding: '6rem 0', background: 'var(--bg-soft)' }}>
        <div className="container">
          <motion.div
            className="d-flex flex-column flex-md-row align-items-md-end justify-content-between mb-5"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <div>
              <span className="section-eyebrow">Curated Journeys</span>
              <h2 className="section-title">
                Popular <span className="underline-accent">Destinations</span>
              </h2>
            </div>
            <motion.div whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Link
                to="/destinations"
                className="btn-outline-brand d-inline-flex align-items-center gap-2 mt-3 mt-md-0"
                style={{ textDecoration: 'none' }}
              >
                <span>View All Destinations</span>
                <FaArrowRight size={13} />
              </Link>
            </motion.div>
          </motion.div>

          {loading ? (
            <Loader text="Fetching top curated destinations..." />
          ) : (
            <motion.div
              className="row g-4"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              {featuredCountries.slice(0, 6).map((country, idx) => (
                <DestinationCard key={country.cca3 || country.name?.common} country={country} index={idx} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ══════════ 3. WHY CHOOSE US ══════════ */}
      <section style={{
        padding: '6rem 0',
        background: 'linear-gradient(160deg, #0C1A2E 0%, #0F4C81 55%, #1a3a6e 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* background decoration */}
        <div style={{
          position: 'absolute', top: '-120px', right: '-100px',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(255,183,3,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            className="text-center mx-auto mb-5"
            style={{ maxWidth: '640px' }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-eyebrow">The AuraVoyage Promise</span>
            <h2 className="section-title" style={{ color: '#ffffff' }}>
              Why Choose <span style={{ fontStyle: 'italic', color: '#FFD166' }}>AuraVoyage</span>
            </h2>
            <p className="section-subtitle mt-3" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '100%' }}>
              We combine years of luxury concierge expertise, exclusive partnerships, and 24/7 dedicated care to create flawless global expeditions.
            </p>
          </motion.div>

          <motion.div
            className="row g-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {whyCards.map((card, i) => (
              <div key={i} className="col-md-4">
                <motion.div
                  variants={fadeUp}
                  whileHover={{ y: -8, borderColor: 'rgba(255,183,3,0.4)' }}
                  transition={{ duration: 0.35 }}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2.2rem',
                    height: '100%',
                    textAlign: 'center',
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                  }}
                >
                  <div style={{
                    width: '72px', height: '72px',
                    background: 'linear-gradient(135deg, rgba(255,183,3,0.2), rgba(244,162,97,0.2))',
                    border: '1px solid rgba(255,183,3,0.3)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.5rem',
                  }}>
                    <card.icon size={28} style={{ color: '#FFB703' }} />
                  </div>
                  <h3 style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1.45rem', fontWeight: 600,
                    color: '#FFD166', marginBottom: '0.8rem',
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '0.9rem', lineHeight: 1.75,
                    color: 'rgba(255,255,255,0.65)', margin: 0,
                  }}>
                    {card.desc}
                  </p>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ 4. EXPERIENCE BANNER with CountUp ══════════ */}
      <section style={{ padding: '6rem 0', background: 'var(--bg-white)' }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <motion.div
                className="position-relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="img-zoom-wrap" style={{ borderRadius: 'var(--radius-xl)' }}>
                  <img
                    src="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80"
                    alt="Luxury travel experience"
                    style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                {/* Floating award badge */}
                <motion.div
                  className="glass-card d-none d-sm-flex align-items-center gap-3"
                  style={{
                    position: 'absolute', bottom: '2rem', right: '-1.5rem',
                    padding: '1rem 1.4rem', borderRadius: 'var(--radius-md)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0F4C81, #2563EB)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <FaAward color="white" size={20} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-dark)' }}>Award Winner</div>
                    <div style={{ fontFamily: 'Manrope', fontSize: '0.72rem', color: 'var(--text-muted)' }}>#1 Luxury Tour Operator 2025</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="section-eyebrow">Unmatched Craftsmanship</span>
                <h2 className="section-title mb-4">
                  Redefining How The <span className="text-gradient-blue">World Travels</span>
                </h2>
                <p className="section-subtitle mb-5">
                  At AuraVoyage, every itinerary is custom handcrafted around your personal desires. Whether sipping champagne in Paris or exploring Kyoto's ancient temples, we make dream journeys a reality.
                </p>

                {/* Stats */}
                <div className="row g-4 mb-5">
                  {[
                    { icon: FaGlobe, end: 120, suffix: '+', label: 'Countries Covered' },
                    { icon: FaShieldAlt, end: 100, suffix: '%', label: 'Protected & Insured' },
                    { icon: MdFlightTakeoff, end: 50, suffix: 'K+', label: 'Happy Travelers' },
                    { icon: FaStar, end: 4.9, suffix: '/5', label: 'Average Rating', decimals: 1 },
                  ].map((stat, i) => (
                    <div key={i} className="col-6">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                        <div style={{
                          width: '52px', height: '52px', flexShrink: 0,
                          background: 'var(--bg-blue-tint)',
                          borderRadius: '14px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <stat.icon style={{ color: 'var(--primary)', fontSize: '1.3rem' }} />
                        </div>
                        <div>
                          <div className="stat-number" style={{ fontSize: '1.9rem' }}>
                            <CountUp end={stat.end} suffix={stat.suffix} decimals={stat.decimals} />
                          </div>
                          <div style={{ fontFamily: 'Manrope', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{stat.label}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  className="btn-primary-brand d-inline-flex align-items-center gap-2"
                  onClick={onOpenBookingModal}
                  style={{ fontSize: '1rem', padding: '1rem 2.2rem' }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  <MdFlightTakeoff />
                  <span>Plan Your Private Journey</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 5. TESTIMONIALS ══════════ */}
      <section style={{ padding: '6rem 0', background: 'var(--bg-beige)' }}>
        <div className="container">
          <motion.div
            className="text-center mx-auto mb-5"
            style={{ maxWidth: '620px' }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-eyebrow">Client Impressions</span>
            <h2 className="section-title">
              Stories From Our <span className="underline-accent">Explorers</span>
            </h2>
            <p className="section-subtitle mt-3">
              Real reviews from travelers who experienced the magic of AuraVoyage.
            </p>
          </motion.div>

          <motion.div
            className="row g-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="col-md-4">
                <motion.div
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="luxury-card"
                  style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                    <FaQuoteLeft style={{ color: 'var(--accent)', fontSize: '1.8rem' }} />
                    <div style={{ display: 'flex', gap: '3px' }}>
                      {[...Array(5)].map((_, j) => (
                        <FaStar key={j} className="star-gold" style={{ fontSize: '0.85rem' }} />
                      ))}
                    </div>
                  </div>
                  <p style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '0.92rem', lineHeight: 1.75,
                    color: 'var(--text-body)', fontStyle: 'italic',
                    flex: 1, marginBottom: '1.5rem',
                  }}>
                    "{t.quote}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginTop: 'auto', borderTop: '1px solid var(--border-light)', paddingTop: '1.2rem' }}>
                    <img
                      src={t.avatar}
                      alt={t.name}
                      style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--bg-blue-tint)' }}
                    />
                    <div>
                      <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-dark)' }}>{t.name}</div>
                      <div style={{ fontFamily: 'Manrope', fontSize: '0.76rem', color: 'var(--text-muted)' }}>{t.destination}</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ 6. NEWSLETTER ══════════ */}
      <section style={{
        padding: '5rem 0',
        background: 'linear-gradient(135deg, #0F4C81 0%, #2563EB 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* bg decoration */}
        <div style={{
          position: 'absolute', top: '-80px', left: '-60px',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(255,183,3,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', right: '-40px',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            className="text-center mx-auto"
            style={{ maxWidth: '780px' }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(255,183,3,0.18)', border: '1px solid rgba(255,183,3,0.3)',
              borderRadius: '100px', padding: '0.4rem 1.1rem',
              color: '#FFD166', fontFamily: 'Manrope', fontSize: '0.75rem',
              fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>
              <FaCheckCircle />
              <span>Private Travel Journal</span>
            </div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600,
              color: '#ffffff', marginBottom: '1rem',
            }}>
              Unlock Exclusive Destination Deals
            </h2>
            <p style={{
              fontFamily: 'Manrope', color: 'rgba(255,255,255,0.65)',
              maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: 1.75,
            }}>
              Join over 50,000 discerning travelers. Receive curated luxury destination guides, early-bird expedition offers, and VIP perks.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing to AuraVoyage Insider!');
              }}
              style={{ display: 'flex', gap: '0.75rem', maxWidth: '520px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                style={{
                  flex: '1 1 280px',
                  background: 'rgba(255,255,255,0.95)',
                  border: 'none',
                  borderRadius: '100px',
                  padding: '0.9rem 1.5rem',
                  fontFamily: 'Manrope',
                  fontSize: '0.95rem',
                  color: 'var(--text-dark)',
                  outline: 'none',
                }}
              />
              <motion.button
                type="submit"
                className="btn-accent-brand d-inline-flex align-items-center gap-2"
                style={{ flexShrink: 0, padding: '0.9rem 1.8rem' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <FaPaperPlane size={14} />
                <span>Subscribe</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
