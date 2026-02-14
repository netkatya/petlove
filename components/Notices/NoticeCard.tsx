"use client";

import Image from "next/image";
import { Heart, Trash2 } from "lucide-react";
import { Pet, NoticeDetails } from "@/types/pets";

type Notice = Pet | NoticeDetails;

type Props = {
  notice: Notice;
  variant?: "catalog" | "profile" | "viewed";

  isFavorite?: boolean;
  onFavorite?: (id: string) => void;
  onDelete?: (id: string) => void;
  onLearnMore?: (id: string) => void;
};

export default function NoticeCard({
  notice,
  variant = "catalog",
  isFavorite,
  onFavorite,
  onDelete,
  onLearnMore,
}: Props) {
  const price = "price" in notice ? notice.price : undefined;

  return (
    <li className="p-6 bg-(--light-text) rounded-2xl flex flex-col h-full">
      <div className="flex flex-col grow">
        <div className="w-full rounded-2xl overflow-hidden mb-6 aspect-16/10">
          <Image
            src={notice.imgURL}
            alt={notice.title}
            width={287}
            height={178}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex justify-between mb-2">
          <h3 className="font-bold text-base leading-[125%] text-(--card-text)">
            {notice.title}
          </h3>

          {"popularity" in notice && (
            <div className="flex gap-1 items-center">
              <span className="text-yellow-400">★</span>
              <p className="font-medium text-sm">{notice.popularity}</p>
            </div>
          )}
        </div>

        <ul className="flex gap-3.5 justify-between mb-4">
          <li>
            <p className="text-[10px] text-(--grey-text)">Name</p>
            <p className="text-xs">{notice.name}</p>
          </li>
          <li>
            <p className="text-[10px] text-(--grey-text)">Birthday</p>
            <p className="text-xs">
              {new Date(notice.birthday).toLocaleDateString("uk-UA")}
            </p>
          </li>
          <li>
            <p className="text-[10px] text-(--grey-text)">Sex</p>
            <p className="text-xs capitalize">{notice.sex}</p>
          </li>
          <li>
            <p className="text-[10px] text-(--grey-text)">Species</p>
            <p className="text-xs capitalize">{notice.species}</p>
          </li>
          <li>
            <p className="text-[10px] text-(--grey-text)">Category</p>
            <p className="text-xs capitalize">{notice.category}</p>
          </li>
        </ul>

        <p className="text-sm mb-4">{notice.comment}</p>

        <p className="font-bold text-base mb-3">
          {price ? `$${price}` : "Free"}
        </p>
      </div>

      <div className="flex gap-2.5 justify-between">
        <button
          onClick={() => onLearnMore?.(notice._id)}
          className="bg-(--orange) rounded-[30px] w-full h-11.5 text-(--light-text) hover:bg-(--hover-orange)"
        >
          Learn more
        </button>

        {variant === "catalog" && (
          <button
            onClick={() => onFavorite?.(notice._id)}
            className="rounded-full bg-(--light-orange-bg) min-w-11.5 min-h-11.5 flex justify-center items-center"
          >
            <Heart
              size={18}
              className={
                isFavorite
                  ? "fill-(--orange) text-(--orange)"
                  : "text-(--orange)"
              }
            />
          </button>
        )}

        {variant === "profile" && (
          <button
            onClick={() => onDelete?.(notice._id)}
            className="rounded-full bg-(--light-orange-bg) min-w-11.5 min-h-11.5 flex justify-center items-center"
          >
            <Trash2 size={18} className="text-(--orange)" />
          </button>
        )}
      </div>
    </li>
  );
}
