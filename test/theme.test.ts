import { compile } from "@tailwindcss/node";
import { expect, it } from "vitest";
import { colors } from "../src/palette.ts";
import { duration, ease, fonts, radius, text } from "../src/scales.ts";
import { roles } from "../src/themes.ts";
import { themeCss } from "../scripts/theme-css.ts";

const css = await compile(`@import "tailwindcss";\n${themeCss()}`, {
  base: import.meta.dirname,
  onDependency: () => undefined,
});

const rule = (output: string, selector: string) =>
  new RegExp(`\\.${selector.replace(/[:.]/g, "\\$&")}\\s*\\{`).test(output);

it.each([
  ...Object.keys(colors).map((name) => `bg-${name}`),
  ...roles.map((role) => `bg-${role}`),
  ...Object.keys(fonts).map((name) => `font-${name}`),
  ...Object.keys(text).map((name) => `text-${name}`),
  ...Object.keys(radius).map((name) => `rounded-${name}`),
  ...Object.keys(ease).map((name) => `ease-${name}`),
  ...Object.keys(duration).map((name) => `duration-${name}`),
  "shadow-hairline",
  "shadow-raised",
  "shadow-overlay",
])("generates %s", (utility) => {
  expect(rule(css.build([utility]), utility)).toBe(true);
});

it.each([
  "bg-blue-500",
  "font-serif",
  "text-9xl",
  "rounded-4xl",
  "shadow-2xl",
  "inset-shadow-sm",
  "drop-shadow-lg",
  "text-shadow-sm",
  "ease-in-out",
])("leaves out Tailwind's default %s", (utility) => {
  expect(rule(css.build([utility]), utility)).toBe(false);
});

it("applies the dark variant from the document root, the shadow host and the system setting", () => {
  const output = css.build(["dark:bg-surface"]);

  expect(output).toContain(':root[data-theme="dark"]');
  expect(output).toContain(':host([data-theme="dark"])');
  expect(output).toContain("prefers-color-scheme: dark");
  expect(output).toContain(':host(:not([data-theme="light"]))');
});

it("defines the role variables in the base layer", () => {
  expect(css.build([])).toMatch(
    /@layer base\s*\{\s*:root,\s*:host\s*\{\s*color-scheme: light;\s*--heckle-page: var\(--color-apricot-50\)/,
  );
});
