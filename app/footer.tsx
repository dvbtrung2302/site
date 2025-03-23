import React from "react";
import { Link } from "next-view-transitions";

const links = [
  { name: "linkedin", url: "https://www.linkedin.com/in/dvbtrung/" },
  { name: "github", url: "https://github.com/dvbtrung2302/" },
];

function UpRightArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mt-12 text-center">
      <ul className="font-sm flex flex-col space-x-0 space-y-3 text-neutral-600 sm:flex-row sm:space-x-6 sm:space-y-0 dark:text-neutral-300">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center text-sm transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            >
              {link.name}
              <UpRightArrowIcon />
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
