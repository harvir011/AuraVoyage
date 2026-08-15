import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import { useTheme } from '../context/ThemeContext';
import 'leaflet/dist/leaflet.css';

// Map event handler component
const MapEventHandler = ({ onCountryClick }) => {
  useMapEvent('click', () => {});
  return null;
};

const WorldMap = ({ selectedCountry, onCountrySelect }) => {
  const mapRef = useRef(null);
  const geoJsonRef = useRef(null);
  const [geoData, setGeoData] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [countryCache, setCountryCache] = useState({});
  const { theme } = useTheme();

  // Fetch GeoJSON data
  useEffect(() => {
    const fetchGeoData = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'
        );
        const data = await response.json();
        console.log('GeoJSON loaded:', data.features.length, 'countries');
        setGeoData(data);
      } catch (error) {
        console.error('Error fetching geo data:', error);
      }
    };
    fetchGeoData();
  }, []);

  // Get tile layer based on theme
  const getTileLayer = () => {
    if (theme === 'dark') {
      return {
        url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      };
    }
    return {
      url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    };
  };

  // Get feature style
  const getFeatureStyle = (isHovered = false, isSelected = false) => {
    if (isSelected) {
      return {
        fillColor: '#2563EB',
        weight: 3,
        opacity: 1,
        color: '#FFB703',
        fillOpacity: 0.8,
        dashArray: '0',
      };
    }
    if (isHovered) {
      return {
        fillColor: '#F4A261',
        weight: 2,
        opacity: 1,
        color: '#FFB703',
        fillOpacity: 0.7,
        dashArray: '0',
      };
    }
    return {
      fillColor: theme === 'dark' ? '#1a6ab5' : '#3b82f6',
      weight: 1,
      opacity: 1,
      color: theme === 'dark' ? '#0F4C81' : '#0F4C81',
      fillOpacity: 0.5,
      dashArray: '0',
    };
  };

  // Fetch country data
  const fetchCountryData = async (iso3Code, feature) => {
    try {
      // Check cache first
      if (countryCache[iso3Code]) {
        onCountrySelect(countryCache[iso3Code]);
        return;
      }

      let countryData = null;
      const countryName = feature.properties?.ADMIN || feature.properties?.name;

      // Try with ISO code first
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${iso3Code}`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            countryData = data[0];
          }
        }
      } catch (e) {
        console.log('ISO lookup failed, trying name:', countryName);
      }

      // Try with country name
      if (!countryData && countryName) {
        try {
          const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
              countryData = data[0];
            }
          }
        } catch (e) {
          console.log('Name lookup failed for:', countryName);
        }
      }

      if (countryData) {
        if (!countryData.cca3) {
          countryData.cca3 = iso3Code;
        }
        console.log('Country data fetched:', countryData.name?.common);
        setCountryCache((prev) => ({ ...prev, [iso3Code]: countryData }));
        onCountrySelect(countryData);
      } else {
        console.warn('No country data found for:', iso3Code, countryName);
      }
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  };

  // Handle GeoJSON
  const onEachFeature = (feature, layer) => {
    const iso3 = feature.properties?.ISO_A3 || feature.properties?.iso_a3;
    const countryName = feature.properties?.ADMIN || feature.properties?.name || 'Country';

    if (!iso3) {
      console.warn('No ISO code for:', countryName);
      return;
    }

    // Set feature ID for styling
    layer.feature.id = iso3;

    // Popup
    layer.bindPopup(`<div style="font-family: Manrope; color: #0C1A2E;">
      <strong>${countryName}</strong><br/>
      <small style="color: #6B7280;">Click to explore</small>
    </div>`);

    // Mouse events
    layer.on('mouseover', () => {
      setHoveredCountry(iso3);
      layer.setStyle(getFeatureStyle(true, false));
      layer.bringToFront();
    });

    layer.on('mouseout', () => {
      setHoveredCountry(null);
      const isSelected = selectedCountry?.cca3 === iso3;
      layer.setStyle(getFeatureStyle(false, isSelected));
    });

    layer.on('click', () => {
      console.log('Clicked:', countryName, 'ISO:', iso3);
      fetchCountryData(iso3, feature);
    });
  };

  // Update styling when selected country changes
  useEffect(() => {
    if (geoJsonRef.current && selectedCountry) {
      console.log('Updating selection for:', selectedCountry.name?.common);
      geoJsonRef.current.eachLayer((layer) => {
        const iso3 = layer.feature.properties?.ISO_A3 || layer.feature.properties?.iso_a3;
        const isSelected = selectedCountry.cca3 === iso3;
        const isHovered = hoveredCountry === iso3;

        layer.setStyle(getFeatureStyle(isHovered, isSelected));
      });
    }
  }, [selectedCountry, hoveredCountry, theme]);

  const tileLayer = getTileLayer();

  if (!geoData) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        background: 'var(--bg-white)',
        borderRadius: '16px',
        color: 'var(--text-muted)',
        fontSize: '1rem',
      }}>
        Loading map...
      </div>
    );
  }

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: '100%', width: '100%', borderRadius: '16px' }}
      ref={mapRef}
      scrollWheelZoom={true}
      zoomControl={true}
      attributionControl={true}
    >
      <TileLayer
        url={tileLayer.url}
        attribution={tileLayer.attribution}
        maxZoom={19}
      />
      <GeoJSON
        data={geoData}
        style={getFeatureStyle}
        onEachFeature={onEachFeature}
        ref={geoJsonRef}
      />
    </MapContainer>
  );
};

export default WorldMap;
