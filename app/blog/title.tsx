import { formatDate, slugify } from "@/app/utils";

export default function Title({
                                title,
                                date
                              }: {
  title: string;
  date: string;
}) {
  return (
    <>
      <h1
        style={{
          viewTransitionName: slugify(title)
        }}
        className="title mb-2 max-w-[650px] text-3xl font-semibold"
      >
        {title}
      </h1>
      <div className="mb-8 flex max-w-[650px] items-center justify-between text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(date, {
            month: "long"
          })}
        </p>
      </div>
    </>
  );
}
