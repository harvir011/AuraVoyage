import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Loader from '../components/Loader';
import { fetchCountryByCode } from '../services/countriesApi';
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaUsers,
  FaGlobe,
  FaMoneyBillWave,
  FaLanguage,
  FaClock,
  FaExternalLinkAlt,
  FaCalendarCheck,
  FaStar,
  FaShieldAlt,
  FaPlaneDeparture,
  FaCheckCircle,
} from 'react-icons/fa';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
};

const includedServices = [
  { title: 'Private Airport Transfers', desc: 'Chauffeur-driven luxury sedan upon arrival and departure.' },
  { title: '5-Star Boutique Stay', desc: 'Handpicked luxury hotels with complimentary breakfast and suite upgrades.' },
  { title: 'Guided Excursions', desc: 'Skip-the-line museum passes and expert private local guide.' },
  { title: '24/7 Concierge Hotline', desc: 'Personal travel advisor available via WhatsApp or direct call anytime.' },
];

const coverImages = {
  'france': 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=2000&q=85',
  'japan': 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=2000&q=85',
  'italy': 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=2000&q=85',
  'brazil': 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=2000&q=85',
  'australia': 'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?w=2000&q=85',
  'india': 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=2000&q=85',
  'canada': 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=2000&q=85',
  'united states': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=2000&q=85',
  'greece': 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=2000&q=85',
  'morocco': 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=2000&q=85',
  'thailand': 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=2000&q=85',
  'peru': 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=2000&q=85',
  'new zealand': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=2000&q=85',
  'switzerland': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&q=85',
  'kenya': 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=2000&q=85',
  'maldives': 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=2000&q=85',
  'norway': 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=2000&q=85',
  'egypt': 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=2000&q=85',
  'spain': 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=2000&q=85',
};

const DestinationDetails = ({ onOpenBookingModal }) => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      const data = await fetchCountryByCode(code);
      setCountry(data);
      setLoading(false);
    };
    getDetails();
  }, [code]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader text="Retrieving destination details..." />
      </div>
    );
  }

  if (!country) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container text-center" style={{ padding: '4rem 1rem' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: 'var(--text-dark)', marginBottom: '1rem' }}>
            Destination Not Found
          </h2>
          <p style={{ fontFamily: 'Manrope', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            We couldn't locate details for destination code "{code}".
          </p>
          <Link to="/destinations" className="btn-primary-brand" style={{ textDecoration: 'none' }}>
            Return to All Destinations
          </Link>
        </div>
      </div>
    );
  }

  const {
    name, capital, population, region, subregion,
    languages, currencies, timezones, flags,
    maps, heroImage, description, rating, pricePerNight
  } = country;

  const commonName = name?.common || 'Destination';
  const officialName = name?.official || commonName;
  const capitalName = Array.isArray(capital) && capital.length > 0 ? capital.join(', ') : 'N/A';
  const formattedPopulation = population ? Number(population).toLocaleString() : 'N/A';
  const flagSrc = flags?.svg || flags?.png || '';
  const formattedLanguages = languages ? Object.values(languages).join(', ') : 'N/A';
  const formattedCurrencies = currencies
    ? Object.values(currencies).map(c => `${c.name} (${c.symbol || ''})`).join(', ')
    : 'N/A';
  const formattedTimezones = Array.isArray(timezones) ? timezones.slice(0, 2).join(', ') : 'N/A';
  const googleMapsUrl = maps?.googleMaps || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(commonName)}`;

  const bgImage = heroImage
    || coverImages[commonName.toLowerCase()]
    || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=2000&q=85';

  const specItems = [
    { icon: FaMapMarkerAlt, label: 'Capital City', value: capitalName },
    { icon: FaUsers, label: 'Population', value: formattedPopulation },
    { icon: FaGlobe, label: 'Region', value: `${region}${subregion ? ` · ${subregion}` : ''}` },
    { icon: FaLanguage, label: 'Languages', value: formattedLanguages },
    { icon: FaMoneyBillWave, label: 'Currency', value: formattedCurrencies },
    { icon: FaClock, label: 'Timezone', value: formattedTimezones },
  ];

  return (
    <div style={{ background: 'var(--bg-soft)', minHeight: '100vh', paddingBottom: '4rem' }}>

      {/* ── Hero Image Banner ── */}
      <div style={{ position: 'relative', height: '520px', overflow: 'hidden' }}>
        <motion.img
          src={bgImage}
          alt={commonName}
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: 'easeOut' }}
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=2000&q=85'; }}
        />
        {/* gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(12,26,46,0.92) 0%, rgba(12,26,46,0.4) 55%, rgba(12,26,46,0.6) 100%)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.8rem 1rem' }}>
          {/* Back button */}
          <div>
            <motion.button
              onClick={() => navigate(-1)}
              className="btn-outline-light-brand d-inline-flex align-items-center gap-2"
              style={{ fontSize: '0.88rem', padding: '0.6rem 1.4rem' }}
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <FaArrowLeft size={13} />
              <span>Back to Destinations</span>
            </motion.button>
          </div>

          {/* Country info bottom */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2 }}
            style={{ marginBottom: '1.5rem' }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginBottom: '0.8rem' }}>
              {flagSrc && (
                <img
                  src={flagSrc}
                  alt={`${commonName} flag`}
                  style={{ width: '52px', height: '35px', objectFit: 'cover', borderRadius: '6px', border: '2px solid rgba(255,255,255,0.4)', boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}
                />
              )}
              <span style={{
                background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '100px', padding: '0.3rem 1rem',
                color: 'rgba(255,255,255,0.9)', fontFamily: 'Manrope', fontSize: '0.78rem', fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>
                {region}{subregion ? ` · ${subregion}` : ''}
              </span>
              {rating && (
                <span style={{
                  background: 'rgba(255,183,3,0.2)', backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,183,3,0.4)',
                  borderRadius: '100px', padding: '0.3rem 0.9rem',
                  color: '#FFD166', fontFamily: 'Manrope', fontSize: '0.78rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                }}>
                  <FaStar size={11} /> {rating} / 5.0
                </span>
              )}
            </div>

            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              fontWeight: 700, color: '#ffffff',
              lineHeight: 1.08, marginBottom: '0.5rem',
            }}>
              {commonName}
            </h1>
            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.1rem', fontStyle: 'italic',
              color: 'rgba(255,255,255,0.65)', margin: 0,
            }}>
              {officialName}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="container" style={{ marginTop: '-2rem', position: 'relative', zIndex: 3 }}>
        <div className="row g-4">

          {/* Left Column */}
          <div className="col-lg-8">

            {/* Overview Card */}
            <motion.div
              className="luxury-card"
              style={{ padding: '2.5rem', marginBottom: '1.5rem' }}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '1rem' }}>
                Destination Overview
              </h2>
              <p style={{ fontFamily: 'Manrope', fontSize: '0.97rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '2rem' }}>
                {description || `Experience the spectacular beauty and vibrant history of ${commonName}. Located in ${region}, ${commonName} offers travelers an unmatched blend of iconic architecture, natural wonders, and refined hospitality that leaves every visitor deeply inspired.`}
              </p>

              {/* Specs Grid */}
              <motion.div
                className="row g-3"
                style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)', marginBottom: '2rem' }}
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                {specItems.map(({ icon: Icon, label, value }, i) => (
                  <div key={i} className="col-sm-6 col-md-4">
                    <motion.div
                      variants={fadeUp}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}
                    >
                      <div style={{
                        width: '44px', height: '44px', flexShrink: 0,
                        background: 'var(--bg-blue-tint)',
                        borderRadius: '12px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon style={{ color: 'var(--primary)', fontSize: '1.05rem' }} />
                      </div>
                      <div>
                        <div style={{ fontFamily: 'Manrope', fontSize: '0.72rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>
                          {label}
                        </div>
                        <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.87rem', color: 'var(--text-dark)', lineHeight: 1.4 }}>
                          {value}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>

              {/* External Action */}
              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                <motion.a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-brand d-inline-flex align-items-center gap-2"
                  style={{ textDecoration: 'none', fontSize: '0.88rem', padding: '0.7rem 1.5rem' }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FaMapMarkerAlt />
                  <span>View on Google Maps</span>
                  <FaExternalLinkAlt size={11} />
                </motion.a>
              </div>
            </motion.div>

            {/* Included Services Card */}
            <motion.div
              className="luxury-card"
              style={{ padding: '2.5rem' }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '1.5rem' }}>
                Included Luxury Services
              </h3>
              <div className="row g-3">
                {includedServices.map((service, i) => (
                  <div key={i} className="col-md-6">
                    <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '30px', height: '30px', flexShrink: 0,
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginTop: '2px',
                      }}>
                        <FaCheckCircle color="white" size={14} />
                      </div>
                      <div>
                        <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-dark)', marginBottom: '0.2rem' }}>
                          {service.title}
                        </div>
                        <div style={{ fontFamily: 'Manrope', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                          {service.desc}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Booking Sidebar */}
          <div className="col-lg-4">
            <motion.div
              className="luxury-card"
              style={{ padding: '2rem', position: 'sticky', top: '90px' }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.3 }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontFamily: 'Manrope', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>
                    Private Tour Packages
                  </div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--text-dark)', lineHeight: 1 }}>
                    {pricePerNight || '$390'}
                    <span style={{ fontFamily: 'Manrope', fontSize: '0.85rem', fontWeight: 400, color: 'var(--text-muted)' }}> / night</span>
                  </div>
                </div>
                <span style={{
                  background: 'linear-gradient(135deg, #FFB703, #F4A261)',
                  color: 'var(--text-dark)',
                  borderRadius: '100px', padding: '0.35rem 0.9rem',
                  fontFamily: 'Manrope', fontSize: '0.72rem', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                }}>
                  All-Inclusive
                </span>
              </div>

              {/* Package details */}
              <div style={{
                background: 'var(--bg-blue-tint)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '1.2rem',
                marginBottom: '1.5rem',
              }}>
                {[
                  { label: 'Available Dates', value: 'Year-Round Custom' },
                  { label: 'Duration', value: '5 – 14 Days Flexible' },
                  { label: 'Group Size', value: 'Private (1–10 Guests)' },
                ].map(({ label, value }, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginBottom: i < 2 ? '0.75rem' : 0,
                    paddingBottom: i < 2 ? '0.75rem' : 0,
                    borderBottom: i < 2 ? '1px solid var(--border-light)' : 'none',
                  }}>
                    <span style={{ fontFamily: 'Manrope', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{label}:</span>
                    <span style={{ fontFamily: 'Manrope', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-dark)' }}>{value}</span>
                  </div>
                ))}
              </div>

              <motion.button
                className="btn-primary-brand w-100 d-flex align-items-center justify-content-center gap-2 mb-3"
                onClick={() => onOpenBookingModal && onOpenBookingModal(commonName)}
                style={{ padding: '1rem' }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <FaCalendarCheck />
                <span>Book This Destination</span>
              </motion.button>

              <motion.button
                className="btn-outline-brand w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={() => navigate('/contact')}
                style={{ padding: '0.9rem' }}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                <FaPlaneDeparture />
                <span>Inquire Custom Itinerary</span>
              </motion.button>

              <div style={{ marginTop: '1.2rem', paddingTop: '1.2rem', borderTop: '1px solid var(--border-light)', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontFamily: 'Manrope', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <FaShieldAlt style={{ color: 'var(--primary)' }} />
                  <span>Free Cancellation up to 14 days before arrival</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
