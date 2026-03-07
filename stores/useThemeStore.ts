import { create } from "zustand";

export type Themes = "light" | "dark" | "creator";

export const ThemeLabels = {
  light: "Light",
  dark: "Dark",
  creator: "Creator",
} as const;

interface ThemeState {
  theme: Themes;
  setTheme: (theme: Themes) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "dark",
  setTheme: (theme) => {
    setThemeClass(theme);
    localStorage.setItem("theme", theme);
    set({ theme });
  },
}));

function setThemeClass(theme: Themes) {
  const classList = document.documentElement.classList;
  classList.remove("light", "dark", "creator");
  classList.add(theme);
}
