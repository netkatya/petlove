"use client";

import { useState } from "react";
import NoticeCard from "../Notices/NoticeCard";
import { useAuthStore } from "@/lib/store/authStore";
import { useFavoritesStore } from "@/lib/store/favoritesStore";

export default function MyNotices() {
  const [activeTab, setActiveTab] = useState<"favorites" | "viewed">(
    "favorites",
  );

  const userFull = useAuthStore((s) => s.userFull);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  if (!userFull) return null;

  const list =
    activeTab === "favorites"
      ? userFull.noticesFavorites
      : userFull.noticesViewed;

  return (
    <section>
      <div className="flex gap-2.5 mb-5">
        <button onClick={() => setActiveTab("favorites")}>
          My favorites pets
        </button>
        <button onClick={() => setActiveTab("viewed")}>Viewed</button>
      </div>

      {list.length === 0 ? (
        <p className="text-center mb-20">No pets yet</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-x-8 xl:gap-y-10">
          {list.map((notice) => (
            <NoticeCard
              key={notice._id}
              notice={notice}
              variant="profile"
              onDelete={toggleFavorite}
              onLearnMore={(id) => console.log(id)}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
