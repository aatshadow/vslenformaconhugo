'use client';

import { useState } from 'react';
import { LeadMagnetForm, LeadCapture } from './LeadMagnetForm';
import { CalorieCalculator } from './CalorieCalculator';
import { Logo } from '../ui/Logo';

const LEAD_ENDPOINT =
  process.env.NEXT_PUBLIC_LEAD_MAGNET_ENDPOINT ||
  'https://central.blackwolfsec.io/api/forms/enformaconhugo-leadmagnet-submit';

// Copia del lead al CRM de HELM (helm.s4sf.net/enformaconhugo), igual que en el
// formulario de reserva de la VSL. No sustituye a central: se manda a la vez y
// sin bloquear, de modo que si HELM falla el lead sigue su camino de siempre.
const HELM_ENDPOINT =
  process.env.NEXT_PUBLIC_HELM_ENDPOINT ||
  'https://helm.s4sf.net/api/formularios';
const HELM_PERFIL = 'enformaconhugo';
const HELM_FORM = 'calculadora';

// La calculadora son dos pasos y se manda lo que hay en cada uno. Guardando el
// id de la respuesta del paso 1, el paso 2 la COMPLETA en vez de crear otra:
// quien abandona a mitad deja una ficha con sus datos, no dos a medias.
const ACTIVIDADES: Record<string, string> = {
  sedentary: 'Sedentario', light: 'Ligero', moderate: 'Moderado',
  active: 'Activo', very_active: 'Muy activo',
};
const OBJETIVOS_CALC: Record<string, string> = {
  cut_aggressive: 'Perder grasa rápido', cut: 'Perder grasa (recomendado)',
  maintain: 'Mantener peso', lean_bulk: 'Ganar músculo limpio', bulk: 'Ganar volumen',
};

function origenDeLaUrl() {
  if (typeof window === 'undefined') return {};
  const sp = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid']) {
    const v = sp.get(k); if (v) out[k] = v;
  }
  if (document.referrer) out.referrer = document.referrer;
  return out;
}

async function postHelm(payload: Record<string, any>): Promise<string | null> {
  try {
    const res = await fetch(HELM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: HELM_PERFIL, form: HELM_FORM, ...payload }),
      keepalive: true,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.responseId || null;
  } catch (err) {
    console.warn('[helm] no se pudo copiar el lead:', err);
    return null;
  }
}

type Step = 'form' | 'calculator';

export function CalculadoraLanding() {
  const [step, setStep] = useState<Step>('form');
  const [contactId, setContactId] = useState<string | null>(null);
  const [helmResponseId, setHelmResponseId] = useState<string | null>(null);

  const handleLeadSubmit = async (lead: LeadCapture): Promise<boolean> => {
    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'create',
          name: lead.name,
          email: lead.email,
          whatsapp: `${lead.prefix} ${lead.phone}`,
          investment_score: lead.investmentScore,
          landing_url: typeof window !== 'undefined' ? window.location.href : null,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setContactId(data.contactId || null);

      // A HELM en paralelo. No se espera con `await` dentro del try de arriba
      // para que un HELM lento no retrase el paso a la calculadora, que es lo
      // que el lead está esperando ver.
      postHelm({
        nombre: lead.name,
        email: lead.email,
        telefono: `${lead.prefix}${String(lead.phone).replace(/\D/g, '')}`,
        origen: 'Calculadora',
        respuestas: { inversion: lead.investmentScore },
        meta: {
          landing_url: typeof window !== 'undefined' ? window.location.href : '',
          ...origenDeLaUrl(),
        },
      }).then(setHelmResponseId);

      setStep('calculator');
      return true;
    } catch (err) {
      console.error('lead submit error', err);
      return false;
    }
  };

  const handleCalcSubmit = async (calc: Record<string, any>): Promise<void> => {
    // El envío a HELM no depende de que central haya devuelto contactId: son
    // dos sistemas distintos y uno no debe llevarse al otro por delante.
    if (helmResponseId) {
      postHelm({
        responseId: helmResponseId,
        respuestas: {
          sexo: calc.calc_gender === 'female' ? 'Mujer' : 'Hombre',
          edad: calc.calc_age,
          peso_kg: calc.calc_weight_kg,
          altura_cm: calc.calc_height_cm,
          actividad: ACTIVIDADES[calc.calc_activity] || calc.calc_activity,
          objetivo: OBJETIVOS_CALC[calc.calc_goal] || calc.calc_goal,
          tdee: calc.calc_tdee,
          kcal_objetivo: calc.calc_target_kcal,
          proteina_g: calc.calc_protein_g,
          carbos_g: calc.calc_carbs_g,
          grasas_g: calc.calc_fats_g,
        },
        meta: { calc_bmr: calc.calc_bmr },
      });
    }

    if (!contactId) return;
    try {
      await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'update',
          contactId,
          ...calc,
        }),
      });
    } catch (err) {
      console.error('calc update error', err);
    }
  };

  return (
    <main className="relative bg-ink min-h-screen">
      <header className="relative z-20 px-4 py-5 md:py-6 flex items-center justify-between border-b border-white/5">
        <Logo />
        <a
          href="/"
          className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400 hover:text-fire-light transition-colors"
        >
          ← Ir al método
        </a>
      </header>

      {step === 'form' && <LeadMagnetForm onSubmit={handleLeadSubmit} />}
      {step === 'calculator' && <CalorieCalculator onSubmit={handleCalcSubmit} />}
    </main>
  );
}
