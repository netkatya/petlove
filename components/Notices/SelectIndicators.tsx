type Props = {
  clearValue: () => void;
  hasValue: boolean;
  children: React.ReactNode;
};

export default function SelectIndicators({
  clearValue,
  hasValue,
  children,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      {children}

      {hasValue && (
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            clearValue();
          }}
          aria-label="Clear"
        >
          <svg width={10} height={10}>
            <use href="/img/icons.svg#icon-close" stroke="#000" fill="#fff" />
          </svg>
        </button>
      )}

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        aria-label="Search"
      >
        <svg width={18} height={18}>
          <use href="/img/icons.svg#icon-search" stroke="#000" fill="#fff" />
        </svg>
      </button>
    </div>
  );
}
