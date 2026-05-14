"use client";

import { useEffect, useState } from "react";

export function useTheme() {
  const [dark, setDark] = useState(false);

  // load initial
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved === "dark";

    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;

    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return { dark, toggleTheme };
}
