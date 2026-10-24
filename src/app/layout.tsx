import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pursuit — Track Your Career Journey",
  description:
    "Track jobs, bursaries and university applications in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
         <body className="bg-background font-body text-text-primary">{children}</body>
    </html>
  );
}