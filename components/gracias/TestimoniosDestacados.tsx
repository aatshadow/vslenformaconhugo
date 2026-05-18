'use client';

import { motion } from 'framer-motion';
import { FadeInSection } from '../ui/FadeInSection';
import { asset } from '@/lib/basePath';

const videoSrcs = [
  '/testimonios/videos/video_01.mp4',
  '/testimonios/videos/video_02.mp4',
  '/testimonios/videos/video_03.mp4',
  '/testimonios/videos/video_04.mp4',
  '/testimonios/videos/video_05.mp4',
  '/testimonios/videos/video_06.mp4',
  '/testimonios/videos/video_07.mp4',
  '/testimonios/videos/video_08.mp4',
  '/testimonios/videos/video_09.mp4',
  '/testimonios/videos/video_10.mp4',
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {videoSrcs.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="relative rounded-2xl border border-fire/20 bg-black overflow-hidden aspect-[9/16]"
            >
              <video
                src={asset(src)}
                controls
                preload="metadata"
                playsInline
                className="absolute inset-0 w-full h-full object-cover bg-black"
              />
              <div className="absolute top-2 left-2 pointer-events-none">
                <span className="px-2 py-0.5 rounded bg-fire/90 text-white font-mono text-[10px] font-bold uppercase tracking-widest">
                  ▶ Caso #{(i + 1).toString().padStart(2, '0')}
                </span>
              </div>
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
