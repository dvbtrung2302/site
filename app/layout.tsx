import "./globals.css";

import { ReactNode } from "react";
import { ViewTransitions } from "next-view-transitions";

import { sans } from "./fonts";
import { clx } from "./utils";

import Header from "./header";
import Footer from "./footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  // metadataBase: new URL(""), // update later
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Trung Dang",
    template: "%s | Trung Dang",
  },
  description: "dvbtrung — A blog by Trung Dang",
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
        <body className="mx-auto flex min-h-screen max-w-2xl flex-col bg-[--bg] px-5 py-12 text-[--text]">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}
