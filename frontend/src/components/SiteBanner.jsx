'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function SiteBanner() {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setShow(true); // Always show at the top
      } else if (currentScrollY > lastScrollY.current) {
        setShow(false); // Scrolling down
      } else {
        setShow(true); // Scrolling up
      }

      lastScrollY.current = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        position: 'fixed',
        top: show ? 0 : -60, // Slide out of view when not shown
        left: 0,
        zIndex: 9999,
        background: '#0070F3',
        color: '#222',
        padding: '8px 0',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '16px',
        boxShadow: '0 2px 6px 0 rgba(0,0,0,0.03)',
        transition: 'top 0.3s',
      }}
    >
      Free Shipping For All Orders in Windsor, ON!
    </div>
  );
}
