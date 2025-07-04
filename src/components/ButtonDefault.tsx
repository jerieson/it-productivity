import * as React from "react";
import { Button } from "@/components/ui/button";

export function ButtonDefault({
  className = "",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="outline"
      className={
        "rounded-md bg-[var(--color-brand-orange)] text-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue)] hover:text-[var(--color-brand-orange)] transition " +
        className
      }
      {...props}
    />
  );
}
