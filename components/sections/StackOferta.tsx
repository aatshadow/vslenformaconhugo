'use client';

import { motion } from 'framer-motion';
import { FadeInSection } from '../ui/FadeInSection';

const stack = [
  {
    title: 'Plan de alimentación 100% personalizado',
    description: 'Diseñado a tus gustos, horarios y objetivos. Recetas, gramajes y guía completa.',
  },
  {
    title: 'Plan de entrenamiento adaptado',
    description: 'Para gym, casa o aire libre. Ajustado a tu nivel, tu tiempo y tu objetivo real.',
  },
  {
    title: 'Soporte directo WhatsApp 24/7',
    description: 'Hugo y su equipo responden en horas. Sin esperas, sin formularios, sin bots.',
  },
  {
    title: 'Revisiones quincenales 1-a-1',
    description: 'Cada 15 días corregimos y ajustamos. Tu plan evoluciona contigo, no al revés.',
  },
  {
    title: 'Acceso a la app exclusiva Acción Fit',
    description: 'Programación mensual, entrenos en vídeo, recetario y agenda virtual. 24/7 en tu móvil.',
  },
  {
    title: 'Seguimiento de hábitos y progreso',
    description: 'Métricas semanales para que veas resultados — y mantengas el cambio para siempre.',
  },
];

const bonuses = [
  {
    tag: 'Bonus 01',
    title: 'Las verdades que nadie te cuenta sobre la pérdida de grasa',
    description:
      'Documento descargable con los principios reales detrás del déficit calórico, mitos virales que te están frenando, y la verdad que entrenadores genéricos prefieren ocultarte. De una vez por todas, entiende cómo funciona.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M14 2v6h6M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    tag: 'Bonus 02',
    title: 'Roadmap Operación Bikini 2026',
    description:
      'Tu hoja de ruta semana a semana hasta el verano. Plan personalizado con hitos, métricas y ajustes para llegar a la playa con el cuerpo que llevas años queriendo.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M5 22V12l5-3 4 3 5-3v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
  },
];

export function StackOferta() {
  return (
    <section id="oferta" className="relative py-16 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-slate-950 to-ink pointer-events-none" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-fire-radial blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-fire-radial blur-3xl opacity-40 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <FadeInSection className="text-center mb-16">
          <span className="section-eyebrow">Lo que recibes</span>
          <h2 className="font-display text-[clamp(34px,9vw,64px)] md:text-7xl uppercase mt-6 tracking-[-0.02em] leading-[0.92]">
            Todo lo que necesitas <br/>
            <span className="text-fire-gradient">y nada que sobre.</span>
          </h2>
        </FadeInSection>

        {/* Stack grid */}
        <div className="grid md:grid-cols-2 gap-3 md:gap-4 max-w-4xl mx-auto">
          {stack.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="flex items-start gap-4 p-5 rounded-xl glass-card hover:border-fire/40 transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-fire flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white">
                  <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="font-display text-lg md:text-xl uppercase text-white tracking-tight leading-tight">
                  {item.title}
                </div>
                <p className="font-body text-slate-300 text-sm mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BONUSES */}
        <FadeInSection className="mt-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fire/15 border border-fire/40">
            <span className="text-xl">🎁</span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-fire-light font-bold">
              Solo si reservas llamada
            </span>
          </div>
          <h3 className="font-display text-4xl md:text-6xl uppercase mt-6 tracking-tight leading-[0.95]">
            Bonus exclusivos <span className="text-fire">de regalo</span>
          </h3>
          <p className="font-body text-slate-300 text-base mt-5 max-w-2xl mx-auto">
            Estos dos bonos solo los reciben quienes reservan llamada de valoración esta semana. Una vez completes la llamada, son tuyos. Para siempre.
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-5 mt-12 max-w-5xl mx-auto">
          {bonuses.map((b, i) => (
            <motion.div
              key={b.tag}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              {/* Glow border */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-fire via-fire-light to-fire opacity-60 group-hover:opacity-100 transition-opacity blur-sm" />

              <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 to-ink p-7 md:p-8 h-full border border-fire/20">
                <div className="flex items-center justify-between mb-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-fire-light">
                    {b.tag}
                  </div>
                  <div className="px-3 py-1 rounded-full bg-fire text-white text-[10px] font-bold uppercase tracking-widest font-mono">
                    Gratis
                  </div>
                </div>

                <div className="w-14 h-14 rounded-xl bg-fire-gradient flex items-center justify-center text-white shadow-fire-md mb-5">
                  {b.icon}
                </div>

                <h4 className="font-display text-2xl md:text-3xl uppercase text-white leading-tight tracking-tight">
                  {b.title}
                </h4>
                <p className="font-body text-slate-300 text-sm md:text-base mt-4 leading-relaxed">
                  {b.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <FadeInSection delay={0.3} className="text-center mt-16">
          <a href="#reservar" className="cta-fire">
            Reservar llamada y recibir bonos →
          </a>
          <p className="font-mono text-xs text-slate-400 uppercase tracking-widest mt-4">
            Cupos limitados al mes · Hugo revisa cada aplicación
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}
