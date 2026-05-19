'use client';

import { useState, useEffect, useMemo, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeInSection } from '../ui/FadeInSection';
import type { LeadPayload } from '@/lib/supabase';

// ─── Calendar utilities ─────────────────────────────────────────────────
// Construye los próximos N días laborales (lun-vie) saltando hoy si ya
// pasó la última franja. Hugo trabaja desde España (Europe/Madrid). Slots
// fijos por día — algunos se marcan "ocupado" deterministicamente con un
// hash del slot+día para que parezca realista sin tocar calendar real.
const TIME_SLOTS = ['10:00', '11:00', '12:00', '13:00', '16:00', '17:00', '18:00', '19:00'];
const DAYS_OFFERED = 12; // ~2 semanas hábiles

function nextAvailableDays(count: number): Date[] {
  const out: Date[] = [];
  const cur = new Date();
  cur.setHours(0, 0, 0, 0);
  let i = 0;
  while (out.length < count && i < 30) {
    const d = new Date(cur.getTime() + i * 86400000);
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) out.push(d); // skip weekends
    i++;
  }
  return out;
}

function isSlotTaken(date: Date, slot: string): boolean {
  // Hash determinista: 25% de slots aparecen "ocupados". Misma fecha+slot
  // siempre devuelve el mismo resultado (no flickea entre renders).
  const key = `${date.toISOString().slice(0, 10)}-${slot}`;
  let h = 0;
  for (let i = 0; i < key.length; i++) h = ((h << 5) - h) + key.charCodeAt(i) | 0;
  return Math.abs(h) % 4 === 0;
}

function fmtDayShort(d: Date): { weekday: string; day: string; month: string } {
  const weekday = d.toLocaleDateString('es-ES', { weekday: 'short' }).replace('.', '');
  const day = String(d.getDate());
  const month = d.toLocaleDateString('es-ES', { month: 'short' }).replace('.', '');
  return { weekday, day, month };
}

function fmtFullDate(d: Date): string {
  return d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
}

// Endpoint central de Dashboard-Ops que upserta en crm_contacts del tenant
// `enformaconhugo` con pipeline "VSL En Forma con Hugo" + stage `lead`.
// Override-able via NEXT_PUBLIC_LEAD_ENDPOINT para preview/staging.
const LEAD_ENDPOINT =
  process.env.NEXT_PUBLIC_LEAD_ENDPOINT ||
  'https://central.blackwolfsec.io/api/forms/enformaconhugo-submit';

const PHONE_PREFIXES = [
  { code: '+34', country: 'España' },
  { code: '+52', country: 'México' },
  { code: '+54', country: 'Argentina' },
  { code: '+57', country: 'Colombia' },
  { code: '+56', country: 'Chile' },
  { code: '+51', country: 'Perú' },
  { code: '+598', country: 'Uruguay' },
  { code: '+58', country: 'Venezuela' },
  { code: '+593', country: 'Ecuador' },
  { code: '+591', country: 'Bolivia' },
  { code: '+595', country: 'Paraguay' },
  { code: '+506', country: 'Costa Rica' },
  { code: '+502', country: 'Guatemala' },
  { code: '+503', country: 'El Salvador' },
  { code: '+507', country: 'Panamá' },
  { code: '+1', country: 'EE.UU.' },
  { code: '+351', country: 'Portugal' },
  { code: '+33', country: 'Francia' },
];

const OBJETIVOS = [
  'Perder grasa (4–10 kg)',
  'Definir y marcar músculo',
  'Ganar volumen limpio',
  'Recomposición corporal',
  'Recuperar forma física',
  'Otro',
];

const MOMENTOS = [
  'Llevo años intentándolo sin resultados',
  'Acabo de empezar pero no veo cambios',
  'Estoy estancado/a desde hace meses',
  'Vuelvo después de mucho tiempo parado/a',
  'Nunca antes he hecho un proceso así',
];

type FormState = {
  name: string;
  prefix: string;
  whatsapp: string;
  email: string;
  objetivo: string;
  momento: string;
  motivacion: string;
};

export function FormularioReserva() {
  const [form, setForm] = useState<FormState>({
    name: '',
    prefix: '+34',
    whatsapp: '',
    email: '',
    objetivo: '',
    momento: '',
    motivacion: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  // Calendar state. El usuario elige un día + slot horario antes de
  // enviar. Sin selección, el botón submit queda bloqueado.
  const days = useMemo(() => nextAvailableDays(DAYS_OFFERED), []);
  const [selectedDateIdx, setSelectedDateIdx] = useState<number>(0);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const selectedDate = days[selectedDateIdx] || null;
  const scheduledAtISO = useMemo(() => {
    if (!selectedDate || !selectedSlot) return '';
    const [h, m] = selectedSlot.split(':').map(Number);
    const d = new Date(selectedDate);
    d.setHours(h, m, 0, 0);
    return d.toISOString();
  }, [selectedDate, selectedSlot]);

  const handleChange = (field: keyof FormState) => (e: any) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!scheduledAtISO) return; // gate: hay que elegir fecha+hora
    setStatus('loading');

    const payload: LeadPayload & { scheduled_at?: string; scheduled_display?: string } = {
      name: form.name.trim(),
      whatsapp: `${form.prefix} ${form.whatsapp.trim()}`,
      email: form.email.trim().toLowerCase(),
      objetivo: form.objetivo,
      momento_actual: form.momento,
      motivacion: form.motivacion.trim(),
      source: 'landing-vsl-enformaconhugo',
      scheduled_at: scheduledAtISO,
      scheduled_display: selectedDate
        ? `${fmtFullDate(selectedDate)} · ${selectedSlot}h`
        : '',
    };

    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || `HTTP ${res.status}`);
      }
      // Persist name + fecha agendada para thank-you page
      try {
        sessionStorage.setItem('hugo_lead_name', form.name.trim());
        sessionStorage.setItem('hugo_lead_email', form.email.trim());
        if (selectedDate && selectedSlot) {
          sessionStorage.setItem(
            'hugo_lead_scheduled',
            `${fmtFullDate(selectedDate)} · ${selectedSlot}h`,
          );
        }
      } catch {}
      setStatus('success');
      setTimeout(() => {
        document.getElementById('post-submit')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    } catch (err) {
      console.error('Error guardando lead:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="reservar" className="relative py-16 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-slate-950 to-ink pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-fire-radial blur-3xl opacity-50 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        <FadeInSection className="text-center mb-12">
          <span className="section-eyebrow">Último paso</span>
          <h2 className="font-display text-[clamp(34px,9vw,64px)] md:text-7xl uppercase mt-6 tracking-[-0.02em] leading-[0.92]">
            Reserva tu <br/>
            <span className="text-fire-gradient">llamada gratis.</span>
          </h2>
          <p className="font-body text-slate-300 text-base md:text-lg mt-6 max-w-xl mx-auto leading-relaxed">
            Cuéntame quién eres y qué quieres conseguir. Hugo revisa cada aplicación personalmente y decide si encajas en el método.
          </p>
        </FadeInSection>

        {status !== 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-fire/40 via-fire/10 to-transparent blur-sm" />
            <form
              onSubmit={handleSubmit}
              className="relative p-6 md:p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-ink border border-fire/20 space-y-5"
            >
              {/* Nombre */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-2">
                  Tu nombre
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange('name')}
                  placeholder="Nombre (sin apellidos)"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-fire focus:bg-fire/5 transition-colors font-body"
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-2">
                  WhatsApp
                </label>
                <div className="flex gap-2">
                  <select
                    value={form.prefix}
                    onChange={handleChange('prefix')}
                    className="w-32 px-3 py-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-white focus:outline-none focus:border-fire transition-colors font-body text-sm"
                  >
                    {PHONE_PREFIXES.map(p => (
                      <option key={p.code} value={p.code}>{p.code} {p.country}</option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    required
                    value={form.whatsapp}
                    onChange={handleChange('whatsapp')}
                    placeholder="Tu número"
                    className="flex-1 px-4 py-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-fire focus:bg-fire/5 transition-colors font-body"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange('email')}
                  placeholder="tu@correo.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-fire focus:bg-fire/5 transition-colors font-body"
                />
              </div>

              {/* Objetivo */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-2">
                  Tu objetivo principal
                </label>
                <select
                  required
                  value={form.objetivo}
                  onChange={handleChange('objetivo')}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-white focus:outline-none focus:border-fire transition-colors font-body appearance-none cursor-pointer"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23FF6B35\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                  }}
                >
                  <option value="" disabled>Selecciona…</option>
                  {OBJETIVOS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              {/* Momento */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-2">
                  ¿En qué momento te encuentras?
                </label>
                <select
                  required
                  value={form.momento}
                  onChange={handleChange('momento')}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-white focus:outline-none focus:border-fire transition-colors font-body appearance-none cursor-pointer"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23FF6B35\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                  }}
                >
                  <option value="" disabled>Selecciona…</option>
                  {MOMENTOS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              {/* Motivación */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-2">
                  ¿Por qué sientes que ahora es el momento de dar el cambio?
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.motivacion}
                  onChange={handleChange('motivacion')}
                  placeholder="Cuéntame qué te ha traído hasta aquí. Sé honesto/a, esto Hugo lo lee antes de la llamada."
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-fire focus:bg-fire/5 transition-colors font-body resize-none"
                />
              </div>

              {/* Calendar widget — fecha + slot horario. Sin selección
                  el submit queda gated. Funciona "tipo Calendly" pero
                  los slots no se reservan en agenda real de Hugo: la
                  app simula disponibilidad determinista (~25% slots
                  ocupados) y al enviar guarda scheduled_at en payload
                  para que el CRM lo registre. */}
              <div className="pt-2">
                <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-3">
                  Elige día y hora para la llamada
                </label>
                {/* Day picker — horizontal scroll */}
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-fire/30 [&::-webkit-scrollbar-thumb]:rounded-full">
                  {days.map((d, i) => {
                    const { weekday, day, month } = fmtDayShort(d);
                    const active = i === selectedDateIdx;
                    return (
                      <button
                        key={d.toISOString()}
                        type="button"
                        onClick={() => { setSelectedDateIdx(i); setSelectedSlot(''); }}
                        className={`flex-shrink-0 min-w-[64px] px-3 py-2 rounded-xl border transition-all flex flex-col items-center ${
                          active
                            ? 'border-fire bg-fire/10 text-white shadow-fire'
                            : 'border-white/10 bg-slate-950/60 text-slate-300 hover:border-fire/40 hover:bg-fire/5'
                        }`}
                      >
                        <span className="font-mono text-[9px] uppercase tracking-widest opacity-70">{weekday}</span>
                        <span className={`font-display text-xl leading-none mt-1 ${active ? 'text-fire-gradient' : ''}`}>{day}</span>
                        <span className="font-mono text-[9px] uppercase tracking-widest opacity-50 mt-1">{month}</span>
                      </button>
                    );
                  })}
                </div>
                {/* Slot picker — grid */}
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {TIME_SLOTS.map(slot => {
                    const taken = selectedDate ? isSlotTaken(selectedDate, slot) : false;
                    const active = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={taken}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2.5 rounded-xl border font-mono text-sm transition-all ${
                          taken
                            ? 'border-white/5 bg-slate-950/40 text-slate-600 line-through cursor-not-allowed'
                            : active
                              ? 'border-fire bg-fire text-white shadow-fire'
                              : 'border-white/10 bg-slate-950/60 text-slate-300 hover:border-fire/50 hover:bg-fire/5'
                        }`}
                        title={taken ? 'Slot ocupado' : 'Disponible'}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                {scheduledAtISO && (
                  <p className="font-mono text-[10px] uppercase tracking-widest text-fire-light mt-3 text-center">
                    Llamada {selectedDate && fmtFullDate(selectedDate)} · {selectedSlot}h
                  </p>
                )}
                {!scheduledAtISO && (
                  <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mt-3 text-center">
                    Selecciona una hora para continuar
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'loading' || !scheduledAtISO}
                className="cta-fire w-full !py-5 !text-base mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Confirmando…' : status === 'error' ? 'Error — reintenta' : !scheduledAtISO ? 'Elige día y hora arriba' : 'Confirmar mi llamada gratis →'}
              </button>

              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-3 text-center">
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                  🔒 Datos 100% privados
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                  ⚡ Respuesta en 24h
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                  🎁 Bonos incluidos
                </span>
              </div>
            </form>
          </motion.div>
        )}

        {status === 'success' && (
          <PostSubmitCountdown
            firstName={form.name.split(' ')[0]}
            scheduledLabel={selectedDate && selectedSlot ? `${fmtFullDate(selectedDate)} · ${selectedSlot}h` : ''}
          />
        )}
      </div>
    </section>
  );
}

function PostSubmitCountdown({ firstName, scheduledLabel }: { firstName: string; scheduledLabel: string }) {
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count <= 0) {
      window.location.href = '/gracias';
      return;
    }
    const t = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <motion.div
      id="post-submit"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative p-8 md:p-14 rounded-3xl bg-gradient-to-br from-slate-900 to-ink border border-fire/30 text-center overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute -inset-32 bg-fire-radial blur-3xl opacity-40 pointer-events-none" />

      <div className="relative">
        {/* Check icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 0.1 }}
          className="w-20 h-20 mx-auto rounded-full bg-fire-gradient flex items-center justify-center shadow-fire-lg mb-7"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-white">
            <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        <h3 className="font-display text-[clamp(32px,9vw,64px)] md:text-5xl uppercase tracking-tight leading-[0.95] mb-2">
          ¡Enhorabuena!
        </h3>
        <p className="font-display text-[clamp(28px,8vw,52px)] md:text-4xl uppercase tracking-tight leading-[0.95] max-w-2xl mx-auto">
          <span className="text-fire-gradient">¡Estás dentro!</span>
        </p>

        {scheduledLabel && (
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.18em] text-fire-light mt-5">
            ★ Llamada confirmada · {scheduledLabel}
          </p>
        )}
        <p className="font-body text-slate-300 text-base md:text-lg mt-6 max-w-md mx-auto leading-relaxed">
          Te estamos llevando al siguiente paso. <span className="text-fire-light font-semibold">No cierres esta ventana.</span>
        </p>

        {/* Countdown circle */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" stroke="rgba(255,69,0,0.15)" strokeWidth="4" fill="none" />
              <motion.circle
                cx="50"
                cy="50"
                r="46"
                stroke="url(#fireGrad)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 46}
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 46 }}
                transition={{ duration: 5, ease: 'linear' }}
              />
              <defs>
                <linearGradient id="fireGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FF8A4C" />
                  <stop offset="100%" stopColor="#E63E00" />
                </linearGradient>
              </defs>
            </svg>
            <AnimatePresence mode="wait">
              <motion.div
                key={count}
                initial={{ scale: 0.5, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 1.4, opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-6xl md:text-7xl text-fire-gradient leading-none"
              >
                {Math.max(count, 0)}
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-400">
            Redireccionando…
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 max-w-md mx-auto p-4 rounded-xl bg-fire/10 border border-fire/30"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-fire-light leading-relaxed">
            ⚠ Atención · No te salgas de esta página
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
