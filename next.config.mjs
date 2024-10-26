import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypePrettyCode from "rehype-pretty-code";

const nextConfig = {
  pageExtensions: ["md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
      },
    ],
  },
};

const withMDX = createMDX({
  options: {
    jsx: true,
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "catppuccin-mocha",
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
