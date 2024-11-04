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
      <body className="text-slate-800 dark:bg-slate-900 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
