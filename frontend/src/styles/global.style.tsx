import { Global } from "@mantine/core";

/*
 * Global styles. Three jobs:
 *   1. Cosmic-indigo body background in dark mode (matches marketing page).
 *   2. Quiet `::selection` styling using our brand violet.
 *   3. Markdown table prettification (kept from upstream, recoloured).
 *
 * We intentionally do NOT set body color here — Mantine's MantineProvider
 * handles text color via theme.colors.dark[0] (which we override to cream
 * in mantine.style.ts).
 */

const GlobalStyle = () => {
  return (
    <Global
      styles={(theme) => ({
        body: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[0],
          fontFeatureSettings: "'ss01', 'cv11'",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
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
