import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | Contabilidad, automatización e IA en Turbo`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "contador Turbo Antioquia",
    "contabilidad Turbo",
    "declaración de renta",
    "DIAN",
    "servicios contables Colombia",
    "automatización contable",
    "asistente IA contador",
    "nómina",
    "ICA",
  ],
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    locale: "es_CO",
    type: "website",
  },
};

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
        <LayoutShell>{children}</LayoutShell>
        <Analytics />
      </body>
    </html>
  );
}