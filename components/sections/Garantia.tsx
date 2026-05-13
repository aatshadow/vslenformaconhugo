'use client';

import { motion } from 'framer-motion';
import { FadeInSection } from '../ui/FadeInSection';

export function Garantia() {
  return (
    <section className="relative py-16 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        <FadeInSection>
          <div className="relative p-8 md:p-14 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-ink border border-fire/30 overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-fire-radial blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-fire-radial blur-3xl opacity-30 pointer-events-none" />

            <div className="relative grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center">
              {/* Badge */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 0.2 }}
                className="mx-auto md:mx-0"
              >
                <div className="relative w-44 h-44 md:w-52 md:h-52">
                  <div className="absolute inset-0 bg-fire-gradient rounded-full opacity-60 blur-xl animate-pulse-fire" />
                  <div className="relative w-full h-full rounded-full bg-fire-gradient flex flex-col items-center justify-center shadow-fire-xl border-4 border-fire-light/40">
                    <div className="font-display text-6xl md:text-7xl text-white leading-none">15</div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/90 mt-1">Días</div>
                    <div className="font-display text-sm uppercase tracking-wider text-white/90 mt-3 border-t border-white/30 pt-2 px-4">
                      Garantía
                    </div>
                  </div>
                  {/* Outer ring */}
                  <div className="absolute -inset-2 rounded-full border border-fire/30 animate-pulse" />
                </div>
              </motion.div>

              {/* Text */}
              <div>
                <span className="section-eyebrow">Riesgo cero</span>
                <h2 className="font-display text-4xl md:text-6xl uppercase mt-5 tracking-tight leading-[0.95]">
                  Si en 15 días <br/>
                  <span className="text-fire-gradient">no ves cambios</span>, <br/>
                  no pagas.
                </h2>

                <div className="mt-6 space-y-4 font-body text-slate-200 text-base md:text-lg leading-relaxed">
                  <p>
                    Si sigues el plan al pie de la letra durante <span className="text-fire-light font-semibold">los primeros 15 días</span> y no ves ninguna mejora, te devuelvo el <span className="font-bold underline decoration-fire decoration-2 underline-offset-4">100% de tu dinero</span>.
                  </p>
                  <p className="text-slate-300 text-sm md:text-base">
                    Sin letra pequeña. Sin formularios eternos. Sin preguntas. Si el método no te funciona, no me llevo tu dinero.
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  {['Sin compromiso', 'Sin riesgo', '100% reembolsable'].map(b => (
                    <span key={b} className="px-4 py-2 rounded-full bg-fire/10 border border-fire/30 font-mono text-xs uppercase tracking-widest text-fire-light">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
