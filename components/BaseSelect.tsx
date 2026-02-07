import Select, {
  type GroupBase,
  type Props as ReactSelectProps,
  type StylesConfig,
} from "react-select";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export type SelectOption = { value: string; label: string };

type Props = ReactSelectProps<SelectOption, false, GroupBase<SelectOption>>;

const styles: StylesConfig<SelectOption, false, GroupBase<SelectOption>> = {
  control: (base, state) => ({
    ...base,
    borderRadius: "30px",
    backgroundColor: "var(--light-text)",
    padding: "3px 8px 3px 6px",
    boxShadow: "none",
    minHeight: "auto",
    border: state.isFocused
      ? "1px solid orange"
      : "1px solid var(--light-grey)",
    "&:hover": { border: "1px solid orange" },
  }),
  menu: (base) => ({ ...base, borderRadius: "20px" }),
  placeholder: (base) => ({ ...base, color: "#9ca3af" }),
  valueContainer: (base) => ({ ...base, padding: "4px 8px" }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "var(--light-orange-bg)" : "transparent",
    color: "black",
  }),
};

function ChevronIndicators({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="flex items-center gap-2 pr-3"
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <span className="pointer-events-none">
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </span>
    </div>
  );
}

export default function BaseSelect(props: Props) {
  return (
    <Select<SelectOption, false, GroupBase<SelectOption>>
      {...props}
      isClearable={false}
      components={{
        ...(props.components ?? {}),
        IndicatorsContainer: (p) => (
          <ChevronIndicators>{p.children}</ChevronIndicators>
        ),
        DropdownIndicator: null,
        IndicatorSeparator: null,
      }}
      styles={{
        ...styles,
        ...(props.styles ?? {}),
      }}
    />
  );
}
