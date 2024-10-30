import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sidekickicons",
  description: "Fanmade icons to complement Heroicons",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
