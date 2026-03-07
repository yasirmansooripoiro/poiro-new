"use client";

import { Themes, useThemeStore } from "@/stores/useThemeStore";
import { useEffect } from "react";

export function ThemeInitializer() {
  const { setTheme } = useThemeStore();

  useEffect(() => {
    setTheme("dark" as Themes);
  }, [setTheme]);

  return null;
}
