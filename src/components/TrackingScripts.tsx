"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, getStoredConsent, type ConsentStatus } from "@/lib/consent";

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const GA4_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

const GOOGLE_TAG_ID = GOOGLE_ADS_ID || GA4_ID;

/**
 * Laedt Google Ads/GA4- und Meta-Pixel-Skripte erst, nachdem der Nutzer im
 * Cookie-Banner zugestimmt hat, und nur wenn die jeweiligen IDs ueber
 * Umgebungsvariablen gesetzt sind (siehe .env.example).
 */
export function TrackingScripts() {
  const [consent, setConsent] = useState<ConsentStatus | null>(null);

  useEffect(() => {
    // localStorage ist nur im Browser verfuegbar, daher erst nach dem Mount lesbar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(getStoredConsent());
    function onChange(event: Event) {
      setConsent((event as CustomEvent<ConsentStatus>).detail);
    }
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (consent !== "granted") return null;

  return (
    <>
      {GOOGLE_TAG_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-tag-init" strategy="afterInteractive">
            {`
              gtag('config', '${GOOGLE_TAG_ID}');
              ${GA4_ID && GA4_ID !== GOOGLE_TAG_ID ? `gtag('config', '${GA4_ID}');` : ""}
            `}
          </Script>
        </>
      )}
      {META_PIXEL_ID && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
