import * as React from "react";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(() =>
    document.documentElement.classList.contains("dark")
  );

  const toggleTheme = (checked: boolean) => {
    document.documentElement.classList.toggle("dark", checked);
    setIsDark(checked);
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        id="theme-toggle"
      />
      <label htmlFor="theme-toggle" className="text-sm">
        {isDark ? "Dark" : "Light"} Mode
      </label>
    </div>
  );
}
