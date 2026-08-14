import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileRouteGuard from "@/components/MobileRouteGuard";

const SITE_URL = "https://www.nextzenacademy.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NextZen Academy – Premier Daycare, Preschool & STEM Learning in Woodinville, WA",
    template: "%s | NextZen Academy",
  },
  description:
    "NextZen Academy is a top-rated daycare, preschool, and STEM academy in Woodinville, Washington. We offer childcare, after school programs, robotics learning, chess learning, math learning, coding for kids, and STEAM education for ages 0–18.",
  keywords: [
    "daycare",
    "preschool",
    "pre-school",
    "childcare",
    "after school program",
    "STEM learning",
    "STEAM learning",
    "chess learning",
    "robotics learning",
    "math learning",
    "coding for kids",
    "Woodinville daycare",
    "Woodinville preschool",
    "Woodinville STEM",
    "Woodinville robotics",
    "Washington STEM academy",
    "NextZen Academy",
  ],
  authors: [{ name: "NextZen Academy" }],
  creator: "NextZen Academy",
  publisher: "NextZen Academy",
  formatDetection: { telephone: true, email: true, address: true },
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "NextZen Academy",
    title: "NextZen Academy – Premier Daycare, Preschool & STEM Learning in Woodinville, WA",
    description:
      "Top-rated daycare, preschool, and STEM academy in Woodinville, WA. Robotics, chess, math, coding for kids, and after school programs.",
    images: [
      {
        url: `${SITE_URL}/stem_hero_banner.png`,
        width: 1200,
        height: 630,
        alt: "NextZen Academy – STEM Learning for Kids in Woodinville WA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NextZen Academy – Daycare, Preschool & STEM Learning | Woodinville WA",
    description:
      "Premier childcare, preschool, and STEM academy in Woodinville, Washington. Robotics, chess, math, and coding for kids.",
    images: [`${SITE_URL}/stem_hero_banner.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add Google Search Console verification when available
    // google: "YOUR_VERIFICATION_CODE",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "EducationalOrganization", "ChildCare"],
      "@id": `${SITE_URL}/#organization`,
      name: "NextZen Academy",
      alternateName: "NextZen STEM Academy",
      url: SITE_URL,
      logo: `${SITE_URL}/brand-logo6.png`,
      image: `${SITE_URL}/stem_hero_banner.png`,
      description:
        "Premier daycare, preschool, and STEM academy in Woodinville, Washington offering childcare, after school programs, robotics, chess, math, coding for kids, and STEAM education.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Woodinville",
        addressRegion: "WA",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 47.7543,
        longitude: -122.1635,
      },
      areaServed: [
        { "@type": "City", name: "Woodinville" },
        { "@type": "State", name: "Washington" },
      ],
      sameAs: [],
      priceRange: "$$",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "15:15",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "10:00",
          closes: "12:00",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Programs & Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Daycare & Childcare" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Preschool Programs" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "After School Programs" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Robotics Learning" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Chess Learning" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Math Learning" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Coding for Kids" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "STEM & STEAM Learning" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "NextZen Academy",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/courses?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
      </body>
    </html>
  );
}
