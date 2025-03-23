import { SITE_URL } from "./constants";

export const clx = (...classes: (string | false | undefined)[]): string =>
  classes.filter(Boolean).join(" ");

export const slugify = (str: string) => {
  str = str.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
  return str;
};

export const formatDate = (
  date: string,
  options: Intl.DateTimeFormatOptions = {},
) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  });
};
export const generateBlogMetadata = ({
  title,
  description,
  date,
  slug,
}: {
  title: string;
  description: string;
  date: string;
  slug: string;
}) => {
  const url = `${SITE_URL}blog/${slug}`;
  const publishedTime = formatDate(date, { month: "long" });
  const imageUrl = `${SITE_URL}og/blog/?title=${encodeURIComponent(title)}&top=${publishedTime}`;

  return {
    title,
    date: publishedTime,
    description,
    alternates: {
      canonical: `/blog/${slug}/`,
    },
    openGraph: {
      title,
      description,
      publishedTime,
      type: "article",
      url,
      images: [
        {
          url: imageUrl,
        },
      ],
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
      creator: "@dvbtrung",
      images: [imageUrl],
    },
  };
};
