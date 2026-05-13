'use client';

import { motion } from 'framer-motion';
import { FadeInSection } from '../ui/FadeInSection';

const milestones = [
  {
    week: 'Semana 2',
    title: 'Empiezas a notar la ropa',
    desc: 'La cintura se afloja. La energía sube. La gente del trabajo te lo dice.',
  },
  {
    week: 'Semana 4',
    title: 'El espejo cambia',
    desc: 'Ves marcar lo que llevabas años queriendo ver. Te sacas la foto.',
  },
  {
    week: 'Semana 8',
    title: 'Eres otra persona',
    desc: 'No solo el cuerpo. La cabeza. La confianza. El hambre de más.',
  },
];

export function HypeBlock({ firstName }: { firstName: string }) {
  const name = firstName || 'tú';

  return (
    <section className="relative py-16 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-fire-radial blur-3xl opacity-40 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <FadeInSection className="text-center mb-14">
          <span className="section-eyebrow">Imagina esto</span>
          <h2 className="font-display text-[clamp(34px,9vw,64px)] md:text-7xl lg:text-8xl uppercase mt-6 tracking-[-0.02em] leading-[0.9]">
            Dentro de <br />
            <span className="text-fire-gradient">8 semanas, {name}…</span>
          </h2>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-5">
          {milestones.map((m, i) => (
            <motion.div
              key={m.week}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-7 md:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-ink border border-fire/20 overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-fire/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="inline-block px-3 py-1 rounded-full bg-fire/10 border border-fire/30 font-mono text-[10px] uppercase tracking-[0.25em] text-fire-light">
                  {m.week}
                </div>
                <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight leading-tight text-white mt-5">
                  {m.title}
                </h3>
                <p className="font-body text-slate-300 text-sm md:text-base mt-3 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <FadeInSection delay={0.3} className="mt-16">
          <div className="relative max-w-3xl mx-auto p-8 md:p-10 rounded-3xl bg-gradient-to-br from-fire/15 to-fire/5 border border-fire/40 text-center overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-fire/30 blur-3xl rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-fire/30 blur-3xl rounded-full" />

            <p className="relative font-display text-2xl md:text-4xl uppercase tracking-tight leading-tight">
              Esta llamada <br />
              <span className="text-fire-gradient">es el principio.</span>
            </p>
            <p className="relative font-body text-slate-200 text-base md:text-lg mt-5 max-w-xl mx-auto leading-relaxed">
              Hugo no acepta a todo el mundo. Si encajas en el método, te lo dirá. Si no, también. <span className="text-fire-light font-semibold">Pero el primer paso ya está dado.</span>
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
