import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { LenisProvider } from "@/components/motion/lenis-provider";
import { SiteNav } from "@/components/navigation/site-nav";
import { SiteFooter } from "@/components/navigation/site-footer";
import { ThemeInit } from "@/components/theme/theme-init";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elvisfernandes.com"),
  title: {
    default: "Elvis Fernandes — Designer",
    template: "%s · Elvis Fernandes",
  },
  description:
    "Elvis Fernandes designs and builds thoughtful UX/UI, scalable design systems, and front-end experiences.",
  keywords: [
    "Designer",
    "UX/UI",
    "Product Design",
    "Design Systems",
    "Front-End",
    "Design Engineer",
    "Modulate",
    "ToxMod",
    "Voice Vault",
  ],
  authors: [{ name: "Elvis Fernandes" }],
  creator: "Elvis Fernandes",
  openGraph: {
    type: "website",
    title: "Elvis Fernandes — Designer",
    description:
      "Elvis Fernandes designs and builds thoughtful UX/UI, scalable design systems, and front-end experiences.",
    url: "/",
    siteName: "Elvis Fernandes",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elvis Fernandes — Designer",
    description:
      "Thoughtful UX/UI, scalable design systems, and front-end experiences.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/apple-icon",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
    { media: "(prefers-color-scheme: light)", color: "#f4f1ea" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeInit />
        {/* Google tag (gtag.js) — site-wide via root layout */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YWTKHHL6K0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-g-ywtkhhl6k0" strategy="afterInteractive">
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-YWTKHHL6K0');
`}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <a href="#main" className="sr-only focus:not-sr-only fixed left-4 top-4 z-50 bg-canvas-raised px-3 py-2 text-ink t-mono">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Elvis Fernandes",
              jobTitle: "Designer",
              description:
                "Elvis Fernandes designs and builds thoughtful UX/UI, scalable design systems, and front-end experiences.",
              worksFor: { "@type": "Organization", name: "Modulate" },
              url: "https://elvisfernandes.com",
              sameAs: [
                "https://www.linkedin.com/in/elvisfdesign/",
                "https://elvisfernandes.com/practice/ai-for-product-designers",
              ],
              knowsAbout: [
                "UX/UI Design",
                "Product Design",
                "Design Systems",
                "Front-End",
                "AI Workflows",
              ],
            }),
          }}
        />
        <ThemeProvider>
          <LenisProvider>
            <SiteNav />
            <main id="main">{children}</main>
            <SiteFooter />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
