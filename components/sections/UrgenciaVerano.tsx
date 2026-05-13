'use client';

import { motion } from 'framer-motion';
import { FadeInSection } from '../ui/FadeInSection';

export function UrgenciaVerano() {
  return (
    <section className="relative py-14 md:py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-slate-950 to-ink pointer-events-none" />
      {/* Sun gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-fire-radial blur-3xl opacity-50 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center">
        <FadeInSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fire/10 border border-fire/30 mb-8">
            <span className="text-base">☀️</span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-fire-light font-bold">
              El verano no espera
            </span>
          </div>

          <h2 className="font-display text-[clamp(34px,9vw,64px)] md:text-7xl lg:text-8xl uppercase tracking-[-0.02em] leading-[0.9]">
            Quedan <span className="text-fire-gradient">6 semanas</span><br/>
            para el verano.
          </h2>

          <p className="font-body text-slate-200 text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed">
            En <span className="text-fire-light font-semibold">8 semanas</span> tu cuerpo puede cambiar. Tu reflejo en el espejo, también. Tu manera de entrar al mar este verano, también.
          </p>
        </FadeInSection>

        <FadeInSection delay={0.2} className="mt-12">
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { num: '01', title: 'Empiezas hoy', sub: 'Llamada de valoración esta misma semana' },
              { num: '02', title: 'Plan en 48h', sub: 'Diseñado a medida por Hugo' },
              { num: '03', title: 'Verano nuevo', sub: 'Llegas al sol con otro cuerpo' },
            ].map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className="p-6 rounded-2xl glass-card text-left hover:border-fire/40 transition-colors"
              >
                <div className="font-mono text-xs text-fire-light tracking-[0.3em] mb-3">
                  PASO {s.num}
                </div>
                <div className="font-display text-2xl uppercase text-white tracking-tight">
                  {s.title}
                </div>
                <div className="font-body text-sm text-slate-400 mt-2">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </FadeInSection>

        <FadeInSection delay={0.3} className="mt-12">
          <div className="max-w-2xl mx-auto p-6 md:p-8 rounded-2xl bg-fire/5 border border-fire/30">
            <p className="font-body text-slate-200 text-base md:text-lg leading-relaxed">
              <span className="font-display text-2xl text-fire uppercase block mb-2">
                Importante
              </span>
              Hugo <span className="text-white font-semibold">revisa personalmente cada aplicación</span>. No es un programa para todo el mundo. La llamada de valoración decide si encajas en el método.
              <span className="block mt-3 text-fire-light font-semibold">
                Los cupos se llenan rápido cada mes.
              </span>
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.4} className="mt-10">
          <a href="#reservar" className="cta-fire">
            Empezar antes del verano →
          </a>
          <p className="font-mono text-xs text-slate-500 uppercase tracking-widest mt-4">
            Cada semana que pasa es una semana menos de verano
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}
