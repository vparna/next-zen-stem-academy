import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Summer Camps – Robotics, Math, Chess & Coding Camps for Kids | NextZen Academy",
  description:
    "Enroll in NextZen Academy summer camps in Woodinville, WA. Robotics & AI camp, Math Olympiad camp, chess mastery camp, and coding bootcamp for kids ages 6–18.",
  keywords: ["summer camp", "robotics learning", "coding for kids", "chess learning", "math learning", "STEM learning", "Woodinville"],
  alternates: { canonical: "https://www.nextzenacademy.com/summer-camps" },
  openGraph: {
    title: "Summer Camps | NextZen Academy – Woodinville WA",
    description: "Robotics, math, chess, and coding summer camps for kids in Woodinville, Washington.",
    url: "https://www.nextzenacademy.com/summer-camps",
  },
};

export default function SummerCampsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
