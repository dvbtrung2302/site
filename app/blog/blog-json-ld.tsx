import React from "react";
import { SITE_URL } from "@/app/constants";

type BlogJsonLdProps = {
  url: string;
  title: string;
  description: string;
  authorName: string;
  publishDate: string; // ISO format: "2025-03-23T12:00:00Z"
  imageUrl?: string;
};

const BlogJsonLd: React.FC<BlogJsonLdProps> = ({
  url,
  title,
  description,
  authorName,
  publishDate,
  imageUrl,
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: title,
    description: description,
    author: {
      "@type": "Person",
      name: authorName,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: authorName,
      logo: {
        "@type": "ImageObject",
        url: "https://github.com/dvbtrung2302.png",
      },
    },
    datePublished: publishDate,
    ...(imageUrl && {
      image: imageUrl,
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default BlogJsonLd;
