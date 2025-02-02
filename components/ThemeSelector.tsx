"use client";

import { useEffect } from "react";
import ButtonSelect from "./ButtonSelect";
import useStoredState from "../util/useStoredState";

type Theme = "Light" | "Dark" | "System";

function setDarkTheme(root: HTMLElement) {
  root.classList.add("dark");
  root.style.colorScheme = "dark";
}

function setLightTheme(root: HTMLElement) {
  root.classList.remove("dark");
  root.style.colorScheme = "light";
}

export default function ThemeSelector() {
  const [theme, setTheme] = useStoredState<Theme>("theme", "System");

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "Light") {
      setLightTheme(root);
    } else if (theme === "Dark") {
      setDarkTheme(root);
    } else {
      root.classList.remove("dark");
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (systemPrefersDark) {
        setDarkTheme(root);
      } else {
        setLightTheme(root);
      }
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
