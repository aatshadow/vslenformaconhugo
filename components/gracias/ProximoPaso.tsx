'use client';

import { motion } from 'framer-motion';
import { FadeInSection } from '../ui/FadeInSection';

const checklist = [
  'Hugo revisa personalmente tu aplicación',
  'Recibirás un WhatsApp con la hora exacta',
  'Hugo te llama directamente por WhatsApp',
  'Si encajas, empiezas el método en 48h',
];

export function ProximoPaso() {
  return (
    <section className="relative py-14 md:py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-slate-950 to-ink pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        <FadeInSection className="text-center mb-10">
          <span className="section-eyebrow">Paso 3 de 3</span>
          <h2 className="font-display text-4xl md:text-6xl uppercase mt-6 tracking-tight leading-[0.95]">
            ¿Y ahora <span className="text-fire-gradient">qué pasa?</span>
          </h2>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <div className="relative p-7 md:p-9 rounded-2xl bg-gradient-to-br from-slate-900 to-ink border border-fire/20">
            <ol className="space-y-4">
              {checklist.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-fire-gradient flex items-center justify-center font-mono text-xs font-bold text-white">
                    {i + 1}
                  </div>
                  <span className="font-body text-slate-200 text-base md:text-lg leading-relaxed pt-0.5">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ol>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.3} className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-fire/10 border border-fire/40">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-fire">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-fire-light font-bold">
              Atento al WhatsApp en las próximas 24h
            </span>
          </div>

          <p className="font-body text-slate-400 text-sm mt-6 max-w-md mx-auto">
            Si tienes alguna duda urgente, puedes escribir directamente a Hugo por Instagram:{' '}
            <a href="https://www.instagram.com/enformaconhugo_" target="_blank" rel="noreferrer" className="text-fire hover:underline">
              @enformaconhugo_
            </a>
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}
