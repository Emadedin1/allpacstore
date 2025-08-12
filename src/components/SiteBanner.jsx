'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function SiteBanner() {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);

  // Helper: read the freeze flag set by CartDrawer
  const isFrozen = () =>
    typeof document !== 'undefined' &&
    document.documentElement.getAttribute('data-freeze-banner') === '1';

  useEffect(() => {
    // Initialize baseline on mount
    lastScrollY.current = typeof window !== 'undefined' ? window.scrollY || 0 : 0;

    function handleScroll() {
      // While frozen, do not change visibility; just keep baseline synced
      if (isFrozen()) {
        lastScrollY.current = window.scrollY || 0;
        return;
      }

      const currentScrollY = window.scrollY || 0;

      if (currentScrollY <= 0) {
        setShow(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down -> hide
        setShow(false);
      } else {
        // Scrolling up -> show
        setShow(true);
      }

      lastScrollY.current = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Also observe the freeze attribute so when it unfreezes we resync the baseline,
  // preventing a sudden show/hide on the next real scroll.
  useEffect(() => {
    if (typeof MutationObserver === 'undefined') return;

    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      if (!isFrozen()) {
        // Sync baseline to current scroll position after unfreeze
        lastScrollY.current = window.scrollY || 0;
      }
    });

    observer.observe(root, { attributes: true, attributeFilter: ['data-freeze-banner'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        width: '100%',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 9999,
        background: '#30ABD7',
        color: '#30ABD7',
        padding: '10px 0',
        textAlign: 'center',
        fontFamily: `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif`,
        fontWeight: 400,
        fontSize: '15px',
        letterSpacing: '0.02em',
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
        // Use transform for smoother GPU-accelerated animation
        transform: show ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s',
        lineHeight: 1.5,
      }}
    >
      Free Shipping on All Orders in Windsor, ON
    </div>
  );
}
