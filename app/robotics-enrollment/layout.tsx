import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Robotics Camp Enrollment | NextZen Academy Woodinville",
  description:
    "Enroll in NextZen Academy's robotics camp in Woodinville, WA. Hands-on robotics learning, coding, and engineering for kids.",
  keywords: ["robotics learning", "robotics camp", "coding for kids", "Woodinville robotics", "STEM learning"],
  alternates: { canonical: "https://www.nextzenacademy.com/robotics-enrollment" },
};

export default function RoboticsEnrollmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
