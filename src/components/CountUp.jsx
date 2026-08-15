import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * CountUp — animated number counter
 * @param {number}  end       - target value
 * @param {number}  duration  - animation duration in seconds (default 2)
 * @param {string}  prefix    - prefix string (e.g. '$')
 * @param {string}  suffix    - suffix string (e.g. '+', '%')
 * @param {number}  decimals  - decimal places to show (overrides auto-detection)
 */
const CountUp = ({ end, duration = 2, prefix = '', suffix = '', decimals }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    const targetValue = parseFloat(end) || 0;
    let startTime = null;
    let animationFrame = null;

    const updateCounter = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(targetValue * easedProgress);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounter);
      } else {
        setCount(targetValue);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);
    return () => { if (animationFrame) cancelAnimationFrame(animationFrame); };
  }, [isInView, end, duration]);

  // Determine decimal places: explicit prop > float detection > 0
  const dp = decimals != null
    ? decimals
    : (String(end).includes('.') ? (String(end).split('.')[1]?.length || 1) : 0);

  const formatted = dp > 0
    ? count.toFixed(dp)
    : Math.floor(count).toLocaleString();

  return (
    <span ref={ref}>
      {prefix}{formatted}{suffix}
    </span>
  );
};

export default CountUp;
