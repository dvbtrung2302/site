import React from "react";
import { Link } from "next-view-transitions";

export default function Header() {
  return (
    <header className="mb-10 flex flex-row place-content-between">
      <Link
        href="/"
        className={
          "flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
        }
      >
        blog
      </Link>
      <span className="relative flex items-center gap-1 italic">
        by
        <Link
          href="https://github.com/dvbtrung2302"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://github.com/dvbtrung2302.png"
            loading="eager"
            alt="Trung Dang"
            className="relative mx-1 inline h-8 w-8 rounded-full"
          />
        </Link>
      </span>
    </header>
  );
}
