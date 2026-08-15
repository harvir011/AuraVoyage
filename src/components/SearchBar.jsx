import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ searchTerm, setSearchTerm, placeholder = 'Search country or capital...' }) => {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute', left: '1.1rem', top: '50%',
        transform: 'translateY(-50%)',
        color: 'var(--primary)', pointerEvents: 'none',
      }}>
        <FaSearch size={15} />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          border: '1.5px solid var(--border-light)',
          borderRadius: '100px',
          padding: '0.8rem 1rem 0.8rem 2.8rem',
          fontFamily: 'Manrope, sans-serif',
          fontSize: '0.92rem',
          color: 'var(--text-dark)',
          background: 'var(--bg-white)',
          outline: 'none',
          transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--secondary)';
          e.target.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--border-light)';
          e.target.style.boxShadow = 'none';
        }}
        aria-label="Search destinations"
      />
      {searchTerm && (
        <button
          type="button"
          onClick={() => setSearchTerm('')}
          aria-label="Clear search"
          style={{
            position: 'absolute', right: '0.9rem', top: '50%',
            transform: 'translateY(-50%)',
            background: 'var(--bg-blue-tint)',
            border: 'none', borderRadius: '50%',
            width: '26px', height: '26px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--primary)', cursor: 'pointer',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = 'white'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-blue-tint)'; e.currentTarget.style.color = 'var(--primary)'; }}
        >
          <FaTimes size={11} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
