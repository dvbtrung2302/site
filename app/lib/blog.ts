import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Metadata = {
  title: string;
  description: string;
  date: string;
};

type FrontmatterParseResult = {
  metadata: Metadata;
  content: string;
};

type MDXFileData = FrontmatterParseResult & {
  slug: string;
};

const getMDXDirectories = (dir: string): string[] => {
  return fs
    .readdirSync(dir)
    .filter((file) => fs.statSync(path.join(dir, file)).isDirectory());
};

const readMDXFile = (filePath: string): FrontmatterParseResult => {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  return {
    metadata: {
      title: data.title,
      description: data.description,
      date: data.date,
    },
    content,
  };
};

const getMDXData = (dir: string): MDXFileData[] => {
  const mdxDirectories = getMDXDirectories(dir);

  return mdxDirectories.map((directory) => {
    const filePath = path.join(dir, directory, "page.mdx"); // Always read page.mdx

    const { metadata, content } = readMDXFile(filePath);
    const slug = directory; // Use the directory name as the slug

    return {
      metadata,
      slug,
      content,
    };
  });
};

export const getBlogPosts = (): MDXFileData[] => {
  return getMDXData(path.join(process.cwd(), "app", "blog"));
};
