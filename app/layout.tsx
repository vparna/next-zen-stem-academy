import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "NextZen Academy - Innovative Education",
  description: "Empowering young minds through Robotics, Mathematics, and Chess education with our unique 3S philosophy",
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
        <Navbar />
        <main className="flex-grow pt-[68px] lg:pt-[108px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
