'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <motion.a
      href="#top"
      className={cn('inline-flex items-center gap-2.5 select-none', className)}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {/* Icon: flame in circle */}
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fire-light via-fire to-fire-dark flex items-center justify-center shadow-fire-sm">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
            <path
              d="M12 2C12 2 8 6 8 11C8 13.5 9.5 15 12 15C14.5 15 16 13.5 16 11C16 9 15 7.5 14 6.5C14 8 13 9 12 9C12 7 12 5 12 2Z"
              fill="#fff"
            />
            <path
              d="M12 15C10 15 8.5 16.5 8.5 18.5C8.5 20.5 10 22 12 22C14 22 15.5 20.5 15.5 18.5C15.5 17 14.5 16 13 15.5C13 16.5 12.5 17 12 17C11.5 17 11 16.5 11 15.5C11.3 15.2 11.6 15 12 15Z"
              fill="#fff"
            />
          </svg>
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
