"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const ModeToggle = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? (systemTheme ?? "light") : theme;

  const toggleTheme = () =>
    setTheme(currentTheme === "dark" ? "light" : "dark");

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full shadow-sm"
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      {currentTheme === "dark" ? (
        <Sun className="h-5 w-5 transition-transform duration-200" />
      ) : (
        <Moon className="h-5 w-5 transition-transform duration-200" />
      )}
    </Button>
  );
}

export default ModeToggle;
