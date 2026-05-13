'use client';

import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/cn';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

export function FadeInSection({ children, className, delay = 0, y = 40, once = true }: Props) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.15 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
