import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { storageUtils } from "@/lib/storage";

export function ThemeToggle() {
  // Initialize theme from localStorage
  const [isDark, setIsDark] = React.useState(() => {
    const savedTheme = storageUtils.getTheme();
    // Apply the theme immediately on mount
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    return savedTheme === "dark";
  });

  const toggleTheme = (checked: boolean) => {
    const newTheme = checked ? "dark" : "light";
    document.documentElement.classList.toggle("dark", checked);
    setIsDark(checked);
    storageUtils.saveTheme(newTheme);
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        id="theme-toggle"
      />
      <label htmlFor="theme-toggle" className="text-sm cursor-pointer">
        {isDark ? "Dark" : "Light"} Mode
      </label>
    </div>
  );
}
