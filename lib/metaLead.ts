// Browser-side Meta Pixel "Lead" helper.
//
// Arquitectura "Ambos":
//  - Navegador (aquí): fbq('track','Lead', ..., { eventID }) con un event_id.
//  - Servidor (central.blackwolfsec.io / APEX): envía la Conversions API (Lead +
//    Schedule del booking) usando el MISMO event_id → Meta deduplica.
//
// Por eso el form manda event_id + fbp/fbc a central junto al lead.

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return m ? decodeURIComponent(m[2]) : undefined;
}

export function makeEventId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `evt-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export type MetaLeadMeta = {
  eventId: string;
  fbp?: string;
  fbc?: string;
  eventSourceUrl?: string;
};

/** Contexto de deduplicación para enviar a central junto al lead. */
export function getMetaLeadMeta(eventId: string): MetaLeadMeta {
  return {
    eventId,
    fbp: getCookie('_fbp'),
    fbc: getCookie('_fbc'),
    eventSourceUrl: typeof window !== 'undefined' ? window.location.href : undefined,
  };
}

/** Dispara el evento Lead del Pixel en el navegador (deduplicado vía eventID). */
export function fireMetaLead(eventId: string): void {
  try {
    const fbq = (window as any).fbq;
    if (typeof fbq === 'function') {
      fbq('track', 'Lead', { content_name: 'VSL · Reserva llamada' }, { eventID: eventId });
    }
  } catch {}
}
