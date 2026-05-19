'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { asset } from '@/lib/basePath';

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <motion.a
      href="#top"
      className={cn('inline-flex items-center gap-2.5 select-none', className)}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {/* Avatar circle — foto real de Hugo dentro de un ring naranja
          (mantiene la identidad de marca fuego pero ahora con su cara). */}
      <div className="relative">
        <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-br from-fire-light via-fire to-fire-dark shadow-fire-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset('/hugo/hugo-avatar.png')}
            alt="Hugo Casal"
            className="w-full h-full rounded-full object-cover bg-ink"
          />
        </div>
        <div className="absolute inset-0 rounded-full bg-fire/30 blur-xl -z-10" />
      </div>

      {/* Wordmark */}
      {!compact && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-[18px] tracking-[0.02em] text-white uppercase">
            <span className="text-fire">enforma</span>conhugo
          </span>
          <span className="font-mono text-[9px] tracking-[0.3em] text-slate-400 uppercase mt-0.5">
            Método Acción Fit
          </span>
        </div>
      )}
    </motion.a>
  );
}
