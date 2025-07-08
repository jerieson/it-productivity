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
      ? "min-w-[60px] px-1 py-0.5 text-xs"
      : size === "sm"
      ? "min-w-[80px] px-1 py-1 text-xs"
      : "min-w-[120px] px-2 py-1.5 text-sm";

  return (
    <Select
      value={displayValue}
      onValueChange={(v) => onChange(v === "__none__" ? "" : v)}
    >
      <SelectTrigger
        className={`
          rounded-md border border-[var(--border)] bg-[var(--muted)]
          focus:outline-none focus:ring-.5 focus:border-gray-900 transition shadow-none
          ${sizeClass}
        `}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="__none__" disabled>
          <span className="italic text-gray-400">{placeholder}</span>
        </SelectItem>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
