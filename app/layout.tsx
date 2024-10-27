import "./globals.css";

import { ReactNode } from "react";
import { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Analytics } from "@vercel/analytics/react";

import { sans } from "./fonts";
import { clx } from "./utils";

import Header from "./header";
import Footer from "./footer";
import { SITE_URL } from "./constants";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}`),
  alternates: {
    canonical: "/",
    types: {
      "application/atom+xml": `${SITE_URL}/atom.xml`,
      "application/rss+xml": `${SITE_URL}/rss.xml`,
    },
  },
  title: {
    default: "dvbtrung — A blog by Trung Dang",
    template: "%s | Trung Dang",
  },
  description: "dvbtrung — A blog by Trung Dang",
  openGraph: {
    title: "dvbtrung — A blog by Trung Dang",
    description: "dvbtrung — A blog by Trung Dang",
    url: SITE_URL,
    siteName: "dvbtrung",
    locale: "en_US",
    type: "website",
    images: [`${SITE_URL}/og/home`],
  },
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  twitter: {
    title: "dvbtrung",
    card: "summary_large_image",
    creator: "@dvbtrung",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={clx(
          "bg bg-neutral-100 text-black dark:bg-neutral-950 dark:text-white",
          sans.className,
        )}
      >
        <body className="mx-auto flex min-h-dvh max-w-2xl flex-col bg-[--bg] px-5 py-12 text-[--text]">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  );
}
