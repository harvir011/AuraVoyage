import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === 'success';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        background: isSuccess ? 'linear-gradient(135deg, #0F4C81, #2563EB)' : '#ef4444',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: 'var(--radius-pill)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontFamily: 'Manrope, sans-serif',
        fontSize: '0.95rem',
        fontWeight: 500,
        boxShadow: isSuccess ? '0 12px 40px rgba(37, 99, 235, 0.4)' : '0 12px 40px rgba(239, 68, 68, 0.4)',
        zIndex: 9999,
        maxWidth: '320px',
      }}
    >
      {isSuccess ? (
        <FaCheckCircle size={18} style={{ flexShrink: 0 }} />
      ) : (
        <FaTimesCircle size={18} style={{ flexShrink: 0 }} />
      )}
      <span>{message}</span>
    </motion.div>
  );
};

export default Toast;
