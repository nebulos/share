const defaultPreferences = [
  {
    // Dark, not "system". The cosmic theme is only implemented for the dark
    // scheme, so following a light OS drops users into stock Mantine styling
    // that does not look like the rest of nebulos.net. This is what _app.tsx
    // already claimed to do; the "system" default silently defeated it.
    // An explicit user choice (including "system") is still stored and wins.
    key: "colorScheme",
    value: "dark",
  },
  {
    key: "locale",
    value: "system",
  },
];

const get = (key: string) => {
  if (typeof window !== "undefined") {
    const preferences = JSON.parse(localStorage.getItem("preferences") ?? "{}");
    return (
      preferences[key] ??
      defaultPreferences.find((p) => p.key == key)?.value ??
      null
    );
  }
};

const set = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    const preferences = JSON.parse(localStorage.getItem("preferences") ?? "{}");
    preferences[key] = value;
    localStorage.setItem("preferences", JSON.stringify(preferences));
  }
};
const userPreferences = {
  get,
  set,
};

export default userPreferences;
