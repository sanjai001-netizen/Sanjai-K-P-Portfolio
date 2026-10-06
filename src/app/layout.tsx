import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
import { ScrollProgress } from "@/components/motion/scroll-progress";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

/*
 * Set NEXT_PUBLIC_SITE_URL to the real production origin to enable canonical
 * and absolute Open Graph URLs. Nothing is invented when it is absent.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const title = "Sanjai KP — Full Stack Developer";
const description =
  "Sanjai KP is a Full Stack Developer specializing in Python, Django, React, JavaScript and scalable web applications.";

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
  title,
  description,
  applicationName: "Sanjai KP",
  authors: [{ name: "Sanjai KP" }],
  creator: "Sanjai KP",
  keywords: ["Sanjai KP", "Full Stack Developer", "Python", "Django", "React", "JavaScript", "Kerala"],
  openGraph: {
    type: "website",
    title,
    description,
    siteName: "Sanjai KP",
    locale: "en_IN",
    ...(siteUrl ? { url: "/" } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
  colorScheme: "light",
};

// Runs before first paint so motion-only hidden states never flash.
const preflight = `document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${grotesk.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preflight }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ScrollProgress />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
