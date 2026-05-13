'use client';

import { motion } from 'framer-motion';
import { FadeInSection } from '../ui/FadeInSection';

const stats = [
  { num: '+200', label: 'Transformaciones reales' },
  { num: '8', label: 'Semanas de proceso' },
  { num: '27K+', label: 'Comunidad en redes' },
  { num: '24/7', label: 'Soporte directo' },
];

export function QuienEsHugo() {
  return (
    <section className="relative py-16 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-slate-950 to-ink pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-fire-radial blur-3xl opacity-40 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <FadeInSection className="text-center mb-12">
          <span className="section-eyebrow">El entrenador</span>
        </FadeInSection>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 md:gap-14 items-center">
          {/* Photo placeholder */}
          <FadeInSection delay={0.1}>
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-fire/20 bg-gradient-to-br from-slate-900 to-slate-950">
              {/* Placeholder for Hugo's photo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="w-24 h-24 rounded-full bg-fire/10 border border-fire/30 mx-auto flex items-center justify-center mb-4">
                    <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-fire">
                      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-slate-500">
                    Foto de Hugo<br/>(placeholder)
                  </p>
                </div>
              </div>
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-ink/40" />

              {/* Verified badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink/80 backdrop-blur border border-fire/30">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-fire">
                  <path d="M9 12l2 2 4-4M12 2L4 6v6c0 5 4 9 8 10 4-1 8-5 8-10V6l-8-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white">Verificado</span>
              </div>

              {/* Tag bottom */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="font-display text-4xl uppercase text-white leading-none">Hugo Casal</div>
                <div className="font-mono text-xs text-fire-light uppercase tracking-[0.25em] mt-1">@enformaconhugo_</div>
              </div>
            </div>
          </FadeInSection>

          {/* Text */}
          <div>
            <FadeInSection>
              <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight leading-[0.95]">
                Hola, soy <span className="text-fire-gradient">Hugo.</span>
              </h2>
              <div className="w-20 h-1 bg-fire mt-5 rounded-full" />
            </FadeInSection>

            <FadeInSection delay={0.15} className="mt-7 space-y-5 font-body text-slate-200 text-base md:text-lg leading-relaxed">
              <p>
                Llevo años acompañando a <span className="text-fire-light font-semibold">cientos de personas</span> a transformar su físico y su salud — sin importar nivel, edad o experiencia.
              </p>
              <p>
                Llegan cansados, desmotivados y confundidos. Han probado dietas que no aguantan, rutinas que no entienden y métodos que no encajan con su vida real.
              </p>
              <p className="text-white">
                <span className="text-fire font-bold">Y se van con resultados que mantienen toda la vida.</span> No porque sean especiales, sino porque por fin tienen <span className="underline decoration-fire decoration-2 underline-offset-4">un sistema que funciona</span>.
              </p>
            </FadeInSection>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="p-4 rounded-xl glass-card text-center hover:border-fire/40 transition-colors"
                >
                  <div className="font-display text-3xl md:text-4xl text-fire leading-none">{s.num}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mt-2">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <FadeInSection delay={0.4} className="mt-8 flex flex-col items-center lg:items-start gap-3">
              <a href="#reservar" className="cta-fire">
                Hablar directamente con Hugo →
              </a>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
                Llamada 1-a-1 · Sin intermediarios · Hugo en persona
              </p>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
}
