export const fonts = {
  display: ["Alfa Slab One", "Rockwell", "serif"],
  sans: ["Rethink Sans Variable", "Helvetica Neue", "Arial", "sans-serif"],
  mono: ["DM Mono", "ui-monospace", "Menlo", "monospace"],
} as const;

export const text = {
  xs: { size: "0.75rem", lineHeight: "1.4" },
  sm: { size: "0.875rem", lineHeight: "1.45" },
  base: { size: "1rem", lineHeight: "1.5" },
  lg: { size: "1.25rem", lineHeight: "1.5" },
  xl: { size: "1.5rem", lineHeight: "1.4" },
  "display-sm": { size: "1.375rem", lineHeight: "1.2" },
  "display-md": { size: "2rem", lineHeight: "1.15" },
  "display-lg": { size: "2.75rem", lineHeight: "1.1" },
  "display-xl": { size: "4rem", lineHeight: "1.05", letterSpacing: "-0.008em" },
  "display-2xl": {
    size: "5.5rem",
    lineHeight: "1.02",
    letterSpacing: "-0.011em",
  },
} as const;

export const radius = {
  sm: "0.625rem",
  md: "0.875rem",
  lg: "1.375rem",
  xl: "1.75rem",
} as const;

export const ease = {
  soft: "cubic-bezier(0.2, 0.8, 0.2, 1)",
} as const;

export const duration = {
  fast: "120ms",
  base: "200ms",
  slow: "320ms",
} as const;
