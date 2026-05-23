import type { Metadata } from 'next';
import { CalculadoraLanding } from '@/components/calculadora/CalculadoraLanding';

export const metadata: Metadata = {
  title: 'Calculadora de calorías gratis · En Forma con Hugo',
  description:
    'Descubre cuántas calorías necesitas comer para perder grasa, ganar músculo o mantener tu peso. Calculadora gratis basada en Mifflin-St Jeor.',
  openGraph: {
    title: 'Calculadora de calorías gratis · En Forma con Hugo',
    description:
      'Tu plan de calorías personalizado en 30 segundos. La misma fórmula que Hugo usa con sus alumnos.',
    type: 'website',
  },
};

export default function CalculadoraPage() {
  return <CalculadoraLanding />;
}
