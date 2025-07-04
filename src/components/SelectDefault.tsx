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
};

export function SelectDefault({
  options,
  value,
  onChange,
  placeholder = "Select...",
}: SelectDefaultProps) {
  // Use "__none__" as the value for the placeholder
  const displayValue = value === "" ? "__none__" : value;

  return (
    <Select
      value={displayValue}
      onValueChange={(v) => onChange(v === "__none__" ? "" : v)}
    >
      <SelectTrigger
        className="
    rounded-md
    border
    border-[var(--border)]
    bg-[var(--muted)]
    px-2
    py-1.5
    text-sm
    focus:outline-none
    focus:ring-.5
    focus:border-gray-900
    transition
    shadow-none
    min-w-[120px]
    dark:bg-[var(--muted)]
    dark:border-[var(--border)]
  "
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
