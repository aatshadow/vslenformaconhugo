'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeInSection } from '../ui/FadeInSection';

const faqs = [
  {
    q: '¿Y si no tengo tiempo? Tengo trabajo e hijos.',
    a: 'Justamente por eso el Método Acción Fit está diseñado para personas con poco tiempo. El plan de entrenamiento se ajusta a lo que tengas — 30, 45 o 60 minutos — y la alimentación se adapta a tu rutina, no al revés. La inmensa mayoría de los +200 clientes son padres, madres y profesionales con jornadas largas.',
  },
  {
    q: 'Ya he intentado todo. Dietas, gimnasios, apps… ¿Por qué iba a funcionar esto?',
    a: 'Porque no es una dieta ni una rutina genérica. Es un sistema personalizado donde Hugo te acompaña directamente cada semana. Lo que ha fallado siempre no es tu fuerza de voluntad — es que llevabas un método que no estaba hecho para ti. Aquí el plan se ajusta cada 15 días según tus resultados.',
  },
  {
    q: '¿Funciona si tengo más de 40 años?',
    a: 'Sí. Una buena parte de los clientes pasan los 40, los 50 y algunos los 60. El metabolismo cambia con la edad, pero los principios de pérdida de grasa siguen funcionando — con ajustes específicos de intensidad, recuperación y nutrición que Hugo aplica para tu caso.',
  },
  {
    q: '¿Necesito ir al gimnasio?',
    a: 'No. El plan se diseña para gimnasio, casa o aire libre — lo que tú prefieras o tengas a mano. Si solo dispones de mancuernas y bandas, se trabaja con eso. Si tienes gimnasio completo, se aprovecha al máximo. Ambas opciones funcionan.',
  },
  {
    q: '¿Cómo es el seguimiento? ¿Es realmente personal?',
    a: 'Soporte directo por WhatsApp 24/7 con Hugo y su equipo. Revisiones quincenales 1-a-1 donde se revisa tu progreso, se ajustan macros, entrenamiento y se resuelven dudas. No es un grupo masivo ni un curso pregrabado. Es acompañamiento real.',
  },
  {
    q: '¿Tengo que pasar hambre o eliminar alimentos?',
    a: 'No. La alimentación es flexible: comes lo que te gusta, en cantidades calculadas para tu objetivo. Pizza un sábado, cerveza con amigos, postres ocasionales — todo cabe si se planifica. Lo que NO hay son prohibiciones absurdas que no se sostienen.',
  },
  {
    q: '¿Cuánto tarda en verse el resultado?',
    a: 'Los primeros cambios visibles aparecen en 2-3 semanas. La transformación clara, entre 6 y 8 semanas. Y si en los primeros 15 días siguiendo el plan al pie de la letra no ves nada, te devuelvo el 100% del dinero.',
  },
];

function FAQItem({ item, idx, openIdx, setOpenIdx }: any) {
  const isOpen = openIdx === idx;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: idx * 0.05 }}
      className="rounded-xl glass-card overflow-hidden hover:border-fire/30 transition-colors"
    >
      <button
        onClick={() => setOpenIdx(isOpen ? null : idx)}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left group"
      >
        <span className="font-display text-lg md:text-xl uppercase tracking-tight text-white leading-tight">
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 w-9 h-9 rounded-full bg-fire/10 border border-fire/30 flex items-center justify-center text-fire group-hover:bg-fire group-hover:text-white transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-6 font-body text-slate-300 text-sm md:text-base leading-relaxed">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-16 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        <FadeInSection className="text-center mb-14">
          <span className="section-eyebrow">Preguntas frecuentes</span>
          <h2 className="font-display text-[clamp(34px,9vw,64px)] md:text-7xl uppercase mt-6 tracking-[-0.02em] leading-[0.92]">
            Te leo <span className="text-fire-gradient">la mente.</span>
          </h2>
          <p className="font-body text-slate-300 text-base md:text-lg mt-5">
            Las dudas que probablemente tienes ahora — resueltas antes de la llamada.
          </p>
        </FadeInSection>

        <div className="space-y-3">
          {faqs.map((item, idx) => (
            <FAQItem key={idx} item={item} idx={idx} openIdx={openIdx} setOpenIdx={setOpenIdx} />
          ))}
        </div>

        <FadeInSection delay={0.2} className="text-center mt-14">
          <p className="font-body text-slate-300 text-base">
            ¿Tienes otra duda? Hugo te la resuelve en la llamada.
          </p>
          <a href="#reservar" className="cta-fire mt-6">
            Reservar mi llamada →
          </a>
        </FadeInSection>
      </div>
    </section>
  );
}
