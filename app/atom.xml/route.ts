import { metadata } from "../page";
import { generateFeed } from "../feed";
import { getBlogPosts } from "@/app/lib/blog";

export async function GET() {
  const posts = getBlogPosts();
  const feed = generateFeed(posts, metadata);
  return new Response(feed.atom1());
}
