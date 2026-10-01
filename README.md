# @heckle-it/design

Heckle's colours, type, shape and motion, as a Tailwind CSS v4 theme and as TypeScript values.

## Tailwind

```css
@import "tailwindcss";
@import "@heckle-it/design/theme.css";
@import "@heckle-it/design/fonts.css";
```

Import the theme after Tailwind. It replaces Tailwind's default colours, fonts, text sizes, radii, shadows and easing, so only Heckle's are available.

Use the role colours (`bg-page`, `text-fg`, `bg-accent text-on-accent`, `text-danger-fg` and the rest in [`src/themes.ts`](src/themes.ts)) rather than the palette, so light and dark mode work without `dark:` variants.

## Light and dark

The theme follows the visitor's system setting. Set `data-theme="light"` or `data-theme="dark"` on `<html>`, or on the host element of a shadow root, to override it.

## Fonts

`fonts.css` loads Alfa Slab One, Rethink Sans and DM Mono from [Fontsource](https://fontsource.org), so they're served by your own build and never fetched from Google. Inside a shadow root, load `fonts.css` in the surrounding document: browsers ignore `@font-face` in shadow roots.

Importing CSS from TypeScript needs your bundler's type declarations, such as `vite/client`.

## TypeScript

```ts
import { colors, dark, light } from "@heckle-it/design";

colors[light.colors.accent]; // "#FF9E5E"
```
