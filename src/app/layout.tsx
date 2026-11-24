import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Full stack web developer building with React, Next.js, Laravel and PostgreSQL. I ship features and the tests that keep them standing.",
  openGraph: {
    title: "Czerina Piedad — Full Stack Web Developer",
    description: "I ship features and the tests that keep them standing.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4eee6",
};

/**
 * Runs before first paint: decides whether the intro plays.
 * - "playing": every page load; the Intro component flips it to "done" when finished.
 * - "skip": the visitor prefers reduced motion, or the `skip-intro` flag is set
 *   (used by the end-to-end tests to start on the page itself).
 */
const introGate = `(function(){try{var d=document.documentElement;var flag=sessionStorage.getItem('skip-intro')==='1';var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;d.dataset.intro=(flag||reduce)?'skip':'playing';}catch(e){document.documentElement.dataset.intro='playing';}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGate }} />
        <noscript>
          <style>{`.intro{display:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full bg-oat font-sans text-ink">{children}</body>
    </html>
  );
}
