"use client";

import Image from "next/image";
import { useEffect } from "react";
import Portal from "./Portal";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ModalApproveAction({ onConfirm, onCancel }: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onCancel]);

  return (
    <Portal>
      <div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-100"
        onClick={onCancel}
      >
        <div
          className="relative bg-(--light-text) px-7 md:px-20 py-10 md:py-20 rounded-[30px] flex flex-col justify-center items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onCancel}
            className="absolute top-5 right-5"
            aria-label="Close"
          >
            <svg width={14} height={14}>
              <use href="/img/icons.svg#icon-close" stroke="#262626" />
            </svg>
          </button>
          <div className="rounded-full bg-(--light-orange-bg) w-20 h-20 flex justify-center items-center mb-5">
            <Image
              src="/img/cat-icon.png"
              width={44}
              height={44}
              alt="Icon ginger cat"
            ></Image>
          </div>
          <p className="font-bold text-[20px] md:text-[24px] leading-none tracking-[-0.03em] mb-7">
            Already leaving?
          </p>

          <div className="flex gap-2">
            <button
              onClick={onConfirm}
              className="py-3 bg-(--orange) text-(--light-text) rounded-[30px] w-34.25 font-bold text-[14px] md:text-[16px] leading-[129%] tracking-[-0.03em] hover:bg-(--hover-orange) transition-all duration-300"
            >
              Yes
            </button>

            <button
              onClick={onCancel}
              className="py-3 bg-(--light-grey-2) rounded-[30px] w-34.25 font-bold text-[14px] md:text-[16px] leading-[129%] tracking-[-0.03em] hover:bg-(--light-grey) transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
