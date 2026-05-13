'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../ui/Logo';
import { cn } from '@/lib/cn';

const navLinks = [
  { href: '#metodo', label: 'Método' },
  { href: '#testimonios', label: 'Resultados' },
  { href: '#oferta', label: 'Oferta' },
  { href: '#faq', label: 'FAQ' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-5"
    >
      <div
        className={cn(
          'flex items-center justify-between w-full max-w-6xl px-4 md:px-6 py-3 rounded-full transition-all duration-300',
          scrolled
            ? 'bg-ink/85 backdrop-blur-xl border border-fire/15 shadow-fire-sm'
            : 'bg-ink/60 backdrop-blur-lg border border-white/5'
        )}
      >
        <Logo />

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-semibold text-slate-200 hover:text-fire transition-colors rounded-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#reservar"
          className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-ink font-bold text-sm uppercase tracking-wide hover:bg-fire hover:text-white transition-all shadow-lg"
        >
          Reservar llamada
        </a>

        <button
          aria-label="menu"
          className="md:hidden w-10 h-10 flex items-center justify-center text-white"
          onClick={() => setMobileOpen(true)}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
          >
            <button
              aria-label="close"
              className="absolute top-6 right-6 w-12 h-12 text-white"
              onClick={() => setMobileOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="font-display text-3xl uppercase tracking-wide text-white hover:text-fire transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <a
              href="#reservar"
              onClick={() => setMobileOpen(false)}
              className="cta-fire mt-6"
            >
              Reservar llamada →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
