'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Gender = 'male' | 'female';
type Activity = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
type Goal = 'cut_aggressive' | 'cut' | 'maintain' | 'lean_bulk' | 'bulk';

const ACTIVITY_FACTORS: Record<Activity, { label: string; factor: number; desc: string }> = {
  sedentary:    { label: 'Sedentario',     factor: 1.2,   desc: 'Trabajo de oficina, poco o ningún ejercicio' },
  light:        { label: 'Ligero',         factor: 1.375, desc: 'Ejercicio ligero 1-3 días/semana' },
  moderate:     { label: 'Moderado',       factor: 1.55,  desc: 'Ejercicio 3-5 días/semana' },
  active:       { label: 'Activo',         factor: 1.725, desc: 'Ejercicio intenso 6-7 días/semana' },
  very_active:  { label: 'Muy activo',     factor: 1.9,   desc: 'Atleta, trabajo físico + entreno diario' },
};

const GOALS: Record<Goal, { label: string; delta: number; desc: string; proteinPerKg: number }> = {
  cut_aggressive: { label: 'Perder grasa rápido',     delta: -750, desc: '≈ 0.75 kg/sem',     proteinPerKg: 2.4 },
  cut:            { label: 'Perder grasa (recomendado)', delta: -500, desc: '≈ 0.5 kg/sem',   proteinPerKg: 2.2 },
  maintain:       { label: 'Mantener peso',            delta:    0, desc: 'Recomposición',     proteinPerKg: 2.0 },
  lean_bulk:      { label: 'Ganar músculo limpio',     delta: +300, desc: '≈ 0.3 kg/sem',     proteinPerKg: 2.0 },
  bulk:           { label: 'Ganar volumen',            delta: +500, desc: '≈ 0.5 kg/sem',     proteinPerKg: 1.8 },
};

type Props = {
  onSubmit: (calc: Record<string, any>) => Promise<void>;
};

export function CalorieCalculator({ onSubmit }: Props) {
  const [gender, setGender]     = useState<Gender>('male');
  const [age, setAge]           = useState(28);
  const [weight, setWeight]     = useState(75);
  const [height, setHeight]     = useState(175);
  const [activity, setActivity] = useState<Activity>('moderate');
  const [goal, setGoal]         = useState<Goal>('cut');
  const [showResults, setShowResults] = useState(false);

  // Mifflin-St Jeor BMR
  const bmr = useMemo(() => {
    const base = 10 * weight + 6.25 * height - 5 * age;
    return Math.round(gender === 'male' ? base + 5 : base - 161);
  }, [gender, age, weight, height]);

  const tdee = useMemo(() => Math.round(bmr * ACTIVITY_FACTORS[activity].factor), [bmr, activity]);
  const target = useMemo(() => Math.max(1200, tdee + GOALS[goal].delta), [tdee, goal]);

  const macros = useMemo(() => {
    const proteinG = Math.round(weight * GOALS[goal].proteinPerKg);
    const proteinKcal = proteinG * 4;
    const fatsKcal = Math.round(target * 0.25);
    const fatsG = Math.round(fatsKcal / 9);
    const carbsKcal = Math.max(0, target - proteinKcal - fatsKcal);
    const carbsG = Math.round(carbsKcal / 4);
    return { proteinG, fatsG, carbsG };
  }, [weight, goal, target]);

  const handleCalculate = async () => {
    setShowResults(true);
    await onSubmit({
      calc_gender:      gender,
      calc_age:         age,
      calc_weight_kg:   weight,
      calc_height_cm:   height,
      calc_activity:    activity,
      calc_goal:        goal,
      calc_bmr:         bmr,
      calc_tdee:        tdee,
      calc_target_kcal: target,
      calc_protein_g:   macros.proteinG,
      calc_carbs_g:     macros.carbsG,
      calc_fats_g:      macros.fatsG,
    });
    setTimeout(() => {
      document.getElementById('lm-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  return (
    <section className="relative py-12 md:py-20 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-slate-950 to-ink pointer-events-none" />
      <div className="relative max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="section-eyebrow">Paso 2 · Tus datos</span>
          <h2 className="font-display text-[clamp(30px,8vw,52px)] md:text-6xl uppercase mt-6 tracking-[-0.02em] leading-[0.95]">
            Tu plan de calorías <br/>
            <span className="text-fire-gradient">en 30 segundos</span>
          </h2>
          <p className="font-body text-slate-300 text-sm md:text-base mt-5 max-w-xl mx-auto">
            Todos los campos son aproximaciones — no necesitas báscula de precisión.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative p-6 md:p-9 rounded-3xl bg-gradient-to-br from-slate-900 to-ink border border-fire/20 space-y-6"
        >
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-fire/40 via-fire/10 to-transparent blur-sm pointer-events-none" />
          <div className="relative space-y-6">
            {/* Gender */}
            <div>
              <Label>Género</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {(['male', 'female'] as Gender[]).map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`py-3 rounded-xl border font-body text-sm transition-all ${
                      gender === g
                        ? 'border-fire bg-fire/15 text-white shadow-fire-sm'
                        : 'border-white/10 bg-slate-950/60 text-slate-300 hover:border-fire/40'
                    }`}
                  >
                    {g === 'male' ? '♂ Hombre' : '♀ Mujer'}
                  </button>
                ))}
              </div>
            </div>

            {/* Numeric inputs */}
            <div className="grid grid-cols-3 gap-3">
              <NumField label="Edad"        value={age}    onChange={setAge}    min={14}  max={90}  unit="años"/>
              <NumField label="Peso"        value={weight} onChange={setWeight} min={35}  max={250} unit="kg"/>
              <NumField label="Altura"      value={height} onChange={setHeight} min={120} max={230} unit="cm"/>
            </div>

            {/* Activity */}
            <div>
              <Label>Nivel de actividad</Label>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {(Object.keys(ACTIVITY_FACTORS) as Activity[]).map(a => {
                  const cfg = ACTIVITY_FACTORS[a];
                  const active = activity === a;
                  return (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setActivity(a)}
                      className={`text-left px-4 py-2.5 rounded-xl border transition-all ${
                        active
                          ? 'border-fire bg-fire/10 shadow-fire-sm'
                          : 'border-white/10 bg-slate-950/60 hover:border-fire/40'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className={`font-body text-sm ${active ? 'text-white' : 'text-slate-300'}`}>{cfg.label}</span>
                        <span className="font-mono text-[10px] text-slate-500">{cfg.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Goal */}
            <div>
              <Label>Tu objetivo</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {(Object.keys(GOALS) as Goal[]).map(g => {
                  const cfg = GOALS[g];
                  const active = goal === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGoal(g)}
                      className={`text-left px-4 py-2.5 rounded-xl border transition-all ${
                        active
                          ? 'border-fire bg-fire/10 shadow-fire-sm'
                          : 'border-white/10 bg-slate-950/60 hover:border-fire/40'
                      }`}
                    >
                      <div className={`font-body text-sm ${active ? 'text-white' : 'text-slate-300'}`}>{cfg.label}</div>
                      <div className="font-mono text-[10px] text-slate-500 mt-0.5">{cfg.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={handleCalculate}
              className="cta-fire w-full !py-5 !text-base mt-2"
            >
              Calcular mis calorías →
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {showResults && (
            <motion.div
              id="lm-results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative mt-8 p-6 md:p-10 rounded-3xl bg-gradient-to-br from-fire/15 via-slate-900 to-ink border border-fire/40 overflow-hidden"
            >
              <div className="absolute -inset-32 bg-fire-radial blur-3xl opacity-50 pointer-events-none" />
              <div className="relative">
                <span className="section-eyebrow">Tu plan personalizado</span>
                <h3 className="font-display text-[clamp(28px,7vw,48px)] md:text-5xl uppercase mt-5 tracking-[-0.02em] leading-[0.95]">
                  Come <span className="text-fire-gradient">{target} kcal</span> al día
                </h3>
                <p className="font-body text-slate-300 text-sm md:text-base mt-4 max-w-xl">
                  Para tu objetivo de <strong className="text-white">{GOALS[goal].label.toLowerCase()}</strong> ({GOALS[goal].desc}). Calculado con la fórmula Mifflin-St Jeor — la misma que uso con mis alumnos.
                </p>

                <div className="grid grid-cols-3 gap-3 mt-8">
                  <MacroTile label="Proteína" value={macros.proteinG} unit="g" />
                  <MacroTile label="Carbos"   value={macros.carbsG}   unit="g" />
                  <MacroTile label="Grasas"   value={macros.fatsG}    unit="g" />
                </div>

                <div className="mt-8 p-4 rounded-xl bg-slate-950/60 border border-white/5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500 mb-2">Tu metabolismo</div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-slate-400">Metabolismo basal (BMR):</span>{' '}
                      <span className="font-mono text-fire-light">{bmr} kcal</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Gasto diario (TDEE):</span>{' '}
                      <span className="font-mono text-fire-light">{tdee} kcal</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-5 rounded-2xl bg-fire/10 border border-fire/30">
                  <p className="font-body text-slate-200 text-sm md:text-base leading-relaxed">
                    Esto es solo el punto de partida. <strong className="text-white">Calcular calorías es la parte fácil</strong> — lo que mueve el peso es la estrategia: cuándo subir, cuándo bajar, cómo entrenar, cómo dormir, qué priorizar cada semana.
                  </p>
                  <p className="font-body text-slate-300 text-sm mt-3">
                    Si quieres el método completo + acompañamiento personalizado de Hugo:
                  </p>
                  <a
                    href="/"
                    className="cta-fire mt-5 inline-flex !py-3 !px-6 !text-sm"
                  >
                    Ver el método de Hugo →
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400">
      {children}
    </label>
  );
}

function NumField({ label, value, onChange, min, max, unit }: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  unit: string;
}) {
  // Mantenemos un buffer string para que el usuario pueda escribir libremente
  // (borrar el valor entero, tipear "1" antes de "18", etc.) sin que cada
  // keystroke se clampee al min. El clamp solo aplica en blur, cuando el
  // usuario ya terminó de tipear.
  const [draft, setDraft] = useState<string>(String(value));
  useEffect(() => { setDraft(String(value)); }, [value]);

  const commit = () => {
    if (draft === '' || draft === '-') { setDraft(String(value)); return; }
    const n = Number(draft);
    if (!Number.isFinite(n)) { setDraft(String(value)); return; }
    const clamped = Math.max(min, Math.min(max, n));
    onChange(clamped);
    setDraft(String(clamped));
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="relative mt-2">
        <input
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
          className="form-input pr-12 text-center font-mono text-lg"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-widest text-slate-500 pointer-events-none">
          {unit}
        </span>
      </div>
    </div>
  );
}

function MacroTile({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="p-4 rounded-xl bg-slate-950/70 border border-fire/20 text-center">
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400">{label}</div>
      <div className="font-display text-3xl md:text-4xl mt-2 text-fire-gradient leading-none">{value}</div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mt-1">{unit} / día</div>
    </div>
  );
}
