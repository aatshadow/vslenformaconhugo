'use client';

import { motion } from 'framer-motion';
import { FadeInSection } from '../ui/FadeInSection';

const cases = [
  {
    name: 'Laura',
    metric: '-9 kg en 10 sem',
    quote:
      'Llevaba 4 años yendo al gym sin resultados visibles. En 10 semanas con Hugo he conseguido lo que no había logrado en años. Pero lo mejor no es el peso — es lo bien que me siento.',
    role: 'Madre · 38 años',
  },
  {
    name: 'David',
    metric: '+6 kg músculo',
    quote:
      'Vine a perder grasa y me quedé porque entendí cómo funciona mi cuerpo. Hugo no es un entrenador más, es alguien que te enseña a pensar tu nutrición y entreno.',
    role: 'Empresario · 31 años',
  },
  {
    name: 'Carolina',
    metric: 'Recomposición total',
    quote:
      'Lo que me cambió la vida no fue el plan en sí, fue saber que cada 15 días tenía a alguien revisando lo que hacía. Por fin alguien que no me dejaba abandonar.',
    role: 'Enfermera · 42 años',
  },
];

export function TestimoniosDestacados() {
  return (
    <section className="relative py-14 md:py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-slate-950 to-ink pointer-events-none" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-fire-radial blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-fire-radial blur-3xl opacity-30 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <FadeInSection className="text-center mb-14">
          <span className="section-eyebrow">No estás solo</span>
          <h2 className="font-display text-4xl md:text-6xl uppercase mt-6 tracking-tight leading-[0.95]">
            Ellos también <br />
            <span className="text-fire-gradient">tuvieron esta llamada.</span>
          </h2>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative p-6 md:p-7 rounded-2xl bg-gradient-to-br from-slate-900 to-ink border border-fire/20 overflow-hidden"
            >
              {/* Image placeholder */}
              <div className="aspect-[4/3] rounded-xl bg-slate-950 border border-white/5 mb-5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex">
                  <div className="flex-1 flex flex-col items-center justify-center border-r border-fire/10">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Antes</span>
                    <div className="w-10 h-10 mt-2 rounded-full bg-slate-800/60" />
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center bg-fire/5">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-fire-light">Después</span>
                    <div className="w-10 h-10 mt-2 rounded-full bg-fire/30" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-display text-xl uppercase text-white">{c.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mt-0.5">{c.role}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-fire text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                  {c.metric}
                </span>
              </div>

              <p className="font-body text-slate-300 text-sm italic leading-relaxed">
                &ldquo;{c.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>

        <FadeInSection delay={0.3} className="text-center mt-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-slate-400">
            +200 historias como estas · y la próxima es la tuya
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}
