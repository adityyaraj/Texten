"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex items-center gap-2 link-main hover:bg-hg1"
    >
      {theme === "light" ? (
        <>
          <Moon size={30} />
          <span className="hidden md:inline">Dark</span>
        </>
      ) : (
        <>
          <Sun size={30} />
          <span className="hidden md:inline">Light</span>
        </>
      )}
    </button>
  )
}
