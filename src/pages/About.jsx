import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from '../components/CountUp';
import { FaGlobeAmericas, FaAward, FaUsers, FaRocket, FaEye, FaLinkedin, FaTwitter, FaStar } from 'react-icons/fa';
import { MdFlightTakeoff } from 'react-icons/md';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
};

const stats = [
  { icon: FaGlobeAmericas, end: 120, suffix: '+', label: 'Global Destinations' },
  { icon: FaUsers, end: 50000, suffix: '+', label: 'Happy Explorers' },
  { icon: FaStar, end: 99.4, suffix: '%', label: 'Satisfaction Rate', decimals: 1 },
  { icon: FaAward, end: 14, suffix: '', label: 'Industry Awards' },
];

const teamMembers = [
  {
    name: 'Julian Vance',
    role: 'Co-Founder & Chief Expedition Officer',
    bio: 'Veteran explorer who has visited over 95 countries across 2 decades.',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Camille Laurent',
    role: 'Head of Luxury Concierge',
    bio: 'Former Paris 5-star hotel head concierge specializing in private access tours.',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Kenji Takahashi',
    role: 'Director of Asia-Pacific Travel',
    bio: 'Passionate advocate for cultural preservation and private island retreats.',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
  },
];

const About = ({ onOpenBookingModal }) => {
  return (
    <div className="about-page" style={{ background: 'var(--bg-soft)' }}>

      {/* ── 1. Hero Banner ── */}
      <section style={{
        background: 'linear-gradient(160deg, #0C1A2E 0%, #0F4C81 55%, #1a3a6e 100%)',
        padding: '6rem 0',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-100px', right: '-60px',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(255,183,3,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(255,183,3,0.15)', border: '1px solid rgba(255,183,3,0.3)',
              borderRadius: '100px', padding: '0.4rem 1.2rem',
              color: '#FFD166', fontFamily: 'Manrope', fontSize: '0.78rem',
              fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>
              Our Heritage & Passion
            </div>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 700, color: '#ffffff',
              lineHeight: 1.1, marginBottom: '1.5rem',
            }}>
              Pioneering Luxury Travel{' '}
              <em style={{
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #FFB703, #F4A261)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Since 2009</em>
            </h1>
            <p style={{
              fontFamily: 'Manrope', fontSize: '1.1rem', fontWeight: 300,
              color: 'rgba(255,255,255,0.7)', maxWidth: '700px', margin: '0 auto',
              lineHeight: 1.75,
            }}>
              AuraVoyage was born from a singular vision: to connect extraordinary people with extraordinary places, crafting seamless bespoke travel memories across all seven continents.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Story Section ── */}
      <section style={{ padding: '6rem 0', background: 'var(--bg-white)' }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className="section-eyebrow">The AuraVoyage Story</span>
                <h2 className="section-title mb-4">
                  From Passionate Explorers to{' '}
                  <span className="text-gradient-blue">Global Leaders</span>
                </h2>
                <p className="section-subtitle mb-4">
                  Founded in Geneva in 2009, AuraVoyage started as an exclusive private travel atelier servicing high-net-worth families and culture enthusiasts. Over 15 years, we have expanded into a premier global travel authority with offices in Paris, Tokyo, New York, and Sydney.
                </p>
                <p style={{ fontFamily: 'Manrope', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                  Our team of over 150 local destination specialists hand-verify every hotel, private yacht charter, and culinary experience to ensure every journey exceeds expectations.
                </p>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.div
                className="row g-3"
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85 }}
              >
                <div className="col-6">
                  <div className="img-zoom-wrap" style={{ borderRadius: 'var(--radius-lg)', height: '250px' }}>
                    <img
                      src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80"
                      alt="Paris Eiffel Tower"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
                <div className="col-6" style={{ marginTop: '1.5rem' }}>
                  <div className="img-zoom-wrap" style={{ borderRadius: 'var(--radius-lg)', height: '250px' }}>
                    <img
                      src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80"
                      alt="Kyoto Japan"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Mission & Vision ── */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-beige)' }}>
        <div className="container">
          <motion.div
            className="row g-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: FaRocket,
                title: 'Our Mission',
                text: 'To inspire authentic global connection by designing sustainable, deeply immersive, and hassle-free luxury expeditions tailored to each traveler\'s individual dreams.',
              },
              {
                icon: FaEye,
                title: 'Our Vision',
                text: 'To redefine luxury tourism through responsible travel initiatives, supporting local heritage conservation, eco-conscious lodges, and zero-carbon transportation partnerships.',
              },
            ].map((item, i) => (
              <div key={i} className="col-md-6">
                <motion.div
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card"
                  style={{ padding: '2.5rem', height: '100%' }}
                >
                  <div style={{
                    width: '60px', height: '60px',
                    background: 'var(--bg-blue-tint)',
                    borderRadius: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.5rem',
                  }}>
                    <item.icon style={{ color: 'var(--primary)', fontSize: '1.5rem' }} />
                  </div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '0.8rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: 'Manrope', fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.75, margin: 0 }}>
                    {item.text}
                  </p>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. Stats Banner ── */}
      <section style={{
        padding: '5rem 0',
        background: 'linear-gradient(135deg, #0F4C81, #2563EB)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(255,183,3,0.1) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            className="row g-4 text-center"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, i) => (
              <div key={i} className="col-6 col-md-3">
                <motion.div variants={fadeUp}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
                    <stat.icon style={{ color: 'rgba(255,183,3,0.8)', fontSize: '1.8rem' }} />
                  </div>
                  <h3 className="stat-number" style={{ color: '#FFD166', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.4rem' }}>
                    <CountUp end={stat.end} suffix={stat.suffix} decimals={stat.decimals} />
                  </h3>
                  <p style={{ fontFamily: 'Manrope', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', margin: 0 }}>
                    {stat.label}
                  </p>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5. Team ── */}
      <section style={{ padding: '6rem 0', background: 'var(--bg-white)' }}>
        <div className="container">
          <motion.div
            className="text-center mx-auto mb-5"
            style={{ maxWidth: '600px' }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-eyebrow">Leadership Atelier</span>
            <h2 className="section-title">
              Meet Our <span className="underline-accent">Experts</span>
            </h2>
            <p className="section-subtitle mt-3">
              Dedicated travel visionaries working around the clock to curate your next expedition.
            </p>
          </motion.div>

          <motion.div
            className="row g-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, i) => (
              <div key={i} className="col-md-4">
                <motion.div
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="luxury-card text-center"
                  style={{ padding: '2.5rem' }}
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    style={{
                      width: '110px', height: '110px',
                      borderRadius: '50%', objectFit: 'cover',
                      border: '3px solid var(--bg-blue-tint)',
                      marginBottom: '1.2rem',
                      boxShadow: '0 4px 20px rgba(15,76,129,0.15)',
                    }}
                  />
                  <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '0.3rem' }}>
                    {member.name}
                  </h4>
                  <p style={{ fontFamily: 'Manrope', fontSize: '0.78rem', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.8rem' }}>
                    {member.role}
                  </p>
                  <p style={{ fontFamily: 'Manrope', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
                    {member.bio}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                    {[FaLinkedin, FaTwitter].map((Icon, j) => (
                      <motion.a
                        key={j} href="#"
                        style={{
                          width: '34px', height: '34px', borderRadius: '50%',
                          background: 'var(--bg-blue-tint)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'var(--primary)', textDecoration: 'none',
                        }}
                        whileHover={{ scale: 1.15, background: 'var(--primary)', color: 'white' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                      >
                        <Icon size={14} />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. CTA ── */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-beige)' }}>
        <div className="container">
          <motion.div
            className="text-center mx-auto"
            style={{ maxWidth: '640px' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="section-title mb-3">
              Ready to Craft Your <span className="text-gradient-blue">Next Journey</span>?
            </h2>
            <p className="section-subtitle mb-5">
              Let our luxury travel concierges tailor an unforgettable itinerary designed specifically around your preferences.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <motion.button
                onClick={onOpenBookingModal}
                className="btn-primary-brand d-inline-flex align-items-center gap-2"
                style={{ padding: '1rem 2rem' }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <MdFlightTakeoff />
                <span>Book Private Consultation</span>
              </motion.button>
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <RouterLink
                  to="/destinations"
                  className="btn-outline-brand d-inline-flex align-items-center gap-2"
                  style={{ textDecoration: 'none', padding: '1rem 2rem' }}
                >
                  <FaGlobeAmericas size={15} />
                  <span>Explore Destinations</span>
                </RouterLink>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
