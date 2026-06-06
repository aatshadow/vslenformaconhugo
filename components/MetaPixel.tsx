'use client';

import Script from 'next/script';

// VSL Pixel hardcodeado (con override opcional por env) → no necesita config en Vercel.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '1645625716701791';

/**
 * Meta Pixel base loader (browser-side).
 * Fires PageView on every full page load (landing + /gracias) and, crucially,
 * sets the _fbp / _fbc cookies so the server-side CAPI event can deduplicate
 * and attribute correctly. The actual conversion (Schedule) is fired from
 * <MetaSchedule /> on /gracias with a shared eventID.
 */
export function MetaPixel() {
  if (!PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','${PIXEL_ID}');
        fbq('track','PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
