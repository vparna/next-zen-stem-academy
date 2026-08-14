import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enroll Your Child – Daycare, Preschool & STEM Programs | NextZen Academy",
  description:
    "Register your interest in NextZen Academy's daycare, preschool, childcare, and STEM learning programs in Woodinville, WA. After school programs and coding for kids available.",
  keywords: ["daycare enrollment", "preschool enrollment", "childcare", "STEM learning", "Woodinville daycare", "Woodinville preschool"],
  alternates: { canonical: "https://www.nextzenacademy.com/interest" },
};

export default function InterestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
