import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube
} from 'react-icons/fa';

const inputStyle = {
  width: '100%',
  border: '1.5px solid var(--border-light)',
  borderRadius: '12px',
  padding: '0.85rem 1.2rem',
  fontFamily: 'Manrope, sans-serif',
  fontSize: '0.93rem',
  color: 'var(--text-dark)',
  background: 'var(--bg-white)',
  outline: 'none',
  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
};

const labelStyle = {
  fontFamily: 'Manrope, sans-serif',
  fontSize: '0.78rem',
  fontWeight: 600,
  color: 'var(--text-dark)',
  marginBottom: '0.4rem',
  display: 'block',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    destinationInterest: 'General Inquiry'
  });
  const [submitted, setSubmitted] = useState(false);
  const [shake, setShake] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '', destinationInterest: 'General Inquiry' });
    }, 6000);
  };

  const contactDetails = [
    {
      icon: FaMapMarkerAlt,
      title: 'Global Headquarters',
      lines: ['One World Trade Center, Suite 1200', 'New York, NY 10007, USA'],
    },
    {
      icon: FaPhoneAlt,
      title: 'Direct Phone Lines',
      lines: ['+1 (800) AUR-AVOY (Toll-Free)', '+1 (212) 555-9080 (International)'],
    },
    {
      icon: FaEnvelope,
      title: 'Electronic Mail',
      lines: ['concierge@auravoyage.com', 'vip-bookings@auravoyage.com'],
    },
    {
      icon: FaClock,
      title: 'Operating Hours',
      lines: ['Monday – Sunday: 24 Hours', 'Continuous Concierge Care'],
    },
  ];

  const socials = [
    { icon: FaInstagram, label: 'Instagram' },
    { icon: FaFacebookF, label: 'Facebook' },
    { icon: FaTwitter, label: 'Twitter' },
    { icon: FaYoutube, label: 'YouTube' },
  ];

  return (
    <div style={{ background: 'var(--bg-soft)' }}>

      {/* ── 1. Header Banner ── */}
      <section style={{
        background: 'linear-gradient(160deg, #0C1A2E 0%, #0F4C81 55%, #1a3a6e 100%)',
        padding: '5.5rem 0',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', bottom: '-80px', right: '-60px',
          width: '400px', height: '400px',
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
              borderRadius: '100px', padding: '0.4rem 1.2rem',
              color: '#FFD166', fontFamily: 'Manrope', fontSize: '0.78rem',
              fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>
              24/7 Global Concierge
            </div>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 700, color: '#ffffff',
              lineHeight: 1.1, marginBottom: '1.2rem',
            }}>
              Contact <em style={{ fontStyle: 'italic', color: '#FFD166' }}>AuraVoyage</em>
            </h1>
            <p style={{
              fontFamily: 'Manrope', fontSize: '1.05rem', fontWeight: 300,
              color: 'rgba(255,255,255,0.7)', maxWidth: '640px', margin: '0 auto',
              lineHeight: 1.75,
            }}>
              Have a question or wish to plan a private customized tour? Our luxury travel advisors are ready to assist you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Form & Info ── */}
      <div className="container" style={{ padding: '4rem 1rem' }}>
        <div className="row g-4">

          {/* ── Left: Form ── */}
          <div className="col-lg-7">
            <motion.div
              animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="luxury-card"
              style={{ padding: '2.5rem' }}
            >
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.9rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '0.4rem' }}>
                Send Us a Message
              </h2>
              <p style={{ fontFamily: 'Manrope', fontSize: '0.87rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Fill out the form and a senior travel advisor will respond within 2 business hours.
              </p>

              {submitted ? (
                <motion.div
                  style={{
                    background: 'linear-gradient(135deg, rgba(15,76,129,0.06), rgba(37,99,235,0.08))',
                    border: '1.5px solid rgba(37,99,235,0.2)',
                    borderRadius: 'var(--radius-md)',
                    padding: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1rem',
                  }}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                >
                  <FaCheckCircle style={{ color: 'var(--secondary)', fontSize: '2rem', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h5 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '0.4rem' }}>
                      Message Sent Successfully!
                    </h5>
                    <p style={{ fontFamily: 'Manrope', fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
                      Thank you, <strong style={{ color: 'var(--primary)' }}>{formData.name || 'Valued Traveler'}</strong>. Our luxury concierge team has received your inquiry and will reach out shortly.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label style={labelStyle}>Your Full Name *</label>
                      <input
                        type="text" name="name" required
                        value={formData.name} onChange={handleChange}
                        placeholder="John Doe"
                        style={inputStyle}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--secondary)'; e.target.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.1)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label style={labelStyle}>Email Address *</label>
                      <input
                        type="email" name="email" required
                        value={formData.email} onChange={handleChange}
                        placeholder="john@example.com"
                        style={inputStyle}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--secondary)'; e.target.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.1)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>

                    <div className="col-md-6">
                      <label style={labelStyle}>Subject</label>
                      <input
                        type="text" name="subject"
                        value={formData.subject} onChange={handleChange}
                        placeholder="e.g. Japan booking inquiry"
                        style={inputStyle}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--secondary)'; e.target.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.1)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>

                    <div className="col-md-6">
                      <label style={labelStyle}>Region of Interest</label>
                      <select
                        name="destinationInterest"
                        value={formData.destinationInterest} onChange={handleChange}
                        style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--secondary)'; e.target.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.1)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
                      >
                        <option>General Inquiry</option>
                        <option value="Europe">Europe (France, Italy, Swiss)</option>
                        <option value="Asia">Asia (Japan, Thailand)</option>
                        <option value="Africa">Africa Safaris (Kenya, Egypt)</option>
                        <option value="Americas">Americas (Brazil, Canada)</option>
                        <option value="Oceania">Oceania (Australia, NZ)</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label style={labelStyle}>Your Message / Special Requests *</label>
                      <textarea
                        name="message" rows="4" required
                        value={formData.message} onChange={handleChange}
                        placeholder="Tell us about your trip dates, preferred accommodation, group size, and special experiences..."
                        style={{ ...inputStyle, borderRadius: '16px', resize: 'vertical', lineHeight: 1.7 }}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--secondary)'; e.target.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.1)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>

                    <div className="col-12" style={{ marginTop: '0.5rem' }}>
                      <motion.button
                        type="submit"
                        className="btn-primary-brand w-100 d-flex align-items-center justify-content-center gap-2"
                        style={{ padding: '1rem' }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FaPaperPlane />
                        <span>Send Message</span>
                      </motion.button>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </div>

          {/* ── Right: Contact Info ── */}
          <div className="col-lg-5">
            <motion.div
              className="luxury-card"
              style={{ padding: '2.5rem' }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '2rem' }}>
                Concierge Headquarters
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                {contactDetails.map(({ icon: Icon, title, lines }, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{
                      width: '46px', height: '46px', flexShrink: 0,
                      background: 'var(--bg-blue-tint)',
                      borderRadius: '12px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon style={{ color: 'var(--primary)', fontSize: '1.1rem' }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-dark)', marginBottom: '0.2rem' }}>
                        {title}
                      </div>
                      {lines.map((line, j) => (
                        <div key={j} style={{ fontFamily: 'Manrope', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border-light)' }}>
                <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.78rem', color: 'var(--text-dark)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
                  Connect On Social
                </div>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  {socials.map(({ icon: Icon, label }) => (
                    <motion.a
                      key={label}
                      href="#"
                      aria-label={label}
                      style={{
                        width: '40px', height: '40px',
                        borderRadius: '50%',
                        background: 'var(--bg-blue-tint)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--primary)', textDecoration: 'none',
                        border: '1px solid var(--border-light)',
                      }}
                      whileHover={{ scale: 1.12, background: 'var(--primary)', color: 'white', borderColor: 'var(--primary)' }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    >
                      <Icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── 3. Map ── */}
        <motion.div
          className="luxury-card"
          style={{ padding: '1.5rem', marginTop: '2rem' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaMapMarkerAlt style={{ color: 'var(--primary)' }} /> Our Location
          </h3>
          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '360px' }}>
            <iframe
              title="AuraVoyage Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.7588147171424!2d-73.9675276234241!3d40.76735197138541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258eb8d40a23d%3A0x7d02580ef135677e!2sPark%20Ave%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
