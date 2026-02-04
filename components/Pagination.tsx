"use client";

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
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];

  if (currentPage > 3) pages.push(1);
  if (currentPage > 4) pages.push("...");

  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i > 0 && i <= totalPages) {
      pages.push(i);
    }
  }

  if (currentPage < totalPages - 3) pages.push("...");
  if (currentPage < totalPages - 2) pages.push(totalPages);

  return (
    <div className="flex items-center justify-center gap-2 mt-5">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
        className="w-10 h-10 border rounded-full disabled:opacity-50 font-bold text-[14px] md:text-[18px] leading-[1.22] cursor-pointer"
      >
        &lt;&lt;
      </button>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="w-10 h-10 border rounded-full disabled:opacity-50 font-bold text-[14px] md:text-[18px] leading-[1.22] cursor-pointer"
      >
        &lt;
      </button>

      {pages.map((p, idx) =>
        typeof p === "number" ? (
          <button
            key={idx}
            onClick={() => onPageChange(p)}
            className={`w-10 h-10 font-bold text-[14px] md:text-[18px] leading-[1.22] border border-(--light-grey) rounded-full cursor-pointer ${
              p === currentPage ? "bg-(--orange) text-white" : ""
            }`}
          >
            {p}
          </button>
        ) : (
          <span
            key={idx}
            className="w-10 h-10 border border-(--grey-text) rounded-full flex justify-center items-center cursor-pointer"
          >
            ...
          </span>
        ),
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="w-10 h-10 border border-(--grey-text) rounded-full disabled:opacity-50 font-bold text-[14px] md:text-[18px] leading-[1.22] cursor-pointer"
      >
        &gt;
      </button>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
        className="w-10 h-10 border border-(--grey-text) rounded-full disabled:opacity-50 font-bold text-[14px] md:text-[18px] leading-[1.22] cursor-pointer"
      >
        &gt;&gt;
      </button>
    </div>
  );
}
