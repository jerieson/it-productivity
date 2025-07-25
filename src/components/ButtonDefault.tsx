import * as React from "react";
import { Button } from "@/components/ui/button";

type ButtonDefaultProps = {
  size?: "sm" | "md" | "xs";
} & Omit<React.ComponentProps<typeof Button>, "size">;

export function ButtonDefault({
  className = "",
  size = "xs",
  ...props
}: ButtonDefaultProps) {
  let sizeClass = "";
  if (size === "xs") sizeClass = "h-8 px-2 text-xs min-w-[60px]";
  else if (size === "sm") sizeClass = "h-9 px-3 text-xs min-w-[80px]";
  else sizeClass = "h-10 px-4 text-sm min-w-[100px]";

  return (
    <Button
      variant="outline"
      className={`rounded-md border-border bg-background hover:bg-accent dark:hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors ${sizeClass} ${className}`}
      {...props}
    />
  );
}
