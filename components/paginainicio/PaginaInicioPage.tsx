import Image from 'next/image';
import { asset } from '@/lib/basePath';

// PÁGINA INICIO — el "empieza aquí" de En Forma con Hugo.
//
//   web.enformaconhugo.com/paginainicio
//
// Es el destino del enlace de la bio de Instagram (@enformaconhugo_): alguien
// ve un Reel, pulsa el enlace y aterriza aquí. Una sola pantalla, sin scroll
// del VSL de detrás — dice quién es Hugo y manda a uno de dos sitios.
//
// El botón con relleno es la web del Método Acción Fit, no YouTube: es donde
// vive la reserva de la llamada gratuita, el único paso de toda la marca
// donde alguien se convierte en cliente. YouTube queda de apoyo, para quien
// quiere ver antes de decidir.
//
// Usa los tokens de marca que ya existen en este proyecto (fire, cta-fire,
// section-eyebrow, font-display) en vez de traer una paleta aparte: esto vive
// en el mismo sitio que el VSL y tiene que sentirse la misma marca, no una
// página pegada con otra herramienta.
const WEB = 'https://web.enformaconhugo.com/';
const YOUTUBE = 'https://www.youtube.com/@enformaconhugo';

// Llama y no mancuerna: es el símbolo de la propia marca (el color se llama
// "fire" en tailwind.config.ts) y a 22px se lee limpio, cosa que un icono de
// gimnasio dibujado a mano no garantiza.
const IconFuego = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12.5 1.5c.6 3-1 4.6-2.3 6-1.4 1.5-2.7 3-2.2 5.5-1-.6-1.6-1.7-1.7-2.8C3.9 12 3 14 3 16a9 9 0 0 0 18 0c0-4-2-6.7-4.5-9 .3 2-.4 3.3-1.6 4.2-.2-3.6-1.3-6.8-2.4-9.7Z" />
  </svg>
);

const IconYoutube = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.5v-7L15.8 12Z" />
  </svg>
);

const IconArrow = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M7 17 17 7" /><path d="M7 7h10v10" />
  </svg>
);

export function PaginaInicioPage() {
  return (
    <main className="relative min-h-[100svh] flex items-center justify-center px-4 py-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-60" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-fire-radial blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-[440px] flex flex-col items-center text-center gap-3.5">
        <div className="relative w-full aspect-square rounded-[22px] overflow-hidden border border-fire/20 shadow-fire-md bg-slate-950">
          <Image
            src={asset('/hugo/hugo-avatar.png')}
            alt="Hugo, entrenador de En Forma con Hugo"
            fill
            sizes="(min-width: 700px) 440px, 100vw"
            style={{ objectFit: 'cover', objectPosition: '50% 15%' }}
            priority
          />
        </div>

        <div className="flex flex-col gap-0.5 mt-0.5">
          <span className="font-display text-lg uppercase tracking-wide">Hugo</span>
          <span className="font-body text-[13px] text-slate-400">Entrenador · Método Acción Fit</span>
        </div>

        <h1 className="font-display uppercase leading-[1.05] text-[clamp(26px,7.5vw,34px)] tracking-[-0.01em] text-balance">
          No es tu cuerpo.<br />Es tu <span className="text-fire-gradient">método</span>
        </h1>

        <p className="font-body text-[14.5px] leading-relaxed text-slate-300 max-w-[38ch]">
          Sin pasar hambre. Sin entrenar dos horas al día. Sin depender de la motivación.
          Un plan hecho para tu vida real, no para la de otro.
        </p>

        <span className="section-eyebrow">+200 transformaciones reales</span>

        <div className="flex items-center gap-3 w-full mt-1">
          <span className="flex-1 h-px bg-white/10" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">Empieza aquí</span>
          <span className="flex-1 h-px bg-white/10" />
        </div>

        <div className="flex flex-col gap-2.5 w-full">
          {/* El primario: aquí está la llamada 1-a-1 gratuita. Es de fondo
              distinto al `.cta-fire` del resto del sitio a propósito — ese es
              un botón de una sola línea centrada y este lleva icono, dos
              líneas y flecha, así que se construye directo en vez de forzarle
              esa forma a un componente pensado para otra. Mismo degradado y
              resplandor, para que se note que es la misma marca. */}
          <a
            href={WEB} target="_blank" rel="noopener noreferrer"
            className="group flex items-center gap-3 w-full rounded-2xl py-4 px-[18px] text-white
                       bg-gradient-to-b from-fire-light via-fire to-fire-dark
                       shadow-fire-md transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-fire-lg"
          >
            <IconFuego className="w-[22px] h-[22px] shrink-0" />
            <span className="flex-1 text-left">
              <span className="block font-semibold text-[15px]">Ver el Método Acción Fit</span>
              <small className="block text-[12px] text-white/80 mt-0.5">Reserva tu llamada gratis · cupos limitados</small>
            </span>
            <IconArrow className="w-[17px] h-[17px] shrink-0 opacity-75 transition-transform group-hover:translate-x-0.5" />
          </a>

          <a
            href={YOUTUBE} target="_blank" rel="noopener noreferrer"
            className="group flex items-center gap-3 w-full rounded-2xl py-4 px-[18px] border border-white/10 bg-white/5 text-white
                       transition-all duration-200 hover:bg-white/[0.09] hover:border-fire/40 hover:-translate-y-0.5"
          >
            <IconYoutube className="w-[22px] h-[22px] shrink-0 text-fire-light" />
            <span className="flex-1 text-left">
              <span className="block font-semibold text-[15px]">Mírame en YouTube</span>
              <small className="block text-[12px] text-slate-400 mt-0.5">Entrenos, comidas y casos reales</small>
            </span>
            <IconArrow className="w-[17px] h-[17px] shrink-0 opacity-55 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate-500 mt-1">
          En Forma con Hugo · Entrenamiento y nutrición para gente ocupada
        </p>
      </div>
    </main>
  );
}
