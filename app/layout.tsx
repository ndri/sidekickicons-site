import type { Metadata } from "next";
import "./globals.css";
import PlausibleProvider from "next-plausible";
import "@fontsource-variable/inter";
import { ThemeProvider } from "next-themes";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Hides a dismissed ClankerView banner (components/Ad.tsx) before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("clankerViewDismissed")==="true")document.documentElement.dataset.clankerViewDismissed=""}catch(e){}`,
          }}
        />
        {plausibleDomain && (
          <PlausibleProvider
            domain={plausibleDomain}
            scriptProps={{
              src: "/js/script.js",
              // @ts-expect-error data-api is not a valid attribute, but it's used by Plausible
              "data-api": "/api/event",
            }}
          />
        )}
      </head>
      <body className="text-slate-800 dark:bg-slate-900 dark:text-slate-100">
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  );
}
