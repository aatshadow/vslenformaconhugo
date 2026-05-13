import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { ProblemaAgitacion } from '@/components/sections/ProblemaAgitacion';
import { MetodoAccionFit } from '@/components/sections/MetodoAccionFit';
import { QuienEsHugo } from '@/components/sections/QuienEsHugo';
import { Testimonios } from '@/components/sections/Testimonios';
import { StackOferta } from '@/components/sections/StackOferta';
import { Garantia } from '@/components/sections/Garantia';
import { UrgenciaVerano } from '@/components/sections/UrgenciaVerano';
import { FAQ } from '@/components/sections/FAQ';
import { FormularioReserva } from '@/components/sections/FormularioReserva';
import { AgendaDirecta } from '@/components/sections/AgendaDirecta';
import { Footer } from '@/components/sections/Footer';
import { StickyMobileCTA } from '@/components/ui/StickyMobileCTA';

export default function Home() {
  return (
    <main className="relative bg-ink">
      <Header />
      <Hero />
      <ProblemaAgitacion />
      <MetodoAccionFit />
      <QuienEsHugo />
      <Testimonios />
      <StackOferta />
      <Garantia />
      <UrgenciaVerano />
      <FAQ />
      <FormularioReserva />
      <AgendaDirecta />
      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
