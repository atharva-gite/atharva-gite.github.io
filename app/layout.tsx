import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { FieldMarks } from "@/components/FieldMarks";
import { PointerGlow } from "@/components/PointerGlow";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { navigation, profile } from "@/lib/content";
import { themeBootScript } from "@/lib/themes";
import "./globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

const siteUrl = "https://atharva-gite.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: profile.name,
    template: `%s — ${profile.name}`,
  },
  description: profile.description,
  openGraph: {
    title: profile.name,
    description: "Software, machine learning, and markets.",
    url: siteUrl,
    siteName: profile.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: profile.name,
    description: "Software, machine learning, and markets.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c1219",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <div className="atmosphere" aria-hidden="true">
          <span className="atmosphere-glow" />
          <PointerGlow />
          <span className="atmosphere-grid" />
          <svg className="atmosphere-grain">
            <filter id="site-grain">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="2"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#site-grain)" />
          </svg>
        </div>
        <FieldMarks />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteHeader
          name={profile.name}
          email={profile.email}
          cv={profile.cvView}
          links={navigation}
        />
        {children}
        <SiteFooter name={profile.name} links={navigation} />
      </body>
    </html>
  );
}
