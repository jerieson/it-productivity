import * as React from "react";
import { Input } from "@/components/ui/input";

type InputDefaultProps = {
  size?: "sm" | "md";
} & Omit<React.ComponentProps<typeof Input>, "size">;

export function InputDefault({
  className = "",
  size = "md",
  ...props
}: InputDefaultProps) {
  const sizeClass =
    size === "sm"
      ? "h-8 px-2 text-xs min-w-[70px]"
      : "h-9 px-3 text-sm min-w-[120px]";

  return (
    <Input
      className={`rounded-md border-border bg-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent transition-all ${sizeClass} ${className}`}
      {...props}
    />
  );
}
