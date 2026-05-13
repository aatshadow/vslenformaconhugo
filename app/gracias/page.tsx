import type { Metadata } from 'next';
import { GraciasPage } from '@/components/gracias/GraciasPage';

export const metadata: Metadata = {
  title: '¡Reserva confirmada! · En Forma con Hugo',
  description: 'Tu llamada con Hugo está reservada. Prepárate para tu transformación.',
  robots: { index: false, follow: false },
};

export default function Gracias() {
  return <GraciasPage />;
}
