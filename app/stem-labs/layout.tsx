import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "STEM Labs – Robotics, Coding, Chess & Math Labs | NextZen Academy Woodinville",
  description:
    "Explore our state-of-the-art STEM and STEAM learning labs in Woodinville, WA. Robotics lab, chess strategy room, coding studio, and math lab for kids of all ages.",
  keywords: ["STEM learning", "STEAM learning", "robotics learning", "chess learning", "math learning", "coding for kids", "Woodinville STEM", "Woodinville robotics"],
  alternates: { canonical: "https://www.nextzenacademy.com/stem-labs" },
  openGraph: {
    title: "STEM Labs | NextZen Academy – Woodinville WA",
    description: "State-of-the-art robotics, coding, chess, and math labs for kids. STEM & STEAM learning in Woodinville, Washington.",
    url: "https://www.nextzenacademy.com/stem-labs",
  },
};

export default function StemLabsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
