import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GameTrust MVP",
  description: "Gaming social commerce MVP prototype with business logic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
