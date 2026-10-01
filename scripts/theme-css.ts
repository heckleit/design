import { colors, type ColorName } from "../src/palette.ts";
import { duration, ease, fonts, radius, text } from "../src/scales.ts";
import {
  dark,
  light,
  roles,
  type RoleValue,
  type Theme,
} from "../src/themes.ts";

type Declarations = Record<string, string>;

const prefixed = (
  prefix: string,
  values: Record<string, string>,
): Declarations =>
  Object.fromEntries(
    Object.entries(values).map(([name, value]) => [`${prefix}-${name}`, value]),
  );

const block = (declarations: Declarations, indent: string) =>
  Object.entries(declarations)
    .map(([name, value]) => `${indent}--${name}: ${value};`)
    .join("\n");

const colorVar = (name: ColorName) => `var(--color-${name})`;

const roleValue = (value: RoleValue) =>
  typeof value === "string"
    ? colorVar(value)
    : `color-mix(in oklab, ${colorVar(value.color)} ${String(value.percent)}%, transparent)`;

const fontStack = (stack: readonly string[]) =>
  stack
    .map((family) => (family.includes(" ") ? `"${family}"` : family))
    .join(", ");

function textScale(): Declarations {
  const declarations: Declarations = {};
  for (const [name, scale] of Object.entries(text)) {
    declarations[`text-${name}`] = scale.size;
    declarations[`text-${name}--line-height`] = scale.lineHeight;
    if ("letterSpacing" in scale) {
      declarations[`text-${name}--letter-spacing`] = scale.letterSpacing;
    }
  }
  return declarations;
}

const themeVariables = (theme: Theme): Declarations => ({
  ...Object.fromEntries(
    roles.map((role) => [`heckle-${role}`, roleValue(theme.colors[role])]),
  ),
  "heckle-shadow": roleValue(theme.shadow),
});

const cleared = [
  "color",
  "font",
  "text",
  "text-shadow",
  "radius",
  "shadow",
  "inset-shadow",
  "drop-shadow",
  "ease",
];

export const themeCss = () => `@theme {
${block(Object.fromEntries(cleared.map((namespace) => [`${namespace}-*`, "initial"])), "  ")}
${block(prefixed("color", colors), "  ")}
${block(Object.fromEntries(Object.entries(fonts).map(([name, stack]) => [`font-${name}`, fontStack(stack)])), "  ")}
${block(textScale(), "  ")}
${block(prefixed("radius", radius), "  ")}
${block(prefixed("ease", ease), "  ")}
${block(prefixed("transition-duration", duration), "  ")}
  --default-transition-duration: ${duration.fast};
  --default-transition-timing-function: var(--ease-soft);
}

@theme inline {
${block(Object.fromEntries(roles.map((role) => [`color-${role}`, `var(--heckle-${role})`])), "  ")}
  --shadow-hairline: 0 0 0 1px var(--heckle-hairline);
  --shadow-raised: 0 0 0 1px var(--heckle-hairline), 0 12px 28px -14px var(--heckle-shadow);
  --shadow-overlay: 0 0 0 1px var(--heckle-hairline), 0 28px 64px -24px var(--heckle-shadow);
}

@custom-variant dark {
  :root[data-theme="dark"] &,
  :host([data-theme="dark"]) & {
    @slot;
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) &,
    :host(:not([data-theme="light"])) & {
      @slot;
    }
  }
}

@layer base {
  :root,
  :host {
    color-scheme: light;
${block(themeVariables(light), "    ")}
  }

  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]),
    :host(:not([data-theme="light"])) {
      color-scheme: dark;
${block(themeVariables(dark), "      ")}
    }
  }

  :root[data-theme="dark"],
  :host([data-theme="dark"]) {
    color-scheme: dark;
${block(themeVariables(dark), "    ")}
  }
}
`;
