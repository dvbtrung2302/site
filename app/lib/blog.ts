import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Metadata = {
  title: string;
  description: string;
  date: string;
};

type FrontMatterParseResult = {
  metadata: Metadata;
};

export type MDXFileData = FrontMatterParseResult & {
  slug: string;
};

const getMDXDirectories = (dir: string): string[] => {
  return fs
    .readdirSync(dir)
    .filter((file) => fs.statSync(path.join(dir, file)).isDirectory());
};

const readMDXFile = (filePath: string): FrontMatterParseResult => {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(rawContent);

  return {
    metadata: {
      title: data.title,
      description: data.description,
      date: data.date,
    },
  };
};

const getMDXData = (dir: string): MDXFileData[] => {
  const mdxDirectories = getMDXDirectories(dir);

  return mdxDirectories.map((directory) => {
    const filePath = path.join(dir, directory, "page.mdx"); // Always read page.mdx

    const { metadata } = readMDXFile(filePath);
    const slug = directory; // Use the directory name as the slug

    return {
      metadata,
      slug,
    };
  });
};

export const getBlogPosts = (): MDXFileData[] => {
  return getMDXData(path.join(process.cwd(), "app", "blog"));
};
