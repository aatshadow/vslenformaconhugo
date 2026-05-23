'use client';

import { useState } from 'react';
import { LeadMagnetForm, LeadCapture } from './LeadMagnetForm';
import { CalorieCalculator } from './CalorieCalculator';
import { Logo } from '../ui/Logo';

const LEAD_ENDPOINT =
  process.env.NEXT_PUBLIC_LEAD_MAGNET_ENDPOINT ||
  'https://central.blackwolfsec.io/api/forms/enformaconhugo-leadmagnet-submit';

type Step = 'form' | 'calculator';

export function CalculadoraLanding() {
  const [step, setStep] = useState<Step>('form');
  const [contactId, setContactId] = useState<string | null>(null);

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
      setStep('calculator');
      return true;
    } catch (err) {
      console.error('lead submit error', err);
      return false;
    }
  };

  const handleCalcSubmit = async (calc: Record<string, any>): Promise<void> => {
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
