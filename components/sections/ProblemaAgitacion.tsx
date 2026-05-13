'use client';

import { motion } from 'framer-motion';
import { FadeInSection } from '../ui/FadeInSection';

const pains = [
  'Sabes lo que tienes que hacer, pero no tienes un plan exacto.',
  'Empiezas motivado y a las semanas lo abandonas.',
  'Saltas de una dieta a otra y ninguna se adapta a ti.',
  'Haces rutinas de internet sin saber si te funcionan.',
  'Cansancio, hambre constante y sensación de estar estancado.',
];

export function ProblemaAgitacion() {
  return (
    <section className="relative py-16 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-slate-950 to-ink pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <FadeInSection className="text-center mb-14">
          <span className="section-eyebrow">El problema</span>
          <h2 className="font-display text-4xl md:text-6xl uppercase mt-6 tracking-tight leading-[0.95]">
            No es tu cuerpo. <span className="block text-fire-gradient mt-2">Es tu método.</span>
          </h2>
          <p className="font-body text-slate-300 text-base md:text-lg mt-6 max-w-2xl mx-auto">
            Llevas meses (o años) intentando transformarte. Has probado dietas, rutinas, ayunos, keto. Si nada te ha funcionado de forma estable es porque te falta una cosa:
          </p>
        </FadeInSection>

        <div className="grid gap-3 max-w-2xl mx-auto">
          {pains.map((pain, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-4 p-4 md:p-5 rounded-xl glass-card hover:border-fire/30 transition-colors group"
            >
              <div className="flex-shrink-0 w-7 h-7 rounded-md bg-fire/10 border border-fire/30 flex items-center justify-center text-fire group-hover:bg-fire group-hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="font-body text-slate-100 text-base md:text-lg leading-relaxed">{pain}</p>
            </motion.div>
          ))}
        </div>

        <FadeInSection delay={0.4} className="text-center mt-14">
          <p className="font-display text-2xl md:text-4xl uppercase tracking-tight leading-tight max-w-3xl mx-auto">
            Estás intentando transformar tu cuerpo
            <span className="block text-fire mt-2">sin un sistema.</span>
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}
