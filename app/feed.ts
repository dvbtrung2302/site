import { Metadata } from "next";
import { Feed } from "feed";

import { MDXFileData } from "@/app/lib/blog";
import { SITE_URL } from "@/app/constants";

export function generateFeed(posts: MDXFileData[], metadata: Metadata) {
  const feedOptions = {
    author: {
      name: "Trung Dang",
      email: "btrung.dv@gmail.com",
      link: SITE_URL,
    },
    description: metadata.description?.toString() || "",
    favicon: `${SITE_URL}favicon.ico`,
    feedLinks: { atom: `${SITE_URL}atom.xml`, rss: `${SITE_URL}rss.xml` },
    generator: "Feed for Node.js",
    id: SITE_URL,
    image: "https://github.com/dvbtrung2302.png/",
    link: SITE_URL,
    title: metadata.title?.toString() || "",
    copyright: "All rights reserved 2024, Trung Dang",
  };

  const feed = new Feed(feedOptions);

  for (const post of posts) {
    feed.addItem({
      date: new Date(post.metadata.date),
      description: post.metadata.description,
      id: `${SITE_URL}/blog/${post.slug}/`,
      link: `${SITE_URL}/blog/${post.slug}/`,
      title: post.metadata.title,
    });
  }

  return feed;
}
