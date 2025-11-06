import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type SelectDefaultProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: "sm" | "md" | "xs";
};

export function SelectDefault({
  options,
  value,
  onChange,
  placeholder = "Select...",
  size = "md",
}: SelectDefaultProps) {
  // Use "__none__" as the value for the placeholder
  const displayValue = value === "" ? "__none__" : value;
  const sizeClass =
    size === "xs"
      ? "h-8 min-w-[70px] px-2 text-xs"
      : size === "sm"
      ? "h-8 min-w-[90px] px-2 text-xs"
      : "h-9 min-w-[120px] px-3 text-sm";

  return (
    <Select
      value={displayValue}
      onValueChange={(v) => onChange(v === "__none__" ? "" : v)}
    >
      <SelectTrigger
        className={`rounded-md border-border bg-background hover:text-accent dark:hover:text-accent focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all data-[state=open]:ring-2 data-[state=open]:ring-ring ${sizeClass}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="rounded-md border-border bg-popover text-popover-foreground shadow-md z-50 min-w-[8rem] overflow-hidden">
        <SelectItem
          value="__none__"
          disabled
          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-xs italic text-muted-foreground"
        >
          {placeholder}
        </SelectItem>
        {options.map((option) => (
          <SelectItem
            key={option}
            value={option}
            className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-xs hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
