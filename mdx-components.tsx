import React, { ComponentPropsWithoutRef } from "react";
import { Link } from "next-view-transitions";
import type { MDXComponents } from "mdx/types";

type AnchorProps = ComponentPropsWithoutRef<"a">;
type HeadingProps = ComponentPropsWithoutRef<"h1">;
type StrongProps = ComponentPropsWithoutRef<"strong">;

function CopyLinkIcon() {
  return (
    <svg
      className="octicon octicon-link"
      viewBox="0 0 16 16"
      version="1.1"
      width="16"
      height="16"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path>
    </svg>
  );
}

const createHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
  // eslint-disable-next-line react/display-name
  return ({ children, id, ...props }: HeadingProps) => {
    const anchorId = id || String(children).toLowerCase().replace(/\s+/g, "-");

    return React.createElement(
      `h${level}`,
      { ...props, className: "blog-heading font-semibold", id: anchorId },
      [
        children,
        <a
          key="anchor"
          aria-label={`Permalink: ${children}`}
          href={`#${anchorId}`}
          className="anchor"
        >
          <CopyLinkIcon />
        </a>,
      ],
    );
  };
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    a: ({ href, children, ...props }: AnchorProps) => {
      const isInternalLink = href && href.startsWith("/");

      if (isInternalLink) {
        return (
          <Link href={href} {...props}>
            {children}
          </Link>
        );
      }

      return (
        <a target="_blank" href={href} {...props}>
          {children}
        </a>
      );
    },
    strong: (props: StrongProps) => (
      <strong className="font-semibold" {...props} />
    ),
    Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
      <table>
        <thead>
          <tr>
            {data.headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    ),
    ...components,
  };
}
