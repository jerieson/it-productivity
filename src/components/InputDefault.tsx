import * as React from "react";
import { Input } from "@/components/ui/input";

export function InputDefault({
  className = "",
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      className={
        "rounded-md border border-[var(--border)] bg-[var(--muted)] px-2 py-1.5 text-sm focus:outline-none focus:ring-.5 focus:border-gray-900 transition shadow-none dark:bg-[var(--muted)] dark:border-[var(--border)] " +
        className
      }
      {...props}
    />
  );
}
