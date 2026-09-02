import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LayoutShell from "@/components/layout/LayoutShell";
import { SITE } from "@contador/shared";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: `${SITE.name} | Contabilidad y automatización en Turbo`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "contador Turbo Antioquia",
    "contador público Turbo",
    "contabilidad en Turbo",
    "despacho contable Urabá",
    "declaración de renta",
    "calendario tributario DIAN",
    "simulador de sanciones DIAN",
    "asesoría tributaria",
    "constitución de empresa Colombia",
    "nómina",
    "ICA",
    "automatización contable",
    "asistente IA contador",
  ],
  alternates: {
    canonical: APP_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: APP_URL,
    siteName: SITE.name,
    title: `${SITE.name} | Contabilidad y automatización en Turbo`,
    description: SITE.description,
    locale: "es_CO",
    countryName: "Colombia",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Contabilidad y automatización en Turbo`,
    description: SITE.description,
  },
  category: "Contabilidad",
};

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: SITE.name,
    description: SITE.description,
    url: APP_URL,
    email: SITE.contact.email,
    telephone: SITE.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.location.city,
      addressRegion: SITE.location.department,
      addressCountry: "CO",
    },
    areaServed: ["Turbo", "Antioquia", "Colombia"],
    openingHours: "Mo-Fr 08:00-18:00",
    priceRange: "$$",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}