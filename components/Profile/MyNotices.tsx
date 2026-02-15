"use client";

import { useState } from "react";
import NoticeCard from "../Notices/NoticeCard";
import { useAuthStore } from "@/lib/store/authStore";
import { useFavoritesStore } from "@/lib/store/favoritesStore";
import { getNoticeById } from "@/lib/api/clientApi";
import { NoticeDetails } from "@/types/pets";
import ModalNotice from "../Notices/ModalNotice";

export default function MyNotices() {
  const [activeTab, setActiveTab] = useState<"favorites" | "viewed">(
    "favorites",
  );

  const userFull = useAuthStore((s) => s.userFull);
  const token = useAuthStore((s) => s.token);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  const [selectedNotice, setSelectedNotice] = useState<NoticeDetails | null>(
    null,
  );
  const [open, setOpen] = useState(false);

  if (!userFull) return null;

  const list =
    activeTab === "favorites"
      ? userFull.noticesFavorites
      : userFull.noticesViewed;

  /* -------- OPEN MODAL -------- */

  const handleLearnMore = async (id: string) => {
    if (!token) return;

    const full = await getNoticeById(id, token);
    setSelectedNotice(full);
    setOpen(true);
  };

  return (
    <section>
      {/* tabs */}
      <div className="flex gap-2.5 mb-5">
        <button
          onClick={() => setActiveTab("favorites")}
          className={`flex justify-center items-center rounded-[30px] py-3 w-30.75 md:w-35.5 h-10.5
      font-medium text-[14px] md:text-[16px] leading-[129%] tracking-[-0.03em] transition
      ${
        activeTab === "favorites"
          ? "bg-(--orange) text-(--light-text)"
          : "bg-(--light-text) text-(--card-text)"
      }`}
        >
          My favorite pets
        </button>

        <button
          onClick={() => setActiveTab("viewed")}
          className={`flex justify-center items-center rounded-[30px] py-3 w-30.75 md:w-35.5 h-10.5
      font-medium text-[14px] md:text-[16px] leading-[129%] tracking-[-0.03em] transition
      ${
        activeTab === "viewed"
          ? "bg-(--orange) text-(--light-text)"
          : "bg-(--light-text) text-(--card-text)"
      }`}
        >
          Viewed
        </button>
      </div>

      {/* empty */}
      {list.length === 0 ? (
        <p className="font-medium text-[14px] md:text-[16px] leading-[129%] tracking-[-0.02em] text-center py-15">
          Oops,{" "}
          <span className="text-(--orange) font-bold">
            looks like there aren&apos;t any furries
          </span>{" "}
          on our adorable page yet. Do not worry! View your pets on the
          &quot;find your favorite pet&quot; page and add them to your
          favorites.
        </p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 xl:gap-x-8 xl:gap-y-10">
          {list.map((notice) => (
            <NoticeCard
              key={notice._id}
              notice={notice}
              variant={activeTab === "favorites" ? "profile" : "viewed"}
              onDelete={toggleFavorite}
              onLearnMore={handleLearnMore}
            />
          ))}
        </ul>
      )}

      {/* MODAL */}
      {open && selectedNotice && (
        <ModalNotice
          notice={selectedNotice}
          onClose={() => setOpen(false)}
          onFavoriteToggle={() => toggleFavorite(selectedNotice._id)}
          isFavorite={activeTab === "favorites"}
        />
      )}
    </section>
  );
}
