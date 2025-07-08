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
      ? "px-1 py-1 text-xs min-w-[60px]"
      : "px-2 py-1.5 text-sm min-w-[100px]";
  return (
    <Input
      className={
        `rounded-md border border-[var(--border)] bg-[var(--muted)] focus:outline-none focus:ring-.5 focus:border-gray-900 transition shadow-none dark:bg-[var(--muted)] dark:border-[var(--border)] ${sizeClass} ` +
        className
      }
      {...props}
    />
  );
}
