import { Global } from "@mantine/core";

/*
 * Global styles. Three jobs:
 *   1. Cosmic body backdrop: a fixed starfield SVG behind all content,
 *      with a slow drift animation that mirrors the marketing page.
 *   2. ::selection styling using our brand violet.
 *   3. Markdown table prettification (kept from upstream, recoloured).
 *
 * Stacking strategy:
 *   - html        → solid cosmic ink fallback (catches SVG load failures)
 *   - body        → transparent so the starfield shows through
 *   - body::before→ the starfield SVG, fixed-position, opacity 0.5
 *   - #__next     → the React tree, z-index: 1, so cards/modals sit above
 *
 * pointerEvents: none on the backdrop is non-negotiable — without it, the
 * starfield would intercept clicks on the dropzone underneath.
 */

const GlobalStyle = () => {
  return (
    <Global
      styles={(theme) => ({
        html: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[0],
        },
        body: {
          backgroundColor: "transparent",
          position: "relative",
          minHeight: "100vh",
          fontFeatureSettings: "'ss01', 'cv11'",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        "body::before": {
          content: '""',
          position: "fixed",
          inset: 0,
          backgroundImage:
            theme.colorScheme === "dark"
              ? "url(/img/starfield.svg)"
              : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.5,
          pointerEvents: "none",
          zIndex: 0,
          animation: "nebulos-drift 90s linear infinite",
        },
        // Subtle gold radial glow in the upper-right, like a distant warm sun
        // through the cosmic dust. Mirrors the marketing page's brass accents
        // without competing with the violet primary. Stays at low opacity so
        // it reads as atmosphere, not as a focal point.
        "body::after": {
          content: theme.colorScheme === "dark" ? '""' : "none",
          position: "fixed",
          top: "-20vh",
          right: "-15vw",
          width: "70vw",
          height: "70vh",
          background:
            "radial-gradient(circle at center, rgba(210, 165, 95, 0.10) 0%, rgba(210, 165, 95, 0.04) 35%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        },
        "#__next": {
          position: "relative",
          zIndex: 1,
        },
        "@keyframes nebulos-drift": {
          from: { transform: "translate(0, 0)" },
          to: { transform: "translate(-40px, 20px)" },
        },
        "::selection": {
          backgroundColor: theme.colors.nebulos[5],
          color: theme.colors.dark[7],
        },
        a: {
          color: "inherit",
          textDecoration: "none",
        },
        "table.md, table.md th:nth-of-type(odd), table.md td:nth-of-type(odd)":
          {
            background:
              theme.colorScheme === "dark"
                ? "rgba(124, 102, 220, 0.06)"
                : "rgba(70, 80, 158, 0.06)",
          },
        "table.md td": {
          paddingLeft: "0.5em",
          paddingRight: "0.5em",
        },
      })}
    />
  );
};
export default GlobalStyle;
