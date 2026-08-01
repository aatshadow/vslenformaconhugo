'use client';

import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FadeInSection } from '../ui/FadeInSection';
import { asset } from '@/lib/basePath';
import { makeEventId, getMetaLeadMeta, fireMetaLead } from '@/lib/metaLead';

// Endpoints nativos de central (mismo dominio CORS que enformaconhugo-submit):
//  - SLOTS: huecos reales del host `hugo` (= GCal de Martina/Hugo)
//  - BOOK : crea la reserva real (booking + GCal/Meet + CRM + recordatorios)
// El lead elige día/hora aquí mismo y al reservar va a la thank you page.
const SLOTS_ENDPOINT =
  process.env.NEXT_PUBLIC_SLOTS_ENDPOINT ||
  'https://central.blackwolfsec.io/api/forms/enformaconhugo-slots';
const BOOK_ENDPOINT =
  process.env.NEXT_PUBLIC_BOOK_ENDPOINT ||
  'https://central.blackwolfsec.io/api/forms/enformaconhugo-book';

// Copia del lead al CRM de HELM (helm.s4sf.net/enformaconhugo): crea o
// encuentra el contacto y le engancha las respuestas del formulario a su ficha.
// NO sustituye a la reserva de central — eso sigue siendo lo que crea el evento
// en la agenda de Hugo. Esto es solo para que el equipo lea el cuestionario en
// el CRM, así que se manda después de reservar y sin bloquear nada.
const HELM_ENDPOINT =
  process.env.NEXT_PUBLIC_HELM_ENDPOINT ||
  'https://helm.s4sf.net/api/formularios';
const HELM_PERFIL = 'enformaconhugo';
const HELM_FORM = 'reserva';

const PHONE_PREFIXES = [
  { code: '+34', country: 'España' }, { code: '+52', country: 'México' },
  { code: '+54', country: 'Argentina' }, { code: '+57', country: 'Colombia' },
  { code: '+56', country: 'Chile' }, { code: '+51', country: 'Perú' },
  { code: '+598', country: 'Uruguay' }, { code: '+58', country: 'Venezuela' },
  { code: '+593', country: 'Ecuador' }, { code: '+591', country: 'Bolivia' },
  { code: '+595', country: 'Paraguay' }, { code: '+506', country: 'Costa Rica' },
  { code: '+502', country: 'Guatemala' }, { code: '+503', country: 'El Salvador' },
  { code: '+507', country: 'Panamá' }, { code: '+1', country: 'EE.UU.' },
  { code: '+351', country: 'Portugal' }, { code: '+33', country: 'Francia' },
];

const OBJETIVOS = [
  'Perder grasa (4–10 kg)', 'Definir y marcar músculo', 'Ganar volumen limpio',
  'Recomposición corporal', 'Recuperar forma física', 'Otro',
];

const MOMENTOS = [
  'Llevo años intentándolo sin resultados', 'Acabo de empezar pero no veo cambios',
  'Estoy estancado/a desde hace meses', 'Vuelvo después de mucho tiempo parado/a',
  'Nunca antes he hecho un proceso así',
];

type Slot = { start: string; end: string; time: string; available: boolean };
type Day = { date: string; weekday: string; monthday: string; slots: Slot[] };

type FormState = {
  name: string; prefix: string; whatsapp: string; email: string;
  objetivo: string; momento: string; motivacion: string;
};

const SELECT_BG =
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23FF6B35\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")';

// De dónde vino el lead. Se lee de la URL en el momento del envío, que es lo
// que queda cuando alguien llega desde un anuncio.
function origenDeLaUrl() {
  if (typeof window === 'undefined') return {};
  const sp = new URLSearchParams(window.location.search);
  const campos = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];
  const out: Record<string, string> = {};
  for (const k of campos) { const v = sp.get(k); if (v) out[k] = v; }
  if (document.referrer) out.referrer = document.referrer;
  return out;
}

// Envío a HELM. `keepalive` es lo importante: justo después de esto se navega a
// /gracias, y sin él el navegador cancelaría la petición a medias y el lead no
// llegaría nunca al CRM.
function enviarAHelm(form: FormState, slot: Slot, eventSourceUrl?: string) {
  const payload = {
    slug: HELM_PERFIL,
    form: HELM_FORM,
    nombre: form.name.trim(),
    email: form.email.trim().toLowerCase(),
    telefono: `${form.prefix}${form.whatsapp.trim().replace(/\D/g, '')}`,
    origen: 'Web',
    respuestas: {
      objetivo: form.objetivo,
      momento: form.momento,
      motivacion: form.motivacion.trim(),
    },
    meta: {
      // La hora reservada no es una respuesta del lead, pero es lo primero que
      // quiere ver quien abre la ficha antes de la llamada.
      slot_start: slot.start,
      slot_end: slot.end,
      landing_url: eventSourceUrl || '',
      ...origenDeLaUrl(),
    },
  };
  try {
    fetch(HELM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(err => console.warn('[helm] no se pudo copiar el lead:', err));
  } catch (err) {
    console.warn('[helm] no se pudo copiar el lead:', err);
  }
}

export function FormularioReserva() {
  const [form, setForm] = useState<FormState>({
    name: '', prefix: '+34', whatsapp: '', email: '',
    objetivo: '', momento: '', motivacion: '',
  });
  const [days, setDays] = useState<Day[]>([]);
  const [dayIdx, setDayIdx] = useState(0);
  const [slotStart, setSlotStart] = useState<string | null>(null);
  const [slotsState, setSlotsState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (field: keyof FormState) => (e: any) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  // Cargar huecos reales al montar
  const loadSlots = () => {
    setSlotsState('loading');
    fetch(SLOTS_ENDPOINT)
      .then(r => (r.ok ? r.json() : Promise.reject(new Error('slots'))))
      .then(d => {
        const ds: Day[] = Array.isArray(d.days) ? d.days : [];
        setDays(ds);
        setDayIdx(0);
        setSlotStart(null);
        setSlotsState('ready');
      })
      .catch(() => setSlotsState('error'));
  };
  useEffect(() => { loadSlots(); }, []);

  const currentDay = days[dayIdx];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!slotStart) { setErrorMsg('Elige un día y una hora para tu llamada.'); return; }
    const slot = currentDay?.slots.find(s => s.start === slotStart);
    if (!slot) { setErrorMsg('Ese horario ya no está disponible, elige otro.'); return; }

    setStatus('submitting');
    const metaEventId = makeEventId();
    const meta = getMetaLeadMeta(metaEventId);

    try {
      const res = await fetch(BOOK_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: `${form.prefix} ${form.whatsapp.trim()}`,
          objetivo: form.objetivo,
          momento: form.momento,
          motivacion: form.motivacion.trim(),
          start: slot.start,
          end: slot.end,
          meta_event_id: meta.eventId, meta_fbp: meta.fbp,
          meta_fbc: meta.fbc, meta_event_source_url: meta.eventSourceUrl,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 409) {
        // Slot pillado por otra persona → recargar huecos
        setStatus('idle');
        setErrorMsg(data.error || 'Ese horario acaba de ocuparse. Elige otro.');
        loadSlots();
        return;
      }
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);

      // Copia al CRM de HELM. Va detrás de la reserva y no se espera: si HELM
      // está caído, la llamada ya está agendada y el lead no puede quedarse
      // mirando una pantalla de carga por eso.
      enviarAHelm(form, slot, meta.eventSourceUrl);

      // Conversión Meta (Lead) deduplicada con la CAPI de central
      fireMetaLead(metaEventId);
      try {
        sessionStorage.setItem('hugo_lead_name', form.name.trim());
        sessionStorage.setItem('hugo_lead_email', form.email.trim());
      } catch {}
      // → thank you page
      window.location.href = asset('/gracias');
    } catch (err: any) {
      console.error('Error al reservar:', err);
      setStatus('error');
      setErrorMsg(err?.message || 'No se pudo crear la reserva. Inténtalo de nuevo.');
      setTimeout(() => setStatus('idle'), 100);
    }
  };

  const inputCls =
    'w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-fire focus:bg-fire/5 transition-colors font-body';
  const selectCls =
    'w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-white focus:outline-none focus:border-fire transition-colors font-body appearance-none cursor-pointer';
  const labelCls = 'block font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-2';

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
            Rellena tus datos, elige el día y la hora, y tu llamada con Hugo queda{' '}
            <span className="text-fire-light font-semibold">reservada al instante</span>.
          </p>
        </FadeInSection>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-fire/40 via-fire/10 to-transparent blur-sm" />
          <form
            onSubmit={handleSubmit}
            className="relative p-6 md:p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-ink border border-fire/20 space-y-5"
          >
            <div>
              <label className={labelCls}>Tu nombre</label>
              <input type="text" required value={form.name} onChange={handleChange('name')}
                placeholder="Nombre (sin apellidos)" className={inputCls} />
            </div>

            <div>
              <label className={labelCls}>WhatsApp</label>
              <div className="flex gap-2">
                <select value={form.prefix} onChange={handleChange('prefix')}
                  className="w-32 px-3 py-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-white focus:outline-none focus:border-fire transition-colors font-body text-sm">
                  {PHONE_PREFIXES.map(p => <option key={p.code} value={p.code}>{p.code} {p.country}</option>)}
                </select>
                <input type="tel" required value={form.whatsapp} onChange={handleChange('whatsapp')}
                  placeholder="Tu número" className={`flex-1 ${inputCls}`} />
              </div>
            </div>

            <div>
              <label className={labelCls}>Email</label>
              <input type="email" required value={form.email} onChange={handleChange('email')}
                placeholder="tu@correo.com" className={inputCls} />
            </div>

            <div>
              <label className={labelCls}>Tu objetivo principal</label>
              <select required value={form.objetivo} onChange={handleChange('objetivo')} className={selectCls}
                style={{ backgroundImage: SELECT_BG, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}>
                <option value="" disabled>Selecciona…</option>
                {OBJETIVOS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div>
              <label className={labelCls}>¿En qué momento te encuentras?</label>
              <select required value={form.momento} onChange={handleChange('momento')} className={selectCls}
                style={{ backgroundImage: SELECT_BG, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}>
                <option value="" disabled>Selecciona…</option>
                {MOMENTOS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div>
              <label className={labelCls}>¿Por qué sientes que ahora es el momento de dar el cambio?</label>
              <textarea required rows={3} value={form.motivacion} onChange={handleChange('motivacion')}
                placeholder="Cuéntame qué te ha traído hasta aquí. Sé honesto/a, esto Hugo lo lee antes de la llamada."
                className={`${inputCls} resize-none`} />
            </div>

            {/* ── Día + hora (huecos reales del calendario de Hugo) ── */}
            <div className="pt-2">
              <label className={labelCls}>Elige el día</label>
              {slotsState === 'loading' && (
                <p className="font-body text-slate-400 text-sm py-3">Cargando huecos disponibles…</p>
              )}
              {slotsState === 'error' && (
                <p className="font-body text-fire-light text-sm py-3">
                  No pudimos cargar la agenda.{' '}
                  <button type="button" onClick={loadSlots} className="underline">Reintentar</button>
                </p>
              )}
              {slotsState === 'ready' && days.length === 0 && (
                <p className="font-body text-slate-400 text-sm py-3">
                  No hay huecos disponibles ahora mismo. Escríbenos por WhatsApp y te ayudamos.
                </p>
              )}
              {slotsState === 'ready' && days.length > 0 && (
                <>
                  <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                    {days.map((d, i) => {
                      const active = i === dayIdx;
                      return (
                        <button key={d.date} type="button"
                          onClick={() => { setDayIdx(i); setSlotStart(null); }}
                          className={`shrink-0 px-4 py-2.5 rounded-xl border text-center transition-colors ${
                            active ? 'bg-fire/15 border-fire text-white' : 'bg-slate-950/80 border-white/10 text-slate-300 hover:border-fire/40'
                          }`}>
                          <span className="block font-mono text-[10px] uppercase tracking-widest text-slate-400">{d.weekday}</span>
                          <span className="block font-body text-sm font-semibold">{d.monthday}</span>
                        </button>
                      );
                    })}
                  </div>

                  <label className={`${labelCls} mt-4`}>Horario disponible (hora España)</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {currentDay?.slots.map(s => {
                      const selected = slotStart === s.start;
                      return (
                        <button key={s.start} type="button" disabled={!s.available}
                          onClick={() => setSlotStart(s.start)}
                          className={`px-2 py-2.5 rounded-xl border font-body text-sm transition-colors ${
                            selected
                              ? 'bg-fire-gradient border-transparent text-white shadow-fire-lg'
                              : s.available
                                ? 'bg-slate-950/80 border-white/10 text-white hover:border-fire'
                                : 'bg-slate-950/40 border-white/5 text-slate-600 cursor-not-allowed line-through'
                          }`}>
                          {s.time}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {errorMsg && (
              <p className="font-body text-sm text-fire-light text-center bg-fire/5 border border-fire/20 rounded-xl py-2.5 px-3">
                {errorMsg}
              </p>
            )}

            <button type="submit" disabled={status === 'submitting'}
              className="cta-fire w-full !py-5 !text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {status === 'submitting' ? 'Reservando…' : 'Reservar mi llamada →'}
            </button>

            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500 text-center pt-1">
              Al reservar, tu llamada queda confirmada en la agenda de Hugo.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-2 text-center">
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">🔒 Datos 100% privados</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">⚡ Confirmación inmediata</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">🎁 Bonos incluidos</span>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
