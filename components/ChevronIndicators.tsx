import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function ChevronIndicators({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="flex items-center gap-2 pr-3"
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      {children}

      <span className="pointer-events-none">
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </span>
    </div>
  );
}
