import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Camp Interest Form – Summer Camps | NextZen Academy Woodinville",
  description:
    "Register your interest in NextZen Academy's summer camps for robotics, chess, math, and coding in Woodinville, WA.",
  keywords: ["summer camp enrollment", "robotics camp", "coding camp", "chess camp", "Woodinville"],
  alternates: { canonical: "https://www.nextzenacademy.com/campinterest" },
};

export default function CampInterestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
