import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "MindSense | Machine Learning-Based Mental Wellness Prediction",
  description:
    "Explore how your digital habits, lifestyle, and academic routine relate to a machine-learning predicted mental health score.",
  keywords: [
    "MindSense",
    "mental health",
    "digital wellness",
    "mental health assessment",
    "machine learning",
    "student wellness",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
