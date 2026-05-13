'use client';

import { motion } from 'framer-motion';
import { FadeInSection } from '../ui/FadeInSection';

const checklist = [
  {
    num: '01',
    title: 'Ten el WhatsApp a mano',
    desc: 'Hugo te llamará directamente por WhatsApp a la hora acordada. Asegúrate de tener cobertura, datos o WiFi, y estar en un sitio tranquilo donde puedas hablar sin interrupciones.',
  },
  {
    num: '02',
    title: 'Ten claro tu objetivo principal',
    desc: 'Pregúntate: ¿qué quieres conseguir exactamente? ¿En qué plazo? Cuanto más concreto, mejor podrá Hugo diseñarte el plan.',
  },
  {
    num: '03',
    title: 'Anota tus 2 mayores frustraciones',
    desc: 'Lo que llevas años intentando sin resultado. Lo que más te ha bloqueado. Esto es lo primero que Hugo rompe en el método.',
  },
  {
    num: '04',
    title: 'Ven con compromiso, no con curiosidad',
    desc: 'Si vienes a "ver qué tal", es una pérdida de tiempo para ambos. Esta llamada es para personas decididas a dar el paso.',
  },
];

export function ComoPrepararte() {
  return (
    <section className="relative py-14 md:py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <FadeInSection className="text-center mb-14">
          <span className="section-eyebrow">Paso 2 de 3</span>
          <h2 className="font-display text-4xl md:text-6xl uppercase mt-6 tracking-tight leading-[0.95]">
            Cómo prepararte <br />
            <span className="text-fire-gradient">para sacar el máximo.</span>
          </h2>
          <p className="font-body text-slate-300 text-base md:text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Esta llamada es <span className="text-fire-light font-semibold">la más importante de tu transformación</span>. Llega listo. Estos 4 pasos te aseguran sacarle todo el jugo.
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-4">
          {checklist.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative p-6 md:p-7 rounded-2xl bg-gradient-to-br from-slate-900 to-ink border border-white/5 hover:border-fire/30 transition-colors group"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <div className="font-display text-4xl md:text-5xl text-fire-gradient leading-none">
                    {item.num}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl md:text-2xl uppercase tracking-tight leading-tight text-white">
                    {item.title}
                  </h3>
                  <p className="font-body text-slate-300 text-sm md:text-base mt-3 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
