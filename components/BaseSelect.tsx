import Select, {
  type GroupBase,
  type Props as ReactSelectProps,
  type StylesConfig,
} from "react-select";
import ChevronIndicators from "./ChevronIndicators";

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
    transition: "all 0.3s ease-in-out",
    cursor: "pointer",
  }),
  menu: (base) => ({ ...base, borderRadius: "20px" }),
  placeholder: (base) => ({ ...base, color: "var(--grey-text)" }),
  valueContainer: (base) => ({ ...base, padding: "4px 8px" }),
  option: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    color: state.isFocused ? "var(--orange)" : "var(--grey-text)",
    transition: "all 0.3s ease-in-out",
    cursor: "pointer",
  }),
};

export default function BaseSelect(props: Props) {
  return (
    <Select<SelectOption, false, GroupBase<SelectOption>>
      {...props}
      isClearable={false}
      components={{
        IndicatorsContainer: ChevronIndicators,
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
