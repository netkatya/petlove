"use client";

import { useEffect, useState } from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const [isMobile, setIsMobile] = useState(false);

  /* ---------- DETECT SCREEN ---------- */

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768); // md breakpoint
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (totalPages <= 1) return null;

  /* ---------- RANGE LOGIC ---------- */

  const delta = isMobile ? 1 : 2; // <— ВОТ ВСЯ МАГИЯ
  const pages: (number | string)[] = [];

  if (currentPage > delta + 1) pages.push(1);
  if (currentPage > delta + 2) pages.push("...");

  for (let i = currentPage - delta; i <= currentPage + delta; i++) {
    if (i > 0 && i <= totalPages) {
      pages.push(i);
    }
  }

  if (currentPage < totalPages - (delta + 1)) pages.push("...");
  if (currentPage < totalPages - delta) pages.push(totalPages);

  /* ---------- UI ---------- */

  const baseBtn =
    "w-8 md:w-10 h-8 md:h-10 border rounded-full font-bold text-[14px] md:text-[18px] leading-[1.22] disabled:opacity-50 cursor-pointer";

  return (
    <div className="flex items-center justify-center gap-2 mt-5">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
        className={baseBtn}
      >
        &lt;&lt;
      </button>

      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={baseBtn}
      >
        &lt;
      </button>

      {pages.map((p, idx) =>
        typeof p === "number" ? (
          <button
            key={idx}
            onClick={() => onPageChange(p)}
            className={`${baseBtn} border-(--light-grey) ${
              p === currentPage ? "bg-(--orange) text-white" : ""
            }`}
          >
            {p}
          </button>
        ) : (
          <span
            key={idx}
            className="w-8 md:w-10 h-8 md:h-10 border border-(--grey-text) rounded-full flex justify-center items-center"
          >
            ...
          </span>
        ),
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`${baseBtn} border-(--grey-text)`}
      >
        &gt;
      </button>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
        className={`${baseBtn} border-(--grey-text)`}
      >
        &gt;&gt;
      </button>
    </div>
  );
}
