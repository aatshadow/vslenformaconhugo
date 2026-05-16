'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeInSection } from '../ui/FadeInSection';

const YT_ID = 'B4eODo3iIt8';
const YT_THUMB = `https://i.ytimg.com/vi/${YT_ID}/maxresdefault.jpg`;
const YT_EMBED = `https://www.youtube.com/embed/${YT_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

export function VideoRecurso() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative py-14 md:py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-slate-950 to-ink pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        <FadeInSection className="text-center mb-10">
          <span className="section-eyebrow">Mientras tanto · paso 1 de 3</span>
          <h2 className="font-display text-4xl md:text-6xl uppercase mt-6 tracking-tight leading-[0.95]">
            Mira este vídeo <span className="block text-fire-gradient">antes de la llamada.</span>
          </h2>
          <p className="font-body text-slate-300 text-base md:text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            Hugo grabó este mensaje específicamente para ti. Tarda menos de lo que crees — y va a cambiar la forma en la que ves tu proceso.
          </p>
        </FadeInSection>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-2 bg-fire-gradient opacity-30 blur-2xl rounded-2xl animate-pulse-fire" />

          <div className="relative rounded-2xl overflow-hidden border border-fire/20 bg-slate-950 shadow-fire-xl aspect-video">
            {playing ? (
              <iframe
                src={YT_EMBED}
                title="Mensaje de Hugo · post-VSL"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <button
                type="button"
                aria-label="Reproducir vídeo"
                onClick={() => setPlaying(true)}
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={YT_THUMB}
                  alt="Mensaje de Hugo — vista previa"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative">
                  <div className="absolute inset-0 bg-fire/40 blur-2xl rounded-full" />
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-fire flex items-center justify-center shadow-fire-lg border-2 border-white/90">
                    <svg viewBox="0 0 24 24" fill="white" className="w-9 h-9 md:w-11 md:h-11 ml-1.5">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </motion.div>
                <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs tracking-[0.3em] uppercase text-white/80">
                  ▶ Ver mensaje de Hugo
                </span>
              </button>
            )}
          </div>
        </motion.div>

        <FadeInSection delay={0.2} className="mt-8 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-slate-400">
            ⚡ Tip: mira el vídeo entero · te ahorra 10 min en la llamada
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}
