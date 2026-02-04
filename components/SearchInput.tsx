"use client";

import { FormEvent } from "react";

type Props = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
};

export default function SearchInput({
  value,
  placeholder = "Search",
  onChange,
  onSubmit,
  onClear,
}: Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-w-full md:min-w-57.5 h-10.5 md:h-12 p-3 md:p-3.75 rounded-[30px] outline-none border border-(--light-grey) bg-(--light-text) font-medium text-sm leading-[129%] tracking-[-0.03em]"
      />
      <div className="absolute top-3 md:top-3.75 right-3 md:right-3.75 flex gap-2">
        {value && (
          <button
            type="button"
            onClick={onClear}
            className=""
            aria-label="Clear"
          >
            <svg width={10} height={10}>
              <use
                href="/img/icons.svg#icon-close"
                stroke="#000"
                fill="#fff"
              ></use>
            </svg>
          </button>
        )}
        <button type="submit" className="" aria-label="Search">
          <svg width={18} height={18}>
            <use
              href="/img/icons.svg#icon-search"
              stroke="#000"
              fill="#fff"
            ></use>
          </svg>
        </button>
      </div>
    </form>
  );
}
