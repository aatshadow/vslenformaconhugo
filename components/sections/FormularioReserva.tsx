'use client';

import { FadeInSection } from '../ui/FadeInSection';

// Agenda real de Hugo embebida en la propia página.
//
// El host `hugo` apunta al Google Calendar de Martina (= agenda de Hugo), así
// que la reserva queda agendada DE VERDAD en GCal con confirmación por email.
// La página de booking ya incluye el formulario de cualificación (hugo_intake:
// nombre/email/teléfono + objetivo + momento + listo-a-invertir) y, al reservar,
// el hook `enformaconhugo-booked` mete el lead en el pipeline "VSL En Forma con
// Hugo". Por eso aquí solo embebemos la agenda: el lead elige día/hora y reserva
// sin salir de web.enformaconhugo.com.
//
// `embed=1` permite a la página de booking ocultar cromo innecesario si aplica.
const BOOKING_URL =
  'https://central.blackwolfsec.io/book/enformaconhugo/hugo?utm_source=vsl-form&utm_campaign=enformaconhugo-vsl&embed=1';

export function FormularioReserva() {
  return (
    <section id="reservar" className="relative py-16 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-slate-950 to-ink pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-fire-radial blur-3xl opacity-50 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        <FadeInSection className="text-center mb-10 md:mb-12">
          <span className="section-eyebrow">Último paso</span>
          <h2 className="font-display text-[clamp(34px,9vw,64px)] md:text-7xl uppercase mt-6 tracking-[-0.02em] leading-[0.92]">
            Reserva tu <br />
            <span className="text-fire-gradient">llamada gratis.</span>
          </h2>
          <p className="font-body text-slate-300 text-base md:text-lg mt-6 max-w-xl mx-auto leading-relaxed">
            Elige el día y la hora que mejor te venga. Responde unas preguntas rápidas y tu
            llamada con Hugo queda <span className="text-fire-light font-semibold">reservada al instante</span>.
          </p>
        </FadeInSection>

        <FadeInSection>
          {/* Agenda real embebida — el lead reserva aquí mismo (host de Hugo) */}
          <div className="relative rounded-3xl overflow-hidden border border-fire/30 bg-slate-950 shadow-2xl">
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-fire/30 via-fire/5 to-transparent blur-sm pointer-events-none" />
            <iframe
              src={BOOKING_URL}
              title="Agenda tu llamada con Hugo"
              className="relative w-full block"
              style={{ height: 'min(1150px, 88vh)', border: 0 }}
              loading="lazy"
              allow="clipboard-write"
            />
          </div>

          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500 text-center pt-4">
            ¿No ves la agenda?{' '}
            <a
              href={BOOKING_URL.replace('&embed=1', '')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fire-light underline"
            >
              Ábrela en una pestaña nueva →
            </a>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-5 text-center">
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
              🔒 Datos 100% privados
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
              ⚡ Confirmación inmediata
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
              🎁 Bonos incluidos
            </span>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
