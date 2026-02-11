import { ChevronDown, ChevronUp } from "lucide-react";
import { IndicatorsContainerProps } from "react-select";

type SelectOption = {
  value: string;
  label: string;
};

type Props = IndicatorsContainerProps<SelectOption, false>;

export default function ChevronIndicators({ children, selectProps }: Props) {
  const isOpen = selectProps.menuIsOpen;

  return (
    <div className="flex items-center gap-2 pr-3">
      {children}

      <span className="pointer-events-none">
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </span>
    </div>
  );
}
