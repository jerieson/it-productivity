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
  if (size === "xs") sizeClass = "px-2 py-1 text-xs min-w-[40px]";
  else if (size === "sm") sizeClass = "px-3 py-1.5 text-sm min-w-[60px]";
  else sizeClass = "px-4 py-2 text-base min-w-[80px]";

  return (
    <Button
      variant="outline"
      className={`${sizeClass} ` + className}
      {...props}
    />
  );
}
