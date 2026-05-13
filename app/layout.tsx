import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'En Forma con Hugo | Pierde 4–10 kg en 8 semanas con el Método Acción Fit',
  description:
    'El método para perder grasa de verdad, sin pasar hambre, sin entrenar dos horas y sin depender de la motivación. +200 transformaciones reales.',
  openGraph: {
    title: 'En Forma con Hugo | Método Acción Fit',
    description:
      'Pierde 4–10 kg en 8 semanas con el método de Hugo Casal. Sin dietas imposibles. Sin rutinas locas. Solo resultados.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-ink text-white antialiased">
        {children}
      </body>
    </html>
  );
}
