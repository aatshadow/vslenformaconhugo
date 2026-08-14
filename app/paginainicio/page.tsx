import type { Metadata } from 'next';
import { PaginaInicioPage } from '@/components/paginainicio/PaginaInicioPage';
import { asset } from '@/lib/basePath';

// El enlace de la bio de Instagram (@enformaconhugo_): "quién eres, por qué
// escucharte, a dónde voy" en una pantalla, sin scroll del VSL de detrás.
// Mismo patrón que /gracias — metadata propia + componente en components/.
export const metadata: Metadata = {
  title: 'En Forma con Hugo — Empieza aquí',
  description:
    'Pierde 4–10 kg en 8 semanas con el Método Acción Fit. Sin pasar hambre, sin entrenar dos horas al día y sin depender de la motivación.',
  openGraph: {
    title: 'En Forma con Hugo — Empieza aquí',
    description:
      'Pierde 4–10 kg en 8 semanas con el Método Acción Fit. +200 transformaciones reales.',
    type: 'profile',
    images: [asset('/hugo/hugo-avatar.png')],
  },
  twitter: { card: 'summary_large_image' },
};

export default function Page() {
  return <PaginaInicioPage />;
}
