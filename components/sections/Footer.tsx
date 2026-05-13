'use client';

import { Logo } from '../ui/Logo';

export function Footer() {
  return (
    <footer className="relative px-4 pt-16 pb-8 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr] gap-10 mb-12">
          <div>
            <Logo />
            <p className="font-body text-slate-400 text-sm mt-5 max-w-sm leading-relaxed">
              Coach fitness español. El puente entre el cuerpo que quieres y la vida que tienes. +200 transformaciones reales con el Método Acción Fit.
            </p>
          </div>

          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-fire-light mb-4">
              Navegación
            </div>
            <ul className="space-y-2 font-body text-sm text-slate-300">
              <li><a href="#metodo" className="hover:text-fire transition-colors">El método</a></li>
              <li><a href="#testimonios" className="hover:text-fire transition-colors">Resultados</a></li>
              <li><a href="#oferta" className="hover:text-fire transition-colors">Oferta y bonos</a></li>
              <li><a href="#faq" className="hover:text-fire transition-colors">FAQ</a></li>
              <li><a href="#reservar" className="hover:text-fire transition-colors">Reservar llamada</a></li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-fire-light mb-4">
              Hugo
            </div>
            <ul className="space-y-2 font-body text-sm text-slate-300">
              <li>
                <a
                  href="https://www.instagram.com/enformaconhugo_"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-fire transition-colors inline-flex items-center gap-2"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.69-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.89 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/>
                  </svg>
                  @enformaconhugo_
                </a>
              </li>
              <li>
                <span className="text-slate-500 text-xs uppercase tracking-widest font-mono">Verificado en Instagram</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
            © {new Date().getFullYear()} En Forma con Hugo · Todos los derechos reservados
          </div>
          <div className="flex gap-5 text-[10px] font-mono uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-fire transition-colors">Aviso legal</a>
            <a href="#" className="hover:text-fire transition-colors">Privacidad</a>
            <a href="#" className="hover:text-fire transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
