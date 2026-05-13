'use client';

import { motion } from 'framer-motion';

export function ConfirmacionHero({ firstName }: { firstName: string }) {
  const now = new Date();
  const fechaTxt = now.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  const horaTxt = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  return (
    <section className="relative pt-12 md:pt-20 pb-14 md:pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-fire-radial blur-3xl opacity-50 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        {/* Warning banner — DON'T LEAVE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex items-center justify-center gap-3 p-4 rounded-2xl bg-fire/10 border border-fire/40"
        >
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="inline-block w-3 h-3 rounded-full bg-fire shadow-fire-sm"
          />
          <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.25em] text-fire-light font-bold text-center">
            ⚠ Atención · No cierres esta página · Información clave abajo
          </span>
        </motion.div>

        {/* Confirmación box — screenshot friendly */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-fire/60 via-fire/20 to-transparent blur-sm" />

          <div className="relative p-8 md:p-14 rounded-3xl bg-gradient-to-br from-slate-900 to-ink border border-fire/30 text-center">
            {/* Big check */}
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 14, stiffness: 110, delay: 0.4 }}
              className="relative w-24 h-24 md:w-28 md:h-28 mx-auto mb-7"
            >
              <div className="absolute inset-0 bg-fire/40 blur-2xl rounded-full" />
              <div className="relative w-full h-full rounded-full bg-fire-gradient flex items-center justify-center shadow-fire-xl border-4 border-fire-light/30">
                <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 md:w-14 md:h-14 text-white">
                  <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <span className="section-eyebrow !text-emerald-400 !border-emerald-400/40 !bg-emerald-400/10">
                ✓ Reserva confirmada
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-display text-[clamp(40px,11vw,84px)] md:text-7xl uppercase tracking-[-0.02em] leading-[0.92] mt-6"
            >
              ¡Enhorabuena!
              <br />
              <span className="text-fire-gradient">¡Estás dentro!</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="font-body text-slate-200 text-base md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed"
            >
              {firstName ? `${firstName}, hemos` : 'Hemos'} recibido tu aplicación. Hugo la revisa <span className="text-fire-light font-semibold">personalmente</span> antes de la llamada.
            </motion.p>

            {/* Receipt mini-card — para captura */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 inline-flex flex-col md:flex-row items-center gap-4 md:gap-8 px-6 py-5 rounded-2xl bg-slate-950/80 border border-white/10"
            >
              <div className="text-left">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">Aplicación</div>
                <div className="font-display text-lg uppercase text-white mt-1">#{Math.random().toString(36).slice(2, 8).toUpperCase()}</div>
              </div>
              <div className="hidden md:block w-px h-10 bg-white/10" />
              <div className="text-left">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">Fecha</div>
                <div className="font-display text-lg uppercase text-white mt-1">{fechaTxt} · {horaTxt}</div>
              </div>
              <div className="hidden md:block w-px h-10 bg-white/10" />
              <div className="text-left">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">Estado</div>
                <div className="font-display text-lg uppercase text-fire mt-1">En revisión</div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 mt-6"
            >
              📸 Haz captura de pantalla como confirmación
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
