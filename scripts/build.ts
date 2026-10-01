import { execFileSync } from "node:child_process";
import { copyFile, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { themeCss } from "./theme-css.ts";

const root = path.join(import.meta.dirname, "..");
const dist = path.join(root, "dist");

await rm(dist, { recursive: true, force: true });
execFileSync("tsc", ["--project", path.join(root, "tsconfig.build.json")], {
  stdio: "inherit",
});
await mkdir(dist, { recursive: true });
await writeFile(path.join(dist, "theme.css"), themeCss());
await copyFile(path.join(root, "src/fonts.css"), path.join(dist, "fonts.css"));
