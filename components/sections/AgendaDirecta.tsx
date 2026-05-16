'use client';

import { motion } from 'framer-motion';
import { FadeInSection } from '../ui/FadeInSection';

// Booking host de Hugo en Dashboard-Ops (slug=enformaconhugo, host=hugo).
// 30 min, L-D 11:00→22:00 (Europe/Madrid).
const AGENDA_URL = 'https://central.blackwolfsec.io/enformaconhugo/agendas/hugo';

const HORARIO = [
  { dias: 'Lunes a Domingo', rango: '11:00 — 22:00', zona: 'Hora España (Europe/Madrid)' },
];

const DETALLES = [
  { icon: '⏱', titulo: '30 minutos', sub: 'Llamada 1:1 con Hugo' },
  { icon: '📞', titulo: 'Google Meet o teléfono', sub: 'Eliges tú al reservar' },
  { icon: '🎯', titulo: 'Sin compromiso', sub: 'Si encajamos, hablamos del plan' },
];

type Props = {
  /**
   * `gate` (default, en la VSL): bloquea hasta rellenar el form — el CTA scrollea a `#reservar`.
   * `unlocked` (en /gracias): el lead ya ha rellenado el form, el CTA abre la agenda real.
   */
  mode?: 'gate' | 'unlocked';
};

export function AgendaDirecta({ mode = 'gate' }: Props) {
  const unlocked = mode === 'unlocked';

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="agenda-directa"
      className="relative py-16 md:py-28 px-4 overflow-hidden border-t border-white/5"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-slate-950 to-ink pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-fire-radial blur-3xl opacity-30 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        <FadeInSection className="text-center mb-10">
          <span className="section-eyebrow">
            {unlocked ? 'Reserva ya tu hueco' : 'Horario de atención'}
          </span>
          <h2 className="font-display text-[clamp(28px,7vw,52px)] md:text-6xl uppercase mt-5 tracking-[-0.02em] leading-[0.95]">
            {unlocked ? (
              <>Elige tu hueco <br/><span className="text-fire-gradient">con Hugo.</span></>
            ) : (
              <>Estos son los huecos <br/><span className="text-fire-gradient">disponibles con Hugo.</span></>
            )}
          </h2>
          <p className="font-body text-slate-300 text-base md:text-lg mt-5 max-w-xl mx-auto leading-relaxed">
            {unlocked
              ? 'Ya tienes el acceso desbloqueado. Abre la agenda y elige el hueco de 30 minutos que mejor te encaje — Hugo lo confirma automáticamente en su Google Calendar.'
              : 'Para reservar tu llamada de 30 minutos primero tienes que completar el formulario — Hugo lo lee antes de cada llamada y solo así te abrimos el acceso a la agenda.'}
          </p>
        </FadeInSection>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-fire/40 via-fire/10 to-transparent blur-sm" />
          <div className="relative p-6 md:p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-ink border border-fire/20">
            {/* Horario */}
            <div className="mb-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-3">
                Horario de atención
              </p>
              <div className="space-y-2">
                {HORARIO.map((h) => (
                  <div
                    key={h.dias}
                    className="flex items-center justify-between rounded-xl bg-slate-950/60 border border-white/10 px-4 py-3"
                  >
                    <div>
                      <p className="font-body text-white text-sm md:text-base font-semibold">{h.dias}</p>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mt-0.5">
                        {h.zona}
                      </p>
                    </div>
                    <p className="font-display text-fire-light text-xl md:text-2xl tracking-tight">
                      {h.rango}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Detalles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
              {DETALLES.map((d) => (
                <div
                  key={d.titulo}
                  className="rounded-xl bg-slate-950/60 border border-white/10 px-4 py-3 text-center"
                >
                  <div className="text-2xl mb-1.5">{d.icon}</div>
                  <p className="font-body text-white text-sm font-semibold leading-tight">
                    {d.titulo}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mt-1">
                    {d.sub}
                  </p>
                </div>
              ))}
            </div>

            {/* Aviso */}
            <div className="mb-5 rounded-xl border border-fire/40 bg-fire/10 px-4 py-3 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fire-light leading-relaxed">
                {unlocked
                  ? '✅ Acceso desbloqueado — formulario completado'
                  : '⚠ El formulario es obligatorio para acceder a la agenda'}
              </p>
            </div>

            {/* CTA */}
            {unlocked ? (
              <a
                href={AGENDA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-fire w-full !py-5 !text-base flex items-center justify-center gap-2"
              >
                <span>Abrir agenda y reservar mi hueco</span>
                <span aria-hidden="true">→</span>
              </a>
            ) : (
              <a
                href="#reservar"
                onClick={scrollToForm}
                className="cta-fire w-full !py-5 !text-base flex items-center justify-center gap-2"
              >
                <span>Completar formulario y reservar</span>
                <span aria-hidden="true">→</span>
              </a>
            )}

            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500 text-center mt-4">
              🔒 Slots actualizados en vivo · Google Calendar de Hugo
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
