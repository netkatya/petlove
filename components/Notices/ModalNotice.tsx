"use client";

import { useEffect } from "react";
import Image from "next/image";
import { NoticeDetails } from "@/types/pets";
import { Heart } from "lucide-react";
import Portal from "../Portal";

type Props = {
  notice: NoticeDetails;
  onClose: () => void;
  onFavoriteToggle: (notice: NoticeDetails) => Promise<void>;
  isFavorite: boolean;
};

export default function ModalNotice({
  notice,
  onClose,
  onFavoriteToggle,
  isFavorite,
}: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Portal>
      <div
        onClick={handleBackdrop}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn"
      >
        <div className="bg-(--light-text) rounded-[30px] px-7 md:px-18 py-10 w-[95%] md:w-full max-w-83.75 md:max-w-118.5 relative animate-scaleIn">
          <button
            onClick={onClose}
            className="absolute top-5 right-5"
            aria-label="Close"
          >
            <svg width={14} height={14}>
              <use href="/img/icons.svg#icon-close" stroke="#262626" />
            </svg>
          </button>

          <div className="flex flex-col items-center">
            <div className="relative w-30 md:w-37.5 h-30 md:h-37.5 rounded-full overflow-hidden mb-5">
              <Image
                src={notice.imgURL}
                alt={notice.title}
                width={120}
                height={120}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute left-[30%] rounded-[30px] px-3.5 py-2 bg-(--light-orange-bg)">
              <p className="font-medium text-[12px] leading-[133%] tracking-[-0.02em] text-(--orange) capitalize">
                {notice.category}
              </p>
            </div>

            <h3 className="font-bold text-[16px] md:text-[18px] leading-[125%] md:leading-[133%] mb-2.5">
              {notice.title}
            </h3>

            <div className="flex gap-1 items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width={16} height={16}>
                  <use
                    href="/img/icons.svg#icon-star"
                    fill={i < notice.popularity ? "#ffc531" : "#d9d9d9"}
                  />
                </svg>
              ))}
              <p className="text-sm">{notice.popularity}</p>
            </div>

            <ul className="grid grid-cols-4 gap-x-8 gap-y-3 text-sm mb-4">
              <li className="flex flex-col justify-center items-center gap-1">
                <p className="font-medium text-[10px] text-(--grey-text)">
                  Name
                </p>{" "}
                <p className="font-medium text-[12px] leading-[117%] tracking-[-0.02em]">
                  {notice.name}
                </p>
              </li>

              <li className="flex flex-col justify-center items-center gap-1">
                <p className="font-medium text-[10px] text-(--grey-text)">
                  Birthday
                </p>{" "}
                <p className="font-medium text-[12px] leading-[117%] tracking-[-0.02em]">
                  {new Date(notice.birthday).toLocaleDateString("uk-UA")}
                </p>
              </li>

              <li className="flex flex-col justify-center items-center gap-1">
                <span className="font-medium text-[10px] text-(--grey-text)">
                  Sex
                </span>{" "}
                <p className="font-medium text-[12px] leading-[117%] tracking-[-0.02em] capitalize">
                  {notice.sex}
                </p>
              </li>

              <li className="flex flex-col justify-center items-center gap-1">
                <p className="font-medium text-[10px] text-(--grey-text)">
                  Species
                </p>{" "}
                <p className="font-medium text-[12px] leading-[117%] tracking-[-0.02em] capitalize">
                  {notice.species}
                </p>
              </li>
            </ul>

            <p className="font-medium text-[14px] leading-[129%] tracking-[-0.02em] mb-8">
              {notice.comment}
            </p>
            <p className="font-bold text-[16px] md:text-[18px] leading-[125%] md:leading-[133%] mb-5">
              {notice.price ? `$${notice.price}` : "Free"}
            </p>

            <div className="grid grid-cols-2 gap-2.5 w-full">
              <button
                onClick={() => onFavoriteToggle(notice)}
                className="flex justify-center items-center gap-2 py-3 rounded-[30px] border bg-(--orange) text-(--light-text) hover:bg-(--hover-orange) transition-all duration-300"
              >
                {isFavorite ? "Remove from" : "Add to"}
                <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
              </button>

              <a
                href={`tel:${notice.user.phone}`}
                className="flex justify-center items-center py-3 rounded-[30px] bg-(--light-orange-bg) text-(--orange) text-center hover:bg-(--light-orange-hover) transition"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}
