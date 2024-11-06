"use client";

import { useState, useEffect } from "react";
import ButtonSelect from "./ButtonSelect";
import useStoredState from "../util/useStoredState";

type Theme = "Light" | "Dark" | "System";

export default function ThemeSelector() {
  const [theme, setTheme] = useStoredState<Theme>("theme", "System");

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "Light") {
      root.classList.remove("dark");
    } else if (theme === "Dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (systemPrefersDark) root.classList.add("dark");
    }
  }, [theme]);

  if (!theme) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      <ButtonSelect<Theme>
        label="Theme"
        selectedValue={theme}
        setSelectedValue={setTheme}
        values={["Light", "Dark", "System"]}
      />
    </div>
  );
}
