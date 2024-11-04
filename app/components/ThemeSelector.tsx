"use client";

import { useState, useEffect } from "react";
import ButtonSelect from "./ButtonSelect";

type Theme = "Light" | "Dark" | "System";

export default function ThemeSelector() {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") || "System") as Theme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "Light") {
      root.classList.remove("dark");
      localStorage.setItem("theme", "Light");
    } else if (theme === "Dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "Dark");
    } else {
      root.classList.remove("dark");
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (systemPrefersDark) root.classList.add("dark");
      localStorage.removeItem("theme");
    }
  }, [theme]);

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
