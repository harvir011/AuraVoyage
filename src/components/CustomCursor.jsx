import React, { useEffect, useRef } from 'react';

/**
 * CustomCursor — desktop only, follows mouse with Ocean Blue + Gold dot
 * Hidden on mobile/touch devices automatically.
 */
const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let raf;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      raf = requestAnimationFrame(animateRing);
    };

    const onMouseEnterLink = () => {
      dot.style.transform += ' scale(2.5)';
      dot.style.background = 'rgba(255, 183, 3, 0.9)';
      ring.style.width = '48px';
      ring.style.height = '48px';
      ring.style.borderColor = 'rgba(255, 183, 3, 0.6)';
    };

    const onMouseLeaveLink = () => {
      dot.style.background = '';
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = '';
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    raf = requestAnimationFrame(animateRing);

    const interactiveEls = document.querySelectorAll('a, button, [role="button"], input, select, textarea, label');
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink);
      el.addEventListener('mouseleave', onMouseLeaveLink);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '8px', height: '8px',
          borderRadius: '50%',
          background: 'var(--primary)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'background 0.25s ease, transform 0.1s ease',
          willChange: 'transform',
        }}
        className="d-none d-lg-block"
        aria-hidden="true"
      />
      {/* Ring */}
      <div
        ref={cursorRingRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '36px', height: '36px',
          borderRadius: '50%',
          border: '1.5px solid rgba(15, 76, 129, 0.5)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease',
          willChange: 'transform',
        }}
        className="d-none d-lg-block"
        aria-hidden="true"
      />
    </>
  );
};

export default CustomCursor;
