'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';

const PHONE_PREFIXES = [
  { code: '+34',  country: 'España' },
  { code: '+52',  country: 'México' },
  { code: '+54',  country: 'Argentina' },
  { code: '+57',  country: 'Colombia' },
  { code: '+56',  country: 'Chile' },
  { code: '+51',  country: 'Perú' },
  { code: '+598', country: 'Uruguay' },
  { code: '+58',  country: 'Venezuela' },
  { code: '+593', country: 'Ecuador' },
  { code: '+591', country: 'Bolivia' },
  { code: '+595', country: 'Paraguay' },
  { code: '+506', country: 'Costa Rica' },
  { code: '+502', country: 'Guatemala' },
  { code: '+503', country: 'El Salvador' },
  { code: '+507', country: 'Panamá' },
  { code: '+1',   country: 'EE.UU.' },
  { code: '+351', country: 'Portugal' },
  { code: '+33',  country: 'Francia' },
];

export type LeadCapture = {
  name: string;
  email: string;
  prefix: string;
  phone: string;
  investmentScore: number;
};

type Props = {
  onSubmit: (lead: LeadCapture) => Promise<boolean>;
};

export function LeadMagnetForm({ onSubmit }: Props) {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [prefix, setPrefix]   = useState('+34');
  const [phone, setPhone]     = useState('');
  const [score, setScore]     = useState(5);
  const [status, setStatus]   = useState<'idle' | 'loading' | 'error'>('idle');

  const handle = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) return;
    setStatus('loading');
    const ok = await onSubmit({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      prefix,
      phone: phone.trim(),
      investmentScore: score,
    });
    if (!ok) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  // Slider track gradient stops at the current value.
  const sliderPct = ((score - 1) / 9) * 100;

  return (
    <section className="relative py-12 md:py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-slate-950 to-ink pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-fire-radial blur-3xl opacity-50 pointer-events-none" />

      <div className="relative max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="section-eyebrow">Calculadora gratis · 30 segundos</span>
          <h1 className="font-display text-[clamp(34px,9vw,64px)] md:text-7xl uppercase mt-6 tracking-[-0.02em] leading-[0.92]">
            Descubre <br/>
            <span className="text-fire-gradient">cuántas calorías</span> <br/>
            necesitas comer
          </h1>
          <p className="font-body text-slate-300 text-base md:text-lg mt-6 max-w-lg mx-auto leading-relaxed">
            La calculadora exacta que uso con mis alumnos para definir el déficit o superávit perfecto para tu objetivo. Rellena el formulario y desbloquéala al momento.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          onSubmit={handle}
          className="relative p-6 md:p-9 rounded-3xl bg-gradient-to-br from-slate-900 to-ink border border-fire/20 space-y-5"
        >
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-fire/40 via-fire/10 to-transparent blur-sm pointer-events-none" />
          <div className="relative space-y-5">
            <Field label="Tu nombre">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre"
                className="form-input"
              />
            </Field>

            <Field label="Email">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="form-input"
              />
            </Field>

            <Field label="Teléfono (WhatsApp)">
              <div className="flex gap-2 w-full">
                <select
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  className="form-input text-sm shrink-0"
                  style={{ width: 92, paddingLeft: 10, paddingRight: 8 }}
                  aria-label="Prefijo país"
                >
                  {PHONE_PREFIXES.map(p => (
                    <option key={p.code} value={p.code}>{p.code} {p.country}</option>
                  ))}
                </select>
                <input
                  type="tel"
                  required
                  inputMode="tel"
                  autoComplete="tel-national"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Tu número"
                  className="form-input flex-1 min-w-0"
                />
              </div>
            </Field>

            <Field label={`Del 1 al 10, ¿cuánto estás dispuesto a invertir en tu cambio físico?`}>
              <div className="pt-2">
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  className="lm-slider"
                  style={{
                    background: `linear-gradient(to right, #FF6B35 0%, #FF4500 ${sliderPct}%, rgba(255,255,255,0.08) ${sliderPct}%, rgba(255,255,255,0.08) 100%)`,
                  }}
                />
                <div className="flex justify-between mt-2">
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <span
                      key={n}
                      className={`font-mono text-[10px] ${n === score ? 'text-fire-light font-bold' : 'text-slate-500'}`}
                    >
                      {n}
                    </span>
                  ))}
                </div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-fire-light mt-3 text-center">
                  Tu nivel: {score} / 10
                </p>
              </div>
            </Field>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="cta-fire w-full !py-5 !text-base mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading'
                ? 'Desbloqueando…'
                : status === 'error'
                  ? 'Error — reintenta'
                  : 'Desbloquear mi calculadora →'}
            </button>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-3 text-center">
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">🔒 100% privado</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">⚡ Acceso inmediato</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">🎁 Sin spam</span>
            </div>
          </div>
        </motion.form>
      </div>

      <style jsx>{`
        .lm-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 8px;
          outline: none;
          cursor: pointer;
        }
        .lm-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF8A4C 0%, #E63E00 100%);
          border: 3px solid #08090A;
          box-shadow: 0 0 20px rgba(255,69,0,0.6), 0 0 40px rgba(255,69,0,0.3);
          cursor: grab;
          transition: transform 0.15s;
        }
        .lm-slider::-webkit-slider-thumb:active { cursor: grabbing; transform: scale(1.12); }
        .lm-slider::-moz-range-thumb {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF8A4C 0%, #E63E00 100%);
          border: 3px solid #08090A;
          box-shadow: 0 0 20px rgba(255,69,0,0.6), 0 0 40px rgba(255,69,0,0.3);
          cursor: grab;
        }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}
