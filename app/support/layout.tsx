import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support & FAQ | NextZen Academy",
  description:
    "Get help with enrollment, payments, and account management at NextZen Academy. Frequently asked questions and support resources.",
  alternates: { canonical: "https://www.nextzenacademy.com/support" },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
