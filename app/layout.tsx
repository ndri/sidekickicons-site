import type { Metadata } from "next";
import "./globals.css";
import PlausibleProvider from "next-plausible";

export const metadata: Metadata = {
  title: "Sidekickicons",
  description: "Fanmade icons to complement Heroicons",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const plausibleDomain = process.env.PLAUSIBLE_DOMAIN;

  return (
    <html lang="en" className="dark">
      {plausibleDomain && (
        <head>
          <PlausibleProvider
            domain={plausibleDomain}
            scriptProps={{
              src: "/js/script.js",
              // @ts-expect-error data-api is not a valid attribute, but it's used by Plausible
              "data-api": "/api/event",
            }}
          />
        </head>
      )}
      <body className="text-slate-800 dark:bg-slate-900 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
