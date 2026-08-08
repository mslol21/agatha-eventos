import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { EventCartProvider } from "@/context/EventCartContext";
import { EventCartDrawer } from "@/components/cart/EventCartDrawer";
import { EventCartButton } from "@/components/cart/EventCartButton";

export const metadata: Metadata = {
  title: "Agatha Eventos | Carrinhos Gourmet para Eventos em São Paulo",
  description:
    "Carrinhos gourmet, crepe suíço, pipoca, algodão doce, hot dog e experiências gastronômicas para eventos corporativos, festas e celebrações em São Paulo, região, interior e litoral.",
  keywords: [
    "Carrinhos gourmet São Paulo",
    "Pipoca gourmet para eventos",
    "Crepe suíço para festas",
    "Algodão doce eventos corporativos",
    "Hot dog gourmet festas",
    "Brigadeiro de colher casamentos",
    "Experiências gastronômicas Jardim Anália Franco",
    "Agatha Eventos SP",
  ],
  authors: [{ name: "Agatha Eventos" }],
  creator: "Agatha Eventos",
  metadataBase: new URL("https://agathaeventos.com.br"),
  openGraph: {
    title: "Agatha Eventos | Carrinhos Gourmet para Eventos em SP",
    description:
      "Experiências gastronômicas, carrinhos gourmet de pipoca, crepe, algodão doce, hot dog e brigadeiro para festas e eventos corporativos.",
    url: "https://agathaeventos.com.br",
    siteName: "Agatha Eventos",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Agatha Eventos Carrinhos Gourmet",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Agatha Eventos",
    image: "https://agathaeventos.com.br/images/logo.png",
    description:
      "Carrinhos gourmet, comidas rápidas e experiências gastronômicas para eventos corporativos, festas particulares, aniversários e celebrações.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jardim Anália Franco",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-23.5574",
      longitude: "-46.5615",
    },
    areaServed: [
      "São Paulo Capital",
      "Grande São Paulo",
      "Interior de São Paulo",
      "Litoral de São Paulo",
    ],
    sameAs: ["https://www.instagram.com/agathaeventos2024/"],
    priceRange: "$$",
  };

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-white text-slate-800">
        <EventCartProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <EventCartButton variant="floating" />
          <EventCartDrawer />
          <MobileCTABar />
        </EventCartProvider>
      </body>
    </html>
  );
}
