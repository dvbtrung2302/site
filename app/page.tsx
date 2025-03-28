import { Link } from "next-view-transitions";

import { getBlogPosts } from "@/app/lib/blog";
import { formatDate, slugify } from "@/app/utils";
import { Metadata } from "next";
import { SITE_URL } from "@/app/constants";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  title: "dvbtrung — A blog by Trung Dang",
  description: "dvbtrung — A blog by Trung Dang",
};
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "dvbtrung",
  url: SITE_URL,
  author: {
    "@type": "Person",
    name: "Trung Dang",
    url: SITE_URL,
  },
};

export default function Home() {
  const posts = getBlogPosts().sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-12">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}/`}
            className="group block"
          >
            <div className="flex w-full flex-col space-y-3">
              <p
                style={{
                  viewTransitionName: slugify(post.metadata.title),
                }}
                className="text-lg font-medium group-hover:underline group-hover:decoration-neutral-400 group-hover:underline-offset-4 group-hover:dark:decoration-neutral-600"
              >
                {post.metadata.title.toLowerCase()}
              </p>
              <p className="prose prose-neutral dark:prose-invert">
                {post.metadata.description.toLowerCase()}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {formatDate(post.metadata.date).toLowerCase()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
