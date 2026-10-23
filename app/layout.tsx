import type { Metadata, Viewport } from "next";
import { Share_Tech_Mono, Rajdhani } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import Script from "next/script";
import { IntroGate } from "@/components/intro/IntroGate";
import { CRTOverlay } from "@/components/ui/CRTOverlay";
import { BackgroundTexture } from "@/components/ui/BackgroundTexture";

const shareTech = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-share-tech",
  display: "swap",
});
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HUGO_LEONARDO // Full-Stack Software Engineer",
  description:
    "Personal terminal of Hugo Leonardo, Full-Stack Software Engineer. Projects, experience and contact.",
  openGraph: {
    title: "HUGO_LEONARDO // Full-Stack Software Engineer",
    description: "Personal terminal of Hugo Leonardo.",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0A1118",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${shareTech.variable} ${rajdhani.variable}`} suppressHydrationWarning>
      <head>
        <Script
          id="intro-pending"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.classList.add('intro-pending');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="vignette">
        <CRTOverlay />
        <BackgroundTexture />
        <IntroGate />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}