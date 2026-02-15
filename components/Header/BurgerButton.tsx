import { Menu, X } from "lucide-react";

type Props = {
  onClick: () => void;
  open: boolean;
  isHome: boolean;
};

export default function BurgerButton({ onClick, open, isHome }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label="Menu"
      className={isHome ? "text-white" : "text-black"}
    >
      {open ? (
        <X className="w-6 h-6" stroke="currentColor" />
      ) : (
        <Menu className="w-6 h-6" stroke="currentColor" />
      )}
    </button>
  );
}
