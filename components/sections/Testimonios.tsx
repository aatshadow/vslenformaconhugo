'use client';

import { motion } from 'framer-motion';
import { FadeInSection } from '../ui/FadeInSection';
import { asset } from '@/lib/basePath';

type Case = {
  name: string;
  metric: string;
  quote: string;
  before?: string;
  after?: string;
};

const beforeAfterCases: Case[] = [
  {
    name: 'Marco',
    metric: '-7 kg',
    quote: 'Sin pasar hambre y comiendo lo que me gusta. Brutal.',
    before: '/testimonios/marco_antes.jpg',
    after: '/testimonios/marco_despues.jpg',
  },
  {
    name: 'Ignacio',
    metric: 'Transformación completa',
    quote: '8 semanas y no me reconozco. Lo más fácil que he hecho.',
    before: '/testimonios/ignacio_antes.jpg',
    after: '/testimonios/ignacio_despues.jpg',
  },
  {
    name: 'María',
    metric: 'Volumen limpio',
    quote: 'Cero ansiedad por la comida. Por fin disfruto el proceso.',
    before: '/testimonios/maria_antes.jpg',
    after: '/testimonios/maria_despues.jpg',
  },
];

type CarouselItem =
  | { kind: 'image'; src: string; headline: string; caption: string }
  | { kind: 'video'; src: string; headline: string };

const carouselA: CarouselItem[] = [
  {
    kind: 'image',
    src: '/testimonios/texto/talla46_a_40.jpg',
    headline: 'De la 46 a la 40',
    caption: '«Quien coño lo diría en 2 meses.»',
  },
  {
    kind: 'image',
    src: '/testimonios/texto/chat_03_talla_m_38.jpg',
    headline: 'Talla M · 38',
    caption: '«Me veo más plana, ropa que no me ponía hace años.»',
  },
  {
    kind: 'image',
    src: '/testimonios/texto/chat_04_espalda_dominadas.jpg',
    headline: 'Dominadas libres',
    caption: '«La espalda mucho más marcada. Muy contenta, Hugo.»',
  },
  {
    kind: 'image',
    src: '/testimonios/texto/chat_05_merito_tuyo.jpg',
    headline: '«Mérito tuyo»',
    caption: '«Sin tu ayuda nada sería posible.»',
  },
  {
    kind: 'video',
    src: '/testimonios/audios/audio_1.mp4',
    headline: 'Audio cliente',
  },
  {
    kind: 'image',
    src: '/testimonios/texto/chat_06_pantalon_m.jpg',
    headline: 'Pantalón M',
    caption: '«Creo que desde mi comunión no ocurría esto.»',
  },
  {
    kind: 'image',
    src: '/testimonios/texto/chat_07_mejor_con_mi_cuerpo.jpg',
    headline: 'Por fin tops',
    caption: '«Antes ropa ancha, ocultándome. Ahora me veo mejor.»',
  },
  {
    kind: 'image',
    src: '/testimonios/texto/chat_08_se_nota_espalda.jpg',
    headline: 'Se nota fuera',
    caption: '«Amigos: se te nota bastante en la espalda.»',
  },
  {
    kind: 'image',
    src: '/testimonios/texto/chat_09_porciones.jpg',
    headline: 'Aprendiendo a comer',
    caption: '«Las porciones son geniales. Es genial.»',
  },
  {
    kind: 'video',
    src: '/testimonios/audios/audio_3.mp4',
    headline: 'Audio cliente',
  },
];

const carouselB: CarouselItem[] = [
  {
    kind: 'image',
    src: '/testimonios/texto/10kg_2meses.jpg',
    headline: '-10 kg en 2 meses',
    caption: '«A nada de bajar de los 80. Gracias a ti.»',
  },
  {
    kind: 'image',
    src: '/testimonios/texto/chat_10_1_3kg_emocion.jpg',
    headline: '-1,3 kg en 1 semana',
    caption: '«Me he emocionado esta mañana al verlo.»',
  },
  {
    kind: 'image',
    src: '/testimonios/texto/chat_11_entrenos_cumplidos.jpg',
    headline: 'Cero excusas',
    caption: '«Esta semana cumplidos todos los entrenos.»',
  },
  {
    kind: 'image',
    src: '/testimonios/texto/chat_12_definida_tonificada.jpg',
    headline: 'Definida y tonificada',
    caption: '«Me veo genial físicamente. Muy muy contenta.»',
  },
  {
    kind: 'video',
    src: '/testimonios/audios/audio_2.mp4',
    headline: 'Audio cliente',
  },
  {
    kind: 'image',
    src: '/testimonios/texto/chat_13_cambios_visibles.jpg',
    headline: 'Cambios visibles',
    caption: '«La celulitis se va, me voy viendo menos. Qué feliz.»',
  },
  {
    kind: 'image',
    src: '/testimonios/texto/chat_14_abuelo_orgulloso.jpg',
    headline: 'Mi abuelo orgulloso',
    caption: '«Lo más especial del mundo. Le hace feliz verme así.»',
  },
  {
    kind: 'image',
    src: '/testimonios/texto/chat_15_frutos.jpg',
    headline: 'Sus frutos',
    caption: '«Pensaba que no habría bajado y mira: ha dado sus frutos.»',
  },
  {
    kind: 'image',
    src: '/testimonios/texto/chat_16_full_dieta.jpg',
    headline: 'Full dieta y movimiento',
    caption: '«La semana súper bien y activa. Full dieta.»',
  },
  {
    kind: 'video',
    src: '/testimonios/audios/audio_4.mp4',
    headline: 'Audio cliente',
  },
];

const CARD_BASE =
  'flex-shrink-0 w-[220px] md:w-[300px] aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 relative';

function CarouselCard({ item }: { item: CarouselItem }) {
  if (item.kind === 'image') {
    return (
      <div className={`${CARD_BASE} bg-black`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(item.src)}
          alt={item.headline}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent p-4 pt-10">
          <div className="font-display text-base md:text-lg uppercase text-white leading-tight">
            {item.headline}
          </div>
          <p className="font-body text-slate-300 text-[11px] md:text-xs italic mt-1 leading-snug">
            {item.caption}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${CARD_BASE} bg-black group`}>
      <video
        src={asset(item.src)}
        controls
        preload="metadata"
        playsInline
        className="absolute inset-0 w-full h-full object-cover bg-black"
      />
      <div className="absolute top-3 left-3 pointer-events-none">
        <span className="px-2.5 py-1 rounded-md bg-fire text-white font-mono text-[10px] font-bold uppercase tracking-widest">
          ▶ {item.headline}
        </span>
      </div>
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
                {/* Before/After */}
                <div className="aspect-square rounded-xl bg-slate-950 border border-white/5 mb-5 overflow-hidden relative">
                  <div className="absolute inset-0 grid grid-cols-2">
                    {/* Antes */}
                    <div className="relative border-r border-fire/10 overflow-hidden">
                      {c.before ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={asset(c.before)}
                          alt={`${c.name} — antes`}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-slate-800/60" />
                        </div>
                      )}
                      <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/70 to-transparent px-2 py-1.5">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/90">Antes</span>
                      </div>
                    </div>
                    {/* Después */}
                    <div className="relative bg-fire/5 overflow-hidden">
                      {c.after ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={asset(c.after)}
                          alt={`${c.name} — después`}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2">
                          <div className="w-12 h-12 rounded-full bg-fire/30" />
                          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 mt-2">
                            Foto<br/>pendiente
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/70 to-transparent px-2 py-1.5 text-right">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-fire-light">Después</span>
                      </div>
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
      <div className="relative overflow-hidden mb-5 group/marquee">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none" />
        <div className="flex gap-4 md:gap-5 animate-marquee w-max group-hover/marquee:[animation-play-state:paused]">
          {[...carouselA, ...carouselA].map((it, i) => (
            <CarouselCard key={`a-${i}`} item={it} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (reverse) */}
      <div className="relative overflow-hidden group/marquee">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none" />
        <div className="flex gap-4 md:gap-5 animate-marquee-reverse w-max group-hover/marquee:[animation-play-state:paused]">
          {[...carouselB, ...carouselB].map((it, i) => (
            <CarouselCard key={`b-${i}`} item={it} />
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
