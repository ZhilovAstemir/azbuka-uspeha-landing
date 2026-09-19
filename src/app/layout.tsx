import type { Metadata, Viewport } from "next";
import { Unbounded, Onest } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";
import { Analytics } from "@/components/Analytics";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-onest",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-unbounded",
  display: "swap",
});

const title = `${site.name} — детский центр развития в Нальчике | Продлёнка, подготовка к школе, английский`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  keywords: [
    "детский центр Нальчик",
    "продлёнка Нальчик",
    "группа продлённого дня Нальчик",
    "подготовка к школе Нальчик",
    "английский для детей Нальчик",
    "программирование для детей Нальчик",
    "развивающий центр Нальчик",
    "шахматы для детей",
    "скорочтение",
    "нейроупражнения",
    "Азбука успеха",
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
    description: `${site.motto}. Дети ${site.ages}. Продлёнка со скидкой 20% первым 10 записавшимся. ${site.address}.`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: `${site.motto}. Дети ${site.ages}. ${site.addressShort}, Нальчик.`,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#172036",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["ChildCare", "EducationalOrganization"],
  name: site.name,
  alternateName: "Азбука Успеха — центр развития",
  slogan: site.slogan,
  description: site.description,
  url: site.url,
  telephone: site.phoneHref,
  image: `${site.url}/og-image.jpg`,
  logo: `${site.url}/images/avatar.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Атажукина, 18",
    addressLocality: "Нальчик",
    addressRegion: "Кабардино-Балкарская Республика",
    addressCountry: "RU",
  },
  areaServed: "Нальчик",
  priceRange: "₽₽",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${onest.variable} ${unbounded.variable}`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Analytics yandexId={site.analytics.yandexMetrikaId} gaId={site.analytics.gaMeasurementId} />
      </body>
    </html>
  );
}
