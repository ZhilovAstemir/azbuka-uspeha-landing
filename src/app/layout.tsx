import type { Metadata, Viewport } from "next";
import { Nunito, Comfortaa } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";
import { Analytics } from "@/components/Analytics";

const nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const comfortaa = Comfortaa({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "700"],
  variable: "--font-comfortaa",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline} | Раннее развитие, подготовка к школе`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "детский центр",
    "развитие детей",
    "подготовка к школе",
    "раннее развитие",
    "английский для детей",
    "ментальная арифметика",
    "логопед",
    "детский развивающий центр",
  ],
  applicationName: site.name,
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: "Помогаем детям расти умными, уверенными и счастливыми. Первое пробное занятие — бесплатно!",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: "Центр детского развития. Первое пробное занятие бесплатно!",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#7b61ff",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ChildCare",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phoneHref,
  email: site.email,
  address: { "@type": "PostalAddress", streetAddress: site.address, addressCountry: "RU" },
  openingHours: "Mo-Su 09:00-20:00",
  priceRange: "₽₽",
  sameAs: [site.socials.instagram, site.socials.vk, site.socials.telegram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${nunito.variable} ${comfortaa.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics
          yandexId={site.analytics.yandexMetrikaId}
          gaId={site.analytics.gaMeasurementId}
        />
      </body>
    </html>
  );
}
