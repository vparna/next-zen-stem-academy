import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses – Robotics, Chess, Math & Coding Classes for Kids | NextZen Academy",
  description:
    "Browse robotics, chess, math, and coding courses at NextZen Academy in Woodinville, WA. STEM and STEAM learning programs for kids of all ages.",
  keywords: ["robotics learning", "chess learning", "math learning", "coding for kids", "STEM learning", "STEAM learning", "Woodinville STEM"],
  alternates: { canonical: "https://www.nextzenacademy.com/courses" },
  openGraph: {
    title: "Courses | NextZen Academy – Woodinville WA",
    description: "Robotics, chess, math, and coding classes for kids. STEM & STEAM courses in Woodinville, Washington.",
    url: "https://www.nextzenacademy.com/courses",
  },
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
