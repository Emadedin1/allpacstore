'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function SiteBanner() {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setShow(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShow(false);
      } else {
        setShow(true);
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
        top: show ? 0 : -48,
        left: 0,
        zIndex: 9999,
        background: '#0070F3',
        color: '#ffffff',
        padding: '10px 0',
        textAlign: 'center',
        fontFamily: `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif`,
        fontWeight: 400, // Regular
        fontSize: '15px',
        letterSpacing: '0.02em',
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
        borderBottom: '1px solid #f5e89e',
        transition: 'top 0.3s',
        lineHeight: 1.5,
      }}
    >
      Free Shipping on All Orders in Windsor, ON!
    </div>
  );
}
