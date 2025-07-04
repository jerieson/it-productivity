import * as React from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(() =>
    document.documentElement.classList.contains("dark")
  );

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark((prev) => !prev);
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 rounded bg-brand-blue text-brand-orange dark:bg-brand-orange dark:text-brand-blue"
    >
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
