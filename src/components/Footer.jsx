import React from 'react';
import { Link } from 'react-router-dom';
import { FaGlobeAmericas, FaInstagram, FaTwitter, FaFacebook, FaYoutube, FaPaperPlane, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const year = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const destinations = [
    { name: 'France', path: '/destinations/fra' },
    { name: 'Japan', path: '/destinations/jpn' },
    { name: 'Italy', path: '/destinations/ita' },
    { name: 'Australia', path: '/destinations/aus' },
    { name: 'Maldives', path: '/destinations/mdv' },
    { name: 'Switzerland', path: '/destinations/che' },
  ];

  const socialLinks = [
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaFacebook, href: '#', label: 'Facebook' },
    { icon: FaYoutube, href: '#', label: 'YouTube' },
  ];

  const contactInfo = [
    { icon: FaMapMarkerAlt, text: 'One World Trade Center, New York, NY' },
    { icon: FaPhone, text: '+1 (800) AUR-AVOY' },
    { icon: FaEnvelope, text: 'hello@auravoyage.com' },
  ];

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #0C1A2E 0%, #071122 100%)',
      color: 'rgba(255,255,255,0.72)',
      fontFamily: 'Manrope, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative glow top */}
      <div style={{
        position: 'absolute', top: '-80px', left: '10%',
        width: '450px', height: '300px',
        background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '-60px', right: '5%',
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(255,183,3,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── Top Section ── */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '4rem 0 3rem' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row g-5">

            {/* Brand Column */}
            <div className="col-lg-4">
              <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '44px', height: '44px',
                  background: 'linear-gradient(135deg, #0F4C81, #2563EB)',
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(37,99,235,0.4)',
                }}>
                  <FaGlobeAmericas size={22} color="white" />
                </div>
                <span style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.8rem', fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                }}>
                  Aura<span style={{ color: '#FFB703' }}>Voyage</span>
                </span>
              </Link>

              <p style={{ fontSize: '0.88rem', lineHeight: 1.8, marginBottom: '1.8rem', maxWidth: '340px' }}>
                Crafting extraordinary journeys for discerning travelers since 2009. Luxury, tailored, and unforgettable — every time.
              </p>

              {/* Social Icons */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    style={{
                      width: '40px', height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                    }}
                    whileHover={{ scale: 1.12, background: 'rgba(37,99,235,0.3)', color: 'white', borderColor: 'rgba(37,99,235,0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-sm-6 col-lg-2">
              <h5 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.15rem', fontWeight: 600,
                color: '#ffffff', marginBottom: '1.3rem',
              }}>
                Quick Links
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      style={{
                        textDecoration: 'none',
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: '0.88rem',
                        transition: 'color 0.25s ease',
                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      }}
                      onMouseEnter={(e) => { e.target.style.color = '#FFB703'; }}
                      onMouseLeave={(e) => { e.target.style.color = 'rgba(255,255,255,0.6)'; }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Destinations */}
            <div className="col-sm-6 col-lg-2">
              <h5 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.15rem', fontWeight: 600,
                color: '#ffffff', marginBottom: '1.3rem',
              }}>
                Top Destinations
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {destinations.map((dest) => (
                  <li key={dest.path}>
                    <Link
                      to={dest.path}
                      style={{
                        textDecoration: 'none',
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: '0.88rem',
                        transition: 'color 0.25s ease',
                      }}
                      onMouseEnter={(e) => { e.target.style.color = '#FFB703'; }}
                      onMouseLeave={(e) => { e.target.style.color = 'rgba(255,255,255,0.6)'; }}
                    >
                      {dest.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="col-lg-4">
              <h5 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.15rem', fontWeight: 600,
                color: '#ffffff', marginBottom: '0.5rem',
              }}>
                Travel Insider
              </h5>
              <p style={{ fontSize: '0.85rem', marginBottom: '1.2rem', lineHeight: 1.7 }}>
                Subscribe for exclusive deals, destination guides, and luxury travel inspiration.
              </p>
              <form
                onSubmit={(e) => { e.preventDefault(); alert('Welcome to AuraVoyage Insider!'); }}
                style={{ display: 'flex', gap: '0.5rem' }}
              >
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '100px',
                    padding: '0.75rem 1.2rem',
                    color: '#ffffff',
                    fontFamily: 'Manrope',
                    fontSize: '0.87rem',
                    outline: 'none',
                    minWidth: 0,
                  }}
                />
                <motion.button
                  type="submit"
                  style={{
                    width: '44px', height: '44px', flexShrink: 0,
                    background: 'linear-gradient(135deg, #FFB703, #F4A261)',
                    border: 'none', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Subscribe"
                >
                  <FaPaperPlane size={16} color="#0C1A2E" />
                </motion.button>
              </form>

              {/* Contact Info */}
              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {contactInfo.map(({ icon: Icon, text }, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.82rem' }}>
                    <Icon style={{ color: '#FFB703', marginTop: '3px', flexShrink: 0 }} size={13} />
                    <span style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div style={{ padding: '1.4rem 0' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)' }}>
              © {year} AuraVoyage. All rights reserved. Crafted with ✈️ for luxury travelers.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((item) => (
                <a
                  key={item}
                  href="#"
                  style={{
                    fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)',
                    textDecoration: 'none', transition: 'color 0.25s',
                  }}
                  onMouseEnter={(e) => { e.target.style.color = 'rgba(255,255,255,0.7)'; }}
                  onMouseLeave={(e) => { e.target.style.color = 'rgba(255,255,255,0.35)'; }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
