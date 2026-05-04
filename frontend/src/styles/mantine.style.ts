import { MantineThemeOverride } from "@mantine/core";

/*
 * nebulos.net Share theme.
 *
 * Mirrors the marketing-page palette at share.nebulos.net/ so the upload UI
 * and the public landing feel like the same product. Source of truth for the
 * canonical hex values is /var/www/share-static/index.html (:root variables).
 *
 * Mantine convention: each color is a 10-shade array, index 0 lightest →
 * index 9 darkest. `primaryShade` picks which index Mantine treats as the
 * default primary color in light vs dark mode.
 *
 * - `nebulos` is our primary indigo/violet scale.
 * - We override the built-in `dark` array so dark-mode body, modal, card
 *   backgrounds use cosmic-indigo shades instead of Mantine's default greys.
 */

const theme: MantineThemeOverride = {
  colorScheme: "dark",

  colors: {
    nebulos: [
      "#F5F2FF", // 0  cream             — high-contrast text
      "#E0DAF4", // 1                    — interpolated
      "#C5BFE0", // 2  cream-dim         — secondary text
      "#A89FCC", // 3                    — interpolated
      "#8A85AB", // 4  cream-mute        — muted text / placeholders
      "#7C66DC", // 5  violet-hi         — PRIMARY accent in dark mode
      "#46509E", // 6  violet            — primary in light, hover in dark
      "#3A3565", // 7  line-2            — borders, dividers
      "#2A2750", // 8  line              — deeper borders
      "#15123B", // 9  ink-3             — deepest accent
    ],

    // Override Mantine's default `dark` palette (drives bg of body, paper,
    // modal, card in dark mode). Our cosmic indigos replace the stock greys.
    dark: [
      "#F5F2FF", // 0  cream text
      "#C5BFE0", // 1  cream-dim
      "#8A85AB", // 2  muted (placeholder, dimmed)
      "#3A3565", // 3  line-2 (subtle border)
      "#2A2750", // 4  line   (border)
      "#15123B", // 5  ink-3
      "#100D2C", // 6  ink-2  (paper / cards)
      "#0A0820", // 7  ink    (BODY BACKGROUND)
      "#060414", // 8         (deeper, modals)
      "#02010A", // 9         (deepest)
    ],
  },

  primaryColor: "nebulos",
  primaryShade: { light: 6, dark: 5 },

  fontFamily:
    "'Geist', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontFamilyMonospace:
    "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace",

  headings: {
    fontFamily: "'Newsreader', Charter, Georgia, 'Times New Roman', serif",
    fontWeight: 500,
    sizes: {
      h1: { fontSize: "2.25rem", lineHeight: "1.15" },
      h2: { fontSize: "1.75rem", lineHeight: "1.2" },
      h3: { fontSize: "1.375rem", lineHeight: "1.25" },
    },
  },

  defaultRadius: "md",

  components: {
    Modal: {
      styles: (theme) => ({
        title: {
          fontFamily: theme.headings.fontFamily,
          fontSize: theme.fontSizes.lg,
          fontWeight: 500,
          fontStyle: "italic",
        },
      }),
    },
    Button: {
      defaultProps: {
        radius: "md",
      },
    },
    Anchor: {
      styles: (theme) => ({
        root: {
          color: theme.colors.nebulos[5],
          "&:hover": { color: theme.colors.nebulos[2] },
        },
      }),
    },
  },
};

export default theme;
