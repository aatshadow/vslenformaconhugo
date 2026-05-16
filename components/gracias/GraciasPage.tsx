'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Logo } from '../ui/Logo';
import { ConfirmacionHero } from './ConfirmacionHero';
import { AgendaDirecta } from '../sections/AgendaDirecta';
import { VideoRecurso } from './VideoRecurso';
import { ComoPrepararte } from './ComoPrepararte';
import { TestimoniosDestacados } from './TestimoniosDestacados';
import { HypeBlock } from './HypeBlock';
import { ProximoPaso } from './ProximoPaso';

export function GraciasPage() {
  const [firstName, setFirstName] = useState<string>('');

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('hugo_lead_name');
      if (stored) setFirstName(stored.split(' ')[0]);
    } catch {}
  }, []);

  return (
    <main className="relative bg-ink min-h-screen">
      {/* Minimal header */}
      <header className="relative z-10 px-4 py-5 md:py-6 flex justify-center border-b border-white/5">
        <Logo />
      </header>

      <ConfirmacionHero firstName={firstName} />
      <AgendaDirecta mode="unlocked" />
      <VideoRecurso />
      <ComoPrepararte />
      <TestimoniosDestacados />
      <HypeBlock firstName={firstName} />
      <ProximoPaso />

      <footer className="relative py-10 px-4 border-t border-white/5 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
          © {new Date().getFullYear()} En Forma con Hugo · Método Acción Fit
        </p>
      </footer>
    </main>
  );
}
