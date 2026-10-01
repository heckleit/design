export const palette = {
  white: "#FFFFFF",
  apricot: {
    25: "#FFFAF5",
    50: "#FFF1E4",
    100: "#FDE5CE",
    200: "#FDCBA0",
    300: "#FF9E5E",
    400: "#E78531",
    500: "#CF6903",
    600: "#B4501A",
    700: "#8F3E00",
    800: "#6B2D0A",
    900: "#4C1E09",
    950: "#300F04",
  },
  sunshine: {
    50: "#F9F5E8",
    100: "#F3E9CE",
    200: "#FFD166",
    300: "#DFB864",
    400: "#CF9B19",
    500: "#B88501",
    600: "#976903",
    700: "#785101",
    800: "#5B3B01",
    900: "#412800",
    950: "#281600",
  },
  onair: {
    50: "#FFF1F2",
    100: "#FFE1E4",
    200: "#FFC7CD",
    300: "#FFA3AF",
    400: "#FF6F7D",
    500: "#EA5072",
    600: "#C53559",
    700: "#9B2745",
    800: "#731F33",
    900: "#511423",
    950: "#330913",
  },
  plum: {
    50: "#F9F3F6",
    100: "#F1E6EC",
    200: "#E4CFDB",
    300: "#D2B4C5",
    400: "#B692A8",
    500: "#98738B",
    600: "#78576D",
    700: "#583E50",
    800: "#3A2333",
    850: "#2E1A29",
    900: "#241320",
    950: "#1C0E19",
  },
  red: {
    50: "#FFF2F0",
    100: "#FFE2DE",
    200: "#FFC9C1",
    300: "#FFA69A",
    400: "#FF796B",
    500: "#F5493E",
    600: "#CE2B25",
    700: "#A31F1B",
    800: "#791A15",
    900: "#56110D",
    950: "#360605",
  },
  green: {
    50: "#EDF8F1",
    100: "#DAF0E0",
    200: "#B7E5C4",
    300: "#8ED4A4",
    400: "#64BE82",
    500: "#46A567",
    600: "#2C874D",
    700: "#21693A",
    800: "#1B4E2B",
    900: "#12361D",
    950: "#08200E",
  },
} as const;

type Palette = typeof palette;

export type ColorName = {
  [Hue in keyof Palette]: Palette[Hue] extends string
    ? Hue
    : `${Hue}-${Extract<keyof Palette[Hue], string | number>}`;
}[keyof Palette];

export const colors = Object.fromEntries(
  Object.entries(palette).flatMap(([hue, steps]): [string, string][] =>
    typeof steps === "string"
      ? [[hue, steps]]
      : Object.entries(steps).map(([step, value]) => [`${hue}-${step}`, value]),
  ),
) as Record<ColorName, string>;
