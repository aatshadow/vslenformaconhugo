'use client';

import { motion } from 'framer-motion';
import { FadeInSection } from '../ui/FadeInSection';

// Placeholder testimonios — Alex completará con sus videos/fotos reales
const beforeAfterCases = [
  {
    name: 'Marco',
    metric: '-7 kg',
    quote: 'Sin pasar hambre y comiendo lo que me gusta. Brutal.',
  },
  {
    name: 'Ignacio',
    metric: 'Transformación completa',
    quote: '8 semanas y no me reconozco. Lo más fácil que he hecho.',
  },
  {
    name: 'María',
    metric: 'Volumen limpio',
    quote: 'Cero ansiedad por la comida. Por fin disfruto el proceso.',
  },
];

const carouselA = Array.from({ length: 10 }, (_, i) => i + 1);
const carouselB = Array.from({ length: 10 }, (_, i) => i + 11);

function TestimonioPlaceholder({ idx }: { idx: number }) {
  return (
    <div className="flex-shrink-0 w-[220px] md:w-[300px] aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 relative group">
      {/* Mock chat bubble decoration */}
      <div className="absolute inset-0 p-5 flex flex-col justify-end">
        <div className="space-y-2 opacity-30">
          <div className="h-3 w-3/4 rounded-full bg-fire/40" />
          <div className="h-3 w-1/2 rounded-full bg-slate-600" />
          <div className="h-3 w-2/3 rounded-full bg-fire/40 ml-auto" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <span className="px-2.5 py-1 rounded-md bg-fire/15 border border-fire/30 font-mono text-[10px] uppercase tracking-widest text-fire-light">
          Caso #{idx.toString().padStart(2, '0')}
        </span>
        <span className="font-mono text-[10px] text-slate-500">8 sem</span>
      </div>
      <div className="absolute bottom-5 left-5 right-5">
        <div className="font-display text-lg uppercase text-white leading-tight">
          Placeholder
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mt-1">
          Tu testimonio aquí
        </div>
      </div>
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-fire/0 group-hover:bg-fire/5 transition-colors pointer-events-none" />
    </div>
  );
}

export function Testimonios() {
  return (
    <section id="testimonios" className="relative py-16 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4">
        <FadeInSection className="text-center mb-14">
          <span className="section-eyebrow">Resultados reales</span>
          <h2 className="font-display text-[clamp(34px,9vw,64px)] md:text-7xl uppercase mt-6 tracking-[-0.02em] leading-[0.92]">
            +200 personas <span className="block text-fire-gradient">ya lo hicieron.</span>
          </h2>
          <p className="font-body text-slate-300 text-base md:text-lg mt-6 max-w-2xl mx-auto">
            No tienen nada especial. Solo tuvieron un sistema. Y se atrevieron.
          </p>
        </FadeInSection>

        {/* Featured cases */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {beforeAfterCases.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative p-1 rounded-2xl bg-gradient-to-br from-fire/40 via-fire/10 to-transparent"
            >
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 to-ink p-6 h-full overflow-hidden">
                {/* Image placeholder */}
                <div className="aspect-square rounded-xl bg-slate-950 border border-white/5 mb-5 flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 flex">
                    <div className="flex-1 flex flex-col items-center justify-center border-r border-fire/10">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Antes</span>
                      <div className="w-12 h-12 mt-2 rounded-full bg-slate-800/60" />
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center bg-fire/5">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-fire-light">Después</span>
                      <div className="w-12 h-12 mt-2 rounded-full bg-fire/30" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="font-display text-2xl uppercase text-white">{c.name}</div>
                  <div className="px-3 py-1 rounded-full bg-fire text-white font-mono text-xs font-bold uppercase tracking-wider">
                    {c.metric}
                  </div>
                </div>
                <p className="font-body text-slate-300 text-sm italic leading-relaxed">
                  &ldquo;{c.quote}&rdquo;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee Row 1 */}
      <div className="relative overflow-hidden mb-5">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none" />
        <div className="flex gap-4 md:gap-5 animate-marquee w-max">
          {[...carouselA, ...carouselA].map((n, i) => (
            <TestimonioPlaceholder key={`a-${i}`} idx={n} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (reverse) */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none" />
        <div className="flex gap-4 md:gap-5 animate-marquee-reverse w-max">
          {[...carouselB, ...carouselB].map((n, i) => (
            <TestimonioPlaceholder key={`b-${i}`} idx={n} />
          ))}
        </div>
      </div>

      <FadeInSection className="text-center mt-16 px-4">
        <p className="font-display text-2xl md:text-4xl uppercase tracking-tight leading-tight max-w-2xl mx-auto">
          ¿Serás el <span className="text-fire">próximo caso de éxito?</span>
        </p>
        <a href="#reservar" className="cta-fire mt-8">
          Reservar mi llamada →
        </a>
      </FadeInSection>
    </section>
  );
}
