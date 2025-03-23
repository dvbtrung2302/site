import { readdirSync, rmSync, statSync } from "fs";
import { join } from "path";

const blogDir = "app/blog";
const keepFiles = ["layout.tsx", "title.tsx"];

const isDryRun = process.argv.includes("--dry");

const items = readdirSync(blogDir);

for (const item of items) {
  if (keepFiles.includes(item)) {
    console.log(`✅ Keeping: ${item}`);
    continue;
  }

  const fullPath = join(blogDir, item);
  const isDir = statSync(fullPath).isDirectory();

  if (isDryRun) {
    console.log(`🧪 Would delete ${isDir ? "folder" : "file"}: ${item}`);
  } else {
    rmSync(fullPath, { recursive: true, force: true });
    console.log(`🗑️ Deleted ${isDir ? "folder" : "file"}: ${item}`);
  }
}
