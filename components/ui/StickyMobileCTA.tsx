'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      const scrolled = window.scrollY > 600;

      // Hide when the reservation section is on screen
      const reservar = document.getElementById('reservar');
      let nearForm = false;
      if (reservar) {
        const rect = reservar.getBoundingClientRect();
        nearForm = rect.top < window.innerHeight - 100;
      }

      setShow(scrolled && !nearForm);
    };

    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility);
    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#reservar"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 220 }}
          style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }}
          className="md:hidden fixed left-4 right-4 z-40 cta-fire !py-4 !text-base !px-6"
        >
          Reservar mi llamada →
        </motion.a>
      )}
    </AnimatePresence>
  );
}
