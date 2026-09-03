import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileRouteGuard from "@/components/MobileRouteGuard";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nextzenacademy.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NextZen Academy - Innovative Education",
    template: "%s | NextZen Academy",
  },
  description: "Empowering young minds through Robotics, Mathematics, and Chess education with our unique 3S philosophy",
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
    title: "NextZen Academy - Innovative Education",
    description: "Empowering young minds through Robotics, Mathematics, and Chess education with our unique 3S philosophy",
    url: siteUrl,
    siteName: "NextZen Academy",
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'NextZen Academy Logo',
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
    title: "NextZen Academy - Innovative Education",
    description: "Empowering young minds through Robotics, Mathematics, and Chess education with our unique 3S philosophy",
    images: ['/opengraph-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
