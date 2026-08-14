import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers – Join Our Team | NextZen Academy Woodinville",
  description:
    "Explore career opportunities at NextZen Academy in Woodinville, WA. Join our team of passionate daycare, preschool, and STEM educators.",
  keywords: ["daycare jobs", "preschool jobs", "STEM teacher", "Woodinville", "childcare careers"],
  alternates: { canonical: "https://www.nextzenacademy.com/careers" },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
