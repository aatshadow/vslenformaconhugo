'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedText } from '../ui/AnimatedText';

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.controls = true;
    v.play();
    setPlaying(true);
  };

  return (
    <section
      id="top"
      className="relative flex flex-col items-center justify-center px-4 pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden min-h-[100svh] md:min-h-screen"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-60" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fire-radial blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink pointer-events-none" />

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10"
      >
        <span className="section-eyebrow">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-fire mr-2 animate-pulse" />
          Método Acción Fit · +200 transformaciones reales
        </span>
      </motion.div>

      {/* Main headline */}
      <div className="relative z-10 text-center mt-8 max-w-5xl">
        <AnimatedText
          as="h1"
          text="PIERDE ENTRE"
          className="block font-display text-[clamp(36px,9vw,88px)] leading-[0.95] uppercase tracking-[-0.01em] text-white text-fire-glow"
          delay={0.4}
        />
        <AnimatedText
          as="h1"
          text="4 Y 10 KILOS"
          className="block font-display text-[clamp(54px,15vw,140px)] leading-[0.9] uppercase tracking-[-0.02em] text-fire-gradient drop-shadow-[0_0_40px_rgba(255,69,0,0.45)] my-1"
          delay={0.7}
        />
        <AnimatedText
          as="h1"
          text="EN 8 SEMANAS"
          className="block font-display text-[clamp(36px,9vw,88px)] leading-[0.95] uppercase tracking-[-0.01em] text-white text-fire-glow"
          delay={1.0}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="font-body text-[15px] md:text-xl text-slate-200 mt-6 md:mt-8 max-w-2xl mx-auto leading-relaxed px-2"
        >
          Sin pasar hambre. Sin entrenar dos horas al día.
          <br className="hidden md:block" />
          <span className="text-fire-light"> Sin depender de la motivación.</span>
        </motion.p>
      </div>

      {/* VSL Video */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-3xl mt-8 md:mt-12"
      >
        {/* Glow halo */}
        <div className="absolute -inset-2 bg-fire-gradient opacity-40 blur-2xl rounded-2xl animate-pulse-fire" />

        <div className="relative rounded-2xl overflow-hidden border border-fire/20 bg-slate-950 shadow-fire-xl">
          <video
            ref={videoRef}
            playsInline
            preload="metadata"
            poster=""
            className="w-full aspect-video block bg-black"
            onClick={!playing ? handlePlay : undefined}
          >
            <source src="/vsl.mp4" type="video/mp4" />
          </video>

          {!playing && (
            <button
              aria-label="Reproducir VSL"
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/20 to-black/40 group cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-fire/40 blur-2xl rounded-full" />
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-fire flex items-center justify-center shadow-fire-lg border-2 border-white/90">
                  <svg viewBox="0 0 24 24" fill="white" className="w-9 h-9 md:w-11 md:h-11 ml-1.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </motion.div>

              <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs tracking-[0.3em] uppercase text-white/80">
                ▶ Ver el método completo
              </span>
            </button>
          )}
        </div>
      </motion.div>

      {/* CTA below video */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.0 }}
        className="relative z-10 mt-8 md:mt-10 flex flex-col items-center gap-4 px-2"
      >
        <p className="font-display text-[clamp(22px,6vw,40px)] md:text-4xl uppercase tracking-tight text-center max-w-2xl leading-[1.05]">
          ¿Listo para ser el próximo <span className="text-fire">caso de éxito</span>?
        </p>
        <a href="#reservar" className="cta-fire !text-[15px] md:!text-[17px]">
          Reservar mi llamada gratis →
        </a>
        <p className="font-mono text-[10px] md:text-xs text-slate-400 uppercase tracking-widest mt-1 text-center leading-relaxed">
          1-a-1 con Hugo · Sin coste · Cupos limitados al mes
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-500">
          Desliza
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="w-px h-8 bg-gradient-to-b from-fire to-transparent"
        />
      </motion.div>
    </section>
  );
}
