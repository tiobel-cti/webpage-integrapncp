import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "IntegraPNCP — Integração com o Portal Nacional de Contratações Públicas",
  description: siteConfig.description,
  openGraph: {
    title: "IntegraPNCP — Integração com o PNCP",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/hero-integration.png",
        width: 1200,
        height: 630,
        alt: "IntegraPNCP - Integração com o Portal Nacional de Contratações Públicas",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
