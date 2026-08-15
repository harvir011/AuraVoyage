import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaMapMarkerAlt, FaUsers, FaUtensils, FaCalendarAlt, FaLandmark, FaCompass } from 'react-icons/fa';

const CountryPanel = ({ country, onClose }) => {
  const [enrichedData, setEnrichedData] = useState(null);

  useEffect(() => {
    // Enrich data with curated information
    const enrichData = () => {
      console.log('Enriching country data:', country);
      const countryData = {
        name: country.name?.common || country.name || 'Unknown',
        flag: country.flags?.svg || country.flags?.png,
        capital: Array.isArray(country.capital) ? country.capital?.[0] : country.capital || 'N/A',
        currencies: country.currencies || {},
        languages: country.languages || {},
        population: country.population || 0,
        region: country.region || 'Unknown',
        area: country.area || 0,
      };

      // Curated information based on country
      const countryName = countryData.name.toLowerCase();
      const curatedInfo = {
        popularDestinations: getPopularDestinations(countryName),
        bestSeason: getBestSeason(countryName),
        famousFoods: getFamousFoods(countryName),
        topAttractions: getTopAttractions(countryName),
        travelTips: getTravelTips(countryName),
      };

      setEnrichedData({ ...countryData, ...curatedInfo });
    };

    enrichData();
  }, [country]);

  const getPopularDestinations = (country) => {
    const destinations = {
      france: ['Paris', 'Eiffel Tower', 'Versailles', 'Riviera'],
      japan: ['Tokyo', 'Kyoto', 'Mount Fuji', 'Osaka'],
      italy: ['Venice', 'Rome', 'Florence', 'Amalfi Coast'],
      spain: ['Barcelona', 'Madrid', 'Seville', 'Granada'],
      thailand: ['Bangkok', 'Phuket', 'Chiang Mai', 'Krabi'],
      brazil: ['Rio de Janeiro', 'Amazon', 'São Paulo', 'Salvador'],
      australia: ['Sydney', 'Great Barrier Reef', 'Melbourne', 'Uluru'],
      egypt: ['Cairo', 'Giza', 'Nile River', 'Alexandria'],
      usa: ['New York', 'Los Angeles', 'Las Vegas', 'Hawaii'],
      india: ['Taj Mahal', 'Delhi', 'Goa', 'Rajasthan'],
    };
    return destinations[country] || ['Major cities', 'Cultural sites', 'Natural landmarks', 'Local experiences'];
  };

  const getBestSeason = (country) => {
    const seasons = {
      france: 'April-June (Spring) or September-October (Fall)',
      japan: 'March-April (Cherry Blossom) or October-November (Autumn)',
      italy: 'April-May (Spring) or September-October (Fall)',
      spain: 'May-June (Summer) or September-October (Fall)',
      thailand: 'November-February (Cool & Dry)',
      brazil: 'December-March (Summer)',
      australia: 'December-February (Summer)',
      egypt: 'October-April (Cool Season)',
      usa: 'September-November (Fall) or April-May (Spring)',
      india: 'October-March (Winter)',
    };
    return seasons[country] || 'Year-round with regional variations';
  };

  const getFamousFoods = (country) => {
    const foods = {
      france: ['Croissants', 'Coq au Vin', 'Escargot', 'Cheese & Wine'],
      japan: ['Sushi', 'Ramen', 'Tempura', 'Mochi'],
      italy: ['Pasta', 'Risotto', 'Tiramisu', 'Pizza'],
      spain: ['Paella', 'Tapas', 'Gazpacho', 'Churros'],
      thailand: ['Pad Thai', 'Tom Yum', 'Green Curry', 'Mango Sticky Rice'],
      brazil: ['Feijoada', 'Pão de Queijo', 'Açaí', 'Churrasco'],
      australia: ['Barramundi', 'Lamingtons', 'Pavlova', 'Vegemite'],
      egypt: ['Koshari', 'Falafel', 'Shawarma', 'Basboosa'],
      usa: ['Burger', 'BBQ', 'Mac & Cheese', 'Hot Dog'],
      india: ['Curry', 'Biryani', 'Samosa', 'Tandoori Chicken'],
    };
    return foods[country] || ['Local specialties', 'Street food', 'Regional cuisine', 'Spice blends'];
  };

  const getTopAttractions = (country) => {
    const attractions = {
      france: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Arc de Triomphe'],
      japan: ['Senso-ji Temple', 'Fushimi Inari', 'Kinkaku-ji', 'Arashiyama Bamboo'],
      italy: ['Colosseum', 'Vatican', 'Trevi Fountain', 'Duomo'],
      spain: ['Sagrada Familia', 'Park Güell', 'Alhambra', 'Prado Museum'],
      thailand: ['Grand Palace', 'Wat Pho', 'Floating Markets', 'Island Hopping'],
      brazil: ['Christ the Redeemer', 'Sugar Loaf Mountain', 'Iguazu Falls', 'Christ Statue'],
      australia: ['Sydney Opera House', 'Great Barrier Reef', 'Uluru', 'Bondi Beach'],
      egypt: ['Great Pyramid', 'Sphinx', 'Karnak Temple', 'Valley of the Kings'],
      usa: ['Statue of Liberty', 'Golden Gate', 'Grand Canyon', 'Niagara Falls'],
      india: ['Taj Mahal', 'Jaipur Palace', 'Gateway of India', 'Hawa Mahal'],
    };
    return attractions[country] || ['Historic sites', 'Museums', 'Natural wonders', 'Cultural landmarks'];
  };

  const getTravelTips = (country) => {
    const tips = {
      france: 'Learn basic French phrases. Book restaurants in advance. Use Paris Metro for transport.',
      japan: 'Get a JR Pass for trains. Remove shoes indoors. Cash is king.',
      italy: 'Book museums ahead. Use regional trains. Learn Italian etiquette.',
      spain: 'Dinner is late (9pm+). Tap water is safe. Use buses for long distances.',
      thailand: 'Respect the monarchy. Keep shoulders covered at temples. Haggle in markets.',
      brazil: 'Carnival is peak season. Cash exchanges at ATMs. Portuguese is the language.',
      australia: 'Drive on the left. Wildlife can be dangerous. Sun protection is essential.',
      egypt: 'Hire a guide for history. Respect religious customs. Stay hydrated.',
      usa: 'Tipping is expected (15-20%). Get travel insurance. Driving varies by state.',
      india: 'Respect cultural norms. Drink bottled water. Negotiating prices is common.',
    };
    return tips[country] || 'Research local customs and regulations before visiting. Get travel insurance and check visa requirements.';
  };

  if (!enrichedData) return null;

  const currencyString = Object.entries(enrichedData.currencies)
    .map(([code, info]) => `${code} (${info.symbol || ''})`)
    .join(', ') || 'N/A';

  const languagesString = Object.values(enrichedData.languages)
    .join(', ') || 'N/A';

  return (
    <AnimatePresence>
      <motion.div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          padding: '1rem',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(238,244,253,0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.5)',
            borderRadius: '24px',
            padding: '2rem',
            width: '100%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(15, 76, 129, 0.2)',
            position: 'relative',
          }}
          initial={{ x: 500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 500, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              width: '40px',
              height: '40px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: 'none',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ef4444',
              cursor: 'pointer',
              zIndex: 10,
            }}
            whileHover={{ scale: 1.1, background: 'rgba(239, 68, 68, 0.2)' }}
            whileTap={{ scale: 0.95 }}
          >
            <FaTimes size={18} />
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ marginBottom: '1.5rem', paddingRight: '2.5rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.8rem' }}>
              {enrichedData.flag && (
                <img
                  src={enrichedData.flag}
                  alt={enrichedData.name}
                  style={{ width: '64px', height: '40px', objectFit: 'cover', borderRadius: '8px' }}
                />
              )}
              <h2 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.8rem',
                fontWeight: 600,
                color: 'var(--text-dark)',
                margin: 0,
              }}>
                {enrichedData.name}
              </h2>
            </div>
            <p style={{
              fontFamily: 'Manrope',
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              margin: 0,
            }}>
              {enrichedData.region}
            </p>
          </motion.div>

          {/* Quick Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1.5rem',
              padding: '1rem',
              background: 'rgba(15, 76, 129, 0.05)',
              borderRadius: '12px',
            }}
          >
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0 0 0.3rem', textTransform: 'uppercase', fontWeight: 600 }}>
                Capital
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)', margin: 0, fontWeight: 500 }}>
                {enrichedData.capital}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0 0 0.3rem', textTransform: 'uppercase', fontWeight: 600 }}>
                Population
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)', margin: 0, fontWeight: 500 }}>
                {(enrichedData.population / 1_000_000).toFixed(1)}M
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0 0 0.3rem', textTransform: 'uppercase', fontWeight: 600 }}>
                Currency
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-dark)', margin: 0, fontWeight: 500 }}>
                {currencyString}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0 0 0.3rem', textTransform: 'uppercase', fontWeight: 600 }}>
                Language
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-dark)', margin: 0, fontWeight: 500 }}>
                {languagesString}
              </p>
            </div>
          </motion.div>

          {/* Sections */}
          {[
            { icon: FaMapMarkerAlt, title: 'Popular Destinations', items: enrichedData.popularDestinations },
            { icon: FaCalendarAlt, title: 'Best Season', items: [enrichedData.bestSeason] },
            { icon: FaUtensils, title: 'Famous Foods', items: enrichedData.famousFoods },
            { icon: FaLandmark, title: 'Top Attractions', items: enrichedData.topAttractions },
          ].map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
              style={{ marginBottom: '1.2rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                <section.icon style={{ color: 'var(--primary)', fontSize: '0.9rem' }} />
                <h3 style={{
                  fontFamily: 'Manrope',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--primary)',
                  textTransform: 'uppercase',
                  margin: 0,
                  letterSpacing: '0.05em',
                }}>
                  {section.title}
                </h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {section.items.map((item, i) => (
                  <span
                    key={i}
                    style={{
                      background: 'var(--bg-blue-tint)',
                      color: 'var(--primary)',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '100px',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      border: '1px solid rgba(15, 76, 129, 0.2)',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Travel Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              background: 'linear-gradient(135deg, rgba(255, 183, 3, 0.1) 0%, rgba(244, 162, 97, 0.1) 100%)',
              border: '1px solid rgba(255, 183, 3, 0.2)',
              borderRadius: '12px',
              padding: '1rem',
              marginTop: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <FaCompass style={{ color: '#F4A261', fontSize: '0.9rem' }} />
              <h3 style={{
                fontFamily: 'Manrope',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#F4A261',
                textTransform: 'uppercase',
                margin: 0,
                letterSpacing: '0.05em',
              }}>
                Travel Tips
              </h3>
            </div>
            <p style={{
              fontFamily: 'Manrope',
              fontSize: '0.9rem',
              color: 'var(--text-body)',
              lineHeight: 1.6,
              margin: 0,
            }}>
              {enrichedData.travelTips}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CountryPanel;
