import { describe, expect, it } from "vitest";
import { colors } from "../src/palette.ts";
import { dark, light, type Role, type Theme } from "../src/themes.ts";

const text = 4.5;
const nonText = 3;

const pairs: [foreground: Role, background: Role, minimum: number][] = [
  ["fg", "page", text],
  ["fg", "band", text],
  ["fg", "surface", text],
  ["fg", "surface-muted", text],
  ["fg", "surface-sunk", text],
  ["fg-2", "page", text],
  ["fg-2", "surface", text],
  ["fg-3", "page", text],
  ["fg-3", "surface", text],
  ["fg-3", "surface-muted", text],
  ["fg-disabled", "surface", nonText],
  ["accent-fg", "page", text],
  ["accent-fg", "band", text],
  ["accent-fg", "surface", text],
  ["accent-fg", "surface-muted", text],
  ["on-accent", "accent", text],
  ["on-accent", "accent-hover", text],
  ["on-accent", "accent-pressed", text],
  ["on-accent-2", "accent-2", text],
  ["on-inverse", "inverse", text],
  ["on-night", "night", text],
  ["on-night-2", "night", text],
  ["accent", "night", text],
  ["live", "night", nonText],
  ["on-new", "new", text],
  ["success-fg", "success-bg", text],
  ["on-danger", "danger", text],
  ["on-danger", "danger-hover", text],
  ["on-danger", "danger-pressed", text],
  ["danger-fg", "page", text],
  ["danger-fg", "surface", text],
  ["danger-fg", "danger-bg", text],
  ["focus", "page", nonText],
  ["focus", "surface", nonText],
];

function luminance(color: string): number {
  const rgb = Number.parseInt(color.slice(1), 16);
  const [r, g, b] = [rgb >> 16, (rgb >> 8) & 0xff, rgb & 0xff].map(
    (channel) => {
      const value = channel / 255;
      return value <= 0.04045
        ? value / 12.92
        : ((value + 0.055) / 1.055) ** 2.4;
    },
  ) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

function solid(theme: Theme, role: Role): string {
  const value = theme.colors[role];
  if (typeof value !== "string") throw new Error(`${role} is translucent`);
  return colors[value];
}

describe.each([
  ["light", light],
  ["dark", dark],
])("%s theme", (_, theme) => {
  it.each(pairs)("%s on %s meets %d:1", (foreground, background, minimum) => {
    expect(
      contrast(solid(theme, foreground), solid(theme, background)),
    ).toBeGreaterThanOrEqual(minimum);
  });
});
