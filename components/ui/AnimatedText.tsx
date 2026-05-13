'use client';

import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/cn';

type AnimatedTextProps = {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  stagger?: number;
  splitBy?: 'word' | 'char';
};

export function AnimatedText({
  text,
  className,
  as = 'h1',
  delay = 0,
  stagger = 0.04,
  splitBy = 'word',
}: AnimatedTextProps) {
  const Tag = motion[as as keyof typeof motion] as any;
  const parts = splitBy === 'word' ? text.split(' ') : text.split('');

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', damping: 18, stiffness: 110 },
    },
  };

  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
      aria-label={text}
    >
      {parts.map((part: string, i: number) => (
        <motion.span
          key={i}
          variants={child}
          style={{ display: 'inline-block', marginRight: splitBy === 'word' ? '0.3em' : '0' }}
        >
          {part === ' ' ? ' ' : part}
        </motion.span>
      ))}
    </Tag>
  );
}
