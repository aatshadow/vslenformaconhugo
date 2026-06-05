import type { Metadata } from 'next';
import './globals.css';
import { asset } from '@/lib/basePath';
import { MetaPixel } from '@/components/MetaPixel';

export const metadata: Metadata = {
  title: 'En Forma con Hugo | Pierde 4–10 kg en 8 semanas con el Método Acción Fit',
  description:
    'El método para perder grasa de verdad, sin pasar hambre, sin entrenar dos horas y sin depender de la motivación. +200 transformaciones reales.',
  // Favicon = foto de Hugo. Vive en /public/hugo/hugo-avatar.png. La
  // función asset() añade el basePath /vslenformaconhugo cuando la web
  // se sirve detrás del rewrite de central.blackwolfsec.io.
  icons: {
    icon: [
      { url: asset('/hugo/hugo-avatar.png'), type: 'image/png' },
    ],
    apple: [
      { url: asset('/hugo/hugo-avatar.png'), sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'En Forma con Hugo | Método Acción Fit',
    description:
      'Pierde 4–10 kg en 8 semanas con el método de Hugo Casal. Sin dietas imposibles. Sin rutinas locas. Solo resultados.',
    type: 'website',
    images: [asset('/hugo/hugo-avatar.png')],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-ink text-white antialiased">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
