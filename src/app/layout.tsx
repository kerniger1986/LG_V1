import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ConsentBanner } from "@/components/ConsentBanner";
import { TrackingScripts } from "@/components/TrackingScripts";
import { personaSans } from "@/lib/persona-fonts";

export const metadata: Metadata = {
  title: "Kostenlose Immobilien-Einschätzung Rhein-Sieg | Rhein-Sieg Immobilienberatung",
  description:
    "Kostenlose, unverbindliche Einschätzung Ihrer Immobilie durch einen lokalen Marktkenner in Bad Honnef und im Rhein-Sieg-Kreis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <head>
        {/* Google Consent Mode v2: Standard "denied", bis der Nutzer im
            Cookie-Banner zustimmt. Muss vor allen Tracking-Skripten laufen. */}
        <Script id="consent-mode-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500
            });
          `}
        </Script>
      </head>
      <body
        className={`${personaSans.className} flex min-h-full flex-col bg-[#EFF2ED] text-[#23282A]`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ConsentBanner />
        <TrackingScripts />
      </body>
    </html>
  );
}
