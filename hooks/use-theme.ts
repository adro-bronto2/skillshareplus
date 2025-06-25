"use client"

import { useState, useEffect } from "react"
import { useLocalStorage } from "./use-local-storage"

export type Theme = "light" | "dark" | "system"

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "dark")
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setSystemTheme(mediaQuery.matches ? "dark" : "light")

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light")
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    const effectiveTheme = theme === "system" ? systemTheme : theme

    root.classList.remove("light", "dark")
    root.classList.add(effectiveTheme)

    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", effectiveTheme === "dark" ? "#000000" : "#ffffff")
    }
  }, [theme, systemTheme])

  return {
    theme,
    setTheme,
    effectiveTheme: theme === "system" ? systemTheme : theme,
  }
}
