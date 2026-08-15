/**
 * REST Countries API Service with high-quality fallback dataset for WanderLuxe.
 * Provides country data including flag, capital, population, region, subregion, currencies, languages, timezones, etc.
 */

const BASE_URL = 'https://restcountries.com/v3.1';

// High-resolution fallback imagery and curated data for top global destinations
const FALLBACK_DESTINATIONS = [
  {
    name: { common: 'France', official: 'French Republic' },
    cca3: 'FRA',
    capital: ['Paris'],
    region: 'Europe',
    subregion: 'Western Europe',
    population: 67390000,
    flags: {
      svg: 'https://flagcdn.com/fr.svg',
      png: 'https://flagcdn.com/w320/fr.png',
      alt: 'The flag of France features three equal vertical bands of blue, white, and red.'
    },
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    description: 'Experience fashion, fine wine, legendary art museums, and romantic Paris boulevards.',
    languages: { fra: 'French' },
    currencies: { EUR: { name: 'Euro', symbol: '€' } },
    timezones: ['UTC+01:00'],
    maps: { googleMaps: 'https://goo.gl/maps/g71KwHVbPzn8A5Yz5' },
    rating: 4.9,
    pricePerNight: '$380'
  },
  {
    name: { common: 'Japan', official: 'Japan' },
    cca3: 'JPN',
    capital: ['Tokyo'],
    region: 'Asia',
    subregion: 'Eastern Asia',
    population: 125800000,
    flags: {
      svg: 'https://flagcdn.com/jp.svg',
      png: 'https://flagcdn.com/w320/jp.png',
      alt: 'The flag of Japan features a red sun disk centered on a white rectangle.'
    },
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    description: 'Ancient shrines, cherry blossoms, bullet trains, and world-class futuristic architecture.',
    languages: { jpn: 'Japanese' },
    currencies: { JPY: { name: 'Japanese Yen', symbol: '¥' } },
    timezones: ['UTC+09:00'],
    maps: { googleMaps: 'https://goo.gl/maps/N27BxYyqYdD2' },
    rating: 4.95,
    pricePerNight: '$420'
  },
  {
    name: { common: 'Italy', official: 'Italian Republic' },
    cca3: 'ITA',
    capital: ['Rome'],
    region: 'Europe',
    subregion: 'Southern Europe',
    population: 59550000,
    flags: {
      svg: 'https://flagcdn.com/it.svg',
      png: 'https://flagcdn.com/w320/it.png',
      alt: 'The flag of Italy features three equal vertical bands of green, white, and red.'
    },
    heroImage: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=80',
    description: 'Immerse in Roman history, Renaissance art, Tuscan vineyards, and Amalfi coast views.',
    languages: { ita: 'Italian' },
    currencies: { EUR: { name: 'Euro', symbol: '€' } },
    timezones: ['UTC+01:00'],
    maps: { googleMaps: 'https://goo.gl/maps/5T2k9' },
    rating: 4.88,
    pricePerNight: '$350'
  },
  {
    name: { common: 'Switzerland', official: 'Swiss Confederation' },
    cca3: 'CHE',
    capital: ['Bern'],
    region: 'Europe',
    subregion: 'Western Europe',
    population: 8637000,
    flags: {
      svg: 'https://flagcdn.com/ch.svg',
      png: 'https://flagcdn.com/w320/ch.png',
      alt: 'The flag of Switzerland is square with a red field bearing a white cross.'
    },
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    description: 'Snow-capped Alpine peaks, luxury chalets, serene lakes, and world-renowned watchmakers.',
    languages: { deu: 'German', fra: 'French', ita: 'Italian' },
    currencies: { CHF: { name: 'Swiss Franc', symbol: 'CHF' } },
    timezones: ['UTC+01:00'],
    maps: { googleMaps: 'https://goo.gl/maps/1D2h3' },
    rating: 4.98,
    pricePerNight: '$550'
  },
  {
    name: { common: 'Australia', official: 'Commonwealth of Australia' },
    cca3: 'AUS',
    capital: ['Canberra'],
    region: 'Oceania',
    subregion: 'Australia and New Zealand',
    population: 25690000,
    flags: {
      svg: 'https://flagcdn.com/au.svg',
      png: 'https://flagcdn.com/w320/au.png',
      alt: 'The flag of Australia features the Union Jack in the canton and Southern Cross stars.'
    },
    heroImage: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1200&q=80',
    description: 'The Sydney Opera House, pristine Great Barrier Reef coral, and sun-soaked coastal retreats.',
    languages: { eng: 'English' },
    currencies: { AUD: { name: 'Australian Dollar', symbol: '$' } },
    timezones: ['UTC+08:00', 'UTC+09:30', 'UTC+10:00'],
    maps: { googleMaps: 'https://goo.gl/maps/3F4g5' },
    rating: 4.85,
    pricePerNight: '$390'
  },
  {
    name: { common: 'Brazil', official: 'Federative Republic of Brazil' },
    cca3: 'BRA',
    capital: ['Brasília'],
    region: 'Americas',
    subregion: 'South America',
    population: 212500000,
    flags: {
      svg: 'https://flagcdn.com/br.svg',
      png: 'https://flagcdn.com/w320/br.png',
      alt: 'The flag of Brazil features a yellow rhombus on a green field with a blue celestial globe.'
    },
    heroImage: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80',
    description: 'Vibrant Rio de Janeiro beaches, Amazonian biodiversity, and electric Carnival culture.',
    languages: { por: 'Portuguese' },
    currencies: { BRL: { name: 'Brazilian Real', symbol: 'R$' } },
    timezones: ['UTC-05:00', 'UTC-03:00'],
    maps: { googleMaps: 'https://goo.gl/maps/4H5i6' },
    rating: 4.82,
    pricePerNight: '$310'
  },
  {
    name: { common: 'Egypt', official: 'Arab Republic of Egypt' },
    cca3: 'EGY',
    capital: ['Cairo'],
    region: 'Africa',
    subregion: 'Northern Africa',
    population: 102300000,
    flags: {
      svg: 'https://flagcdn.com/eg.svg',
      png: 'https://flagcdn.com/w320/eg.png',
      alt: 'The flag of Egypt features red, white, and black horizontal bands with the Golden Eagle of Saladin.'
    },
    heroImage: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80',
    description: 'Majestic Giza pyramids, ancient Nile River cruises, and rich Pharaoh heritage.',
    languages: { ara: 'Arabic' },
    currencies: { EGP: { name: 'Egyptian Pound', symbol: 'E£' } },
    timezones: ['UTC+02:00'],
    maps: { googleMaps: 'https://goo.gl/maps/5J6k7' },
    rating: 4.87,
    pricePerNight: '$280'
  },
  {
    name: { common: 'Kenya', official: 'Republic of Kenya' },
    cca3: 'KEN',
    capital: ['Nairobi'],
    region: 'Africa',
    subregion: 'Eastern Africa',
    population: 53770000,
    flags: {
      svg: 'https://flagcdn.com/ke.svg',
      png: 'https://flagcdn.com/w320/ke.png',
      alt: 'The flag of Kenya features black, red, and green bands with a Maasai shield.'
    },
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    description: 'Unrivaled Big Five safaris, Maasai Mara plains, and luxury eco-lodges.',
    languages: { eng: 'English', swa: 'Swahili' },
    currencies: { KES: { name: 'Kenyan Shilling', symbol: 'KSh' } },
    timezones: ['UTC+03:00'],
    maps: { googleMaps: 'https://goo.gl/maps/6K7l8' },
    rating: 4.92,
    pricePerNight: '$460'
  },
  {
    name: { common: 'Greece', official: 'Hellenic Republic' },
    cca3: 'GRC',
    capital: ['Athens'],
    region: 'Europe',
    subregion: 'Southern Europe',
    population: 10720000,
    flags: {
      svg: 'https://flagcdn.com/gr.svg',
      png: 'https://flagcdn.com/w320/gr.png',
      alt: 'Nine horizontal blue and white stripes with a white cross on blue canton.'
    },
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    description: 'Whitewashed Santorini villas, Aegean sunset cruises, and ancient Parthenon monuments.',
    languages: { ell: 'Greek' },
    currencies: { EUR: { name: 'Euro', symbol: '€' } },
    timezones: ['UTC+02:00'],
    maps: { googleMaps: 'https://goo.gl/maps/7L8m9' },
    rating: 4.94,
    pricePerNight: '$410'
  },
  {
    name: { common: 'Canada', official: 'Canada' },
    cca3: 'CAN',
    capital: ['Ottawa'],
    region: 'Americas',
    subregion: 'North America',
    population: 38010000,
    flags: {
      svg: 'https://flagcdn.com/ca.svg',
      png: 'https://flagcdn.com/w320/ca.png',
      alt: 'Red field with white square containing stylized 11-pointed maple leaf.'
    },
    heroImage: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80',
    description: 'Turquoise Banff lakes, majestic Rocky Mountains, and cosmopolitan Vancouver harbour.',
    languages: { eng: 'English', fra: 'French' },
    currencies: { CAD: { name: 'Canadian Dollar', symbol: '$' } },
    timezones: ['UTC-08:00', 'UTC-03:30'],
    maps: { googleMaps: 'https://goo.gl/maps/8M9n0' },
    rating: 4.89,
    pricePerNight: '$370'
  },
  {
    name: { common: 'Thailand', official: 'Kingdom of Thailand' },
    cca3: 'THA',
    capital: ['Bangkok'],
    region: 'Asia',
    subregion: 'South-Eastern Asia',
    population: 69800000,
    flags: {
      svg: 'https://flagcdn.com/th.svg',
      png: 'https://flagcdn.com/w320/th.png',
      alt: 'Five horizontal stripes in red, white, blue, white, and red.'
    },
    heroImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80',
    description: 'Golden island beaches, intricate Buddhist temples, and legendary street food markets.',
    languages: { tha: 'Thai' },
    currencies: { THB: { name: 'Thai Baht', symbol: '฿' } },
    timezones: ['UTC+07:00'],
    maps: { googleMaps: 'https://goo.gl/maps/9N0o1' },
    rating: 4.86,
    pricePerNight: '$250'
  },
  {
    name: { common: 'Iceland', official: 'Iceland' },
    cca3: 'ISL',
    capital: ['Reykjavik'],
    region: 'Europe',
    subregion: 'Northern Europe',
    population: 366400,
    flags: {
      svg: 'https://flagcdn.com/is.svg',
      png: 'https://flagcdn.com/w320/is.png',
      alt: 'Blue field with a red cross outlined in white extending to edges.'
    },
    heroImage: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80',
    description: 'Northern Lights, geothermal Blue Lagoons, cascading waterfalls, and active volcanoes.',
    languages: { isl: 'Icelandic' },
    currencies: { ISK: { name: 'Icelandic Króna', symbol: 'kr' } },
    timezones: ['UTC+00:00'],
    maps: { googleMaps: 'https://goo.gl/maps/0P1q2' },
    rating: 4.96,
    pricePerNight: '$490'
  }
];

export const fetchAllCountries = async () => {
  try {
    const response = await fetch(`${BASE_URL}/all?fields=name,capital,region,subregion,population,flags,cca3,languages,currencies,timezones,maps`);
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      return FALLBACK_DESTINATIONS;
    }
    
    // Enrich API data with image links if available or fallback
    return data.map(item => {
      const fallbackMatch = FALLBACK_DESTINATIONS.find(f => f.cca3 === item.cca3);
      return {
        ...item,
        heroImage: fallbackMatch?.heroImage || `https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80`,
        description: fallbackMatch?.description || `Discover magnificent landscapes, rich culture, and historic landmarks in ${item.name?.common || 'this destination'}.`,
        rating: fallbackMatch?.rating || (4.5 + Math.random() * 0.45).toFixed(2),
        pricePerNight: fallbackMatch?.pricePerNight || `$${Math.floor(200 + Math.random() * 300)}`
      };
    });
  } catch (error) {
    console.warn('REST Countries API fetch failed or timed out. Utilizing fallback luxury dataset:', error.message);
    return FALLBACK_DESTINATIONS;
  }
};

export const fetchCountryByCode = async (code) => {
  if (!code) return null;
  try {
    const response = await fetch(`${BASE_URL}/alpha/${code}`);
    if (!response.ok) {
      throw new Error('Country code fetch failed');
    }
    const data = await response.json();
    const country = Array.isArray(data) ? data[0] : data;
    const fallbackMatch = FALLBACK_DESTINATIONS.find(f => f.cca3 === country.cca3 || f.cca3 === code);
    return {
      ...country,
      heroImage: fallbackMatch?.heroImage || `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80`,
      description: fallbackMatch?.description || `Explore authentic local culture, architecture, and luxury stay options in ${country.name?.common || 'this region'}.`,
      rating: fallbackMatch?.rating || 4.9,
      pricePerNight: fallbackMatch?.pricePerNight || '$395'
    };
  } catch (error) {
    console.warn(`Falling back to local data for code ${code}:`, error.message);
    const matched = FALLBACK_DESTINATIONS.find(f => f.cca3.toLowerCase() === code.toLowerCase());
    return matched || FALLBACK_DESTINATIONS[0];
  }
};

export const getFeaturedDestinations = async () => {
  const all = await fetchAllCountries();
  // Filter top curated picks
  const featuredCodes = ['FRA', 'JPN', 'ITA', 'CHE', 'GRC', 'KEN'];
  const featured = all.filter(c => featuredCodes.includes(c.cca3));
  return featured.length >= 6 ? featured : all.slice(0, 6);
};
