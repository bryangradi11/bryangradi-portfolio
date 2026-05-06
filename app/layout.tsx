import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import KonamiCode from "@/components/KonamiCode";
import Terminal from "@/components/Terminal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const SITE_URL = "https://bryangradi-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bryan Gradi — Founder & Full-Stack Engineer",
    template: "%s · Bryan Gradi",
  },
  description:
    "Building AI-powered software, automation and digital products for businesses. Founder of Gradios, based in Londrina, Brazil.",
  applicationName: "Bryan Gradi Portfolio",
  authors: [{ name: "Bryan Gradi", url: SITE_URL }],
  creator: "Bryan Gradi",
  publisher: "Bryan Gradi",
  keywords: [
    "Bryan Gradi",
    "Gradios",
    "Full-Stack Engineer",
    "AI Engineer",
    "Software Development",
    "Automation",
    "Next.js",
    "TypeScript",
    "Londrina",
    "Brazil",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bryan Gradi — Founder & Full-Stack Engineer",
    description:
      "Building AI-powered software, automation and digital products for businesses.",
    url: SITE_URL,
    siteName: "Bryan Gradi",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bryan Gradi — Founder & Full-Stack Engineer",
    description:
      "Building AI-powered software, automation and digital products for businesses.",
    creator: "@bryangradi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0a0e1a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        {children}
        <CustomCursor />
        <KonamiCode />
        <Terminal />
      </body>
    </html>
  );
}
