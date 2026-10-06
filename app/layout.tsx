import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileRouteGuard from "@/components/MobileRouteGuard";
import ScheduleTourChatbot from "@/components/ScheduleTourChatbot";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nextzenacademy.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NextZen Academy | Daycare & Preschool in Bothell, WA",
    template: "%s | NextZen Academy Bothell",
  },
  description: "NextZen Academy offers premier infant daycare, toddler care, and preschool in Bothell, WA. Schedule a campus tour to explore our nurturing classrooms.",
  keywords: [
    "Daycare Bothell WA",
    "Preschool Bothell WA",
    "Infant Care Bothell",
    "Toddler Daycare Bothell",
    "Early Childhood Education",
    "NextZen Academy",
    "Childcare Bothell",
    "Pre-K Bothell WA",
    "Woodinville Daycare",
  ],
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
      { url: '/brand-logo5.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: "NextZen Academy | Daycare & Preschool in Bothell, WA",
    description: "Premier infant daycare, toddler care, and preschool programs in Bothell, WA. Schedule a campus tour to discover our nurturing classrooms.",
    url: siteUrl,
    siteName: "NextZen Academy",
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'NextZen Academy - Nurturing Daycare & Preschool',
      },
      {
        url: '/brand-logo5.png',
        width: 1536,
        height: 721,
        alt: 'NextZen Academy Brand Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "NextZen Academy | Daycare & Preschool in Bothell, WA",
    description: "Premier infant daycare, toddler care, and preschool programs in Bothell, WA. Schedule a campus tour to discover our nurturing classrooms.",
    images: ['/opengraph-image.png'],
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["ChildCare", "Preschool", "LocalBusiness", "EducationalOrganization"],
  "name": "NextZen Academy of Bothell",
  "alternateName": "NextZen Academy",
  "url": "https://www.nextzenacademy.com",
  "logo": "https://www.nextzenacademy.com/brand-logo5.png",
  "image": "https://www.nextzenacademy.com/hero_img.png",
  "description": "NextZen Academy provides premier infant daycare, toddler care, and preschool programs with structured routines and kindergarten readiness in Bothell and Woodinville, WA.",
  "telephone": "+1-425-325-0431",
  "email": "info@nextzenacademy.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "21304 State Route 9 SE",
    "addressLocality": "Woodinville",
    "addressRegion": "WA",
    "postalCode": "98072",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 47.7850,
    "longitude": -122.1450
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "07:00",
      "closes": "17:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/people/NextZen-Academy/61576528763105",
    "https://instagram.com/nextzenstem"
  ],
  "priceRange": "$$"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body
        className="antialiased flex flex-col min-h-screen bg-gray-50"
      >
        <MobileRouteGuard />
        <Navbar />
        <main className="flex-grow pt-[68px] lg:pt-[108px]">
          {children}
        </main>
        <Footer />
        <ScheduleTourChatbot />
      </body>
    </html>
  );
}
