'use client';

import { motion } from 'framer-motion';
import { FadeInSection } from '../ui/FadeInSection';

const pillars = [
  {
    num: '01',
    title: 'Alimentación flexible personalizada',
    description:
      'Nada de dietas estrictas ni prohibiciones. Plan 100% ajustado a tus gustos, horarios y rutina. Comes lo que te gusta y aún así bajas grasa.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M12 2v6m0 0c-2 0-4 1-4 4 0 5 4 10 4 10s4-5 4-10c0-3-2-4-4-4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Entrenamiento inteligente',
    description:
      'Gimnasio, casa o aire libre. Tu plan se adapta a tu nivel, tu tiempo y tu objetivo. Sin ejercicios raros, sin perder tiempo. Solo lo que funciona para ti.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M6 8v8m12-8v8M3 12h18M9 6v12m6-12v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Acompañamiento diario + ajustes quincenales',
    description:
      'Hugo te acompaña en cada paso. Soporte WhatsApp 24/7 y revisiones cada 2 semanas donde se corrige y ajusta para llegar más rápido al resultado.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'App exclusiva Acción Fit',
    description:
      'Tu programación mensual, agenda virtual, entrenamientos demostrados en vídeo y recetario completo. Todo en un solo sitio. Acceso 24/7 desde tu móvil.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <rect x="6" y="2" width="12" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.8"/>
        <line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export function MetodoAccionFit() {
  return (
    <section id="metodo" className="relative py-16 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-fire-radial blur-3xl opacity-50 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <FadeInSection className="text-center mb-16 md:mb-20">
          <span className="section-eyebrow">La solución</span>
          <h2 className="font-display text-[clamp(34px,9vw,64px)] md:text-7xl lg:text-8xl uppercase mt-6 tracking-[-0.02em] leading-[0.9]">
            El Método <br />
            <span className="text-fire-gradient drop-shadow-[0_0_30px_rgba(255,69,0,0.5)]">
              Acción Fit
            </span>
          </h2>
          <p className="font-body text-slate-300 text-base md:text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            El sistema con el que <span className="text-fire-light font-semibold">+200 personas</span> ocupadas han transformado su cuerpo de forma estable y sin sacrificar su vida.
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-white/5 hover:border-fire/40 transition-all overflow-hidden"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-fire-gradient opacity-0 group-hover:opacity-[0.04] transition-opacity pointer-events-none" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-fire/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative flex items-start gap-5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-fire/10 border border-fire/30 flex items-center justify-center text-fire group-hover:bg-fire group-hover:text-white transition-all">
                    {p.icon}
                  </div>
                  <div className="font-mono text-xs tracking-[0.3em] text-slate-500 mt-3 text-center">
                    {p.num}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight text-white leading-tight">
                    {p.title}
                  </h3>
                  <p className="font-body text-slate-300 text-sm md:text-base mt-3 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <FadeInSection delay={0.5} className="text-center mt-16">
          <a href="#reservar" className="cta-fire">
            Quiero aplicar el método →
          </a>
        </FadeInSection>
      </div>
    </section>
  );
}
