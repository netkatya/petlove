"use client";

import { useState } from "react";
import NoticeCard from "./NoticeCard";
import { NoticeDetails } from "@/types/pets";

type Props = {
  favorites: NoticeDetails[];
  viewed: NoticeDetails[];
  onChanged: () => void;
};

export default function MyNotices({ favorites, viewed, onChanged }: Props) {
  const [activeTab, setActiveTab] = useState<"favorites" | "viewed">(
    "favorites",
  );

  const list = activeTab === "favorites" ? favorites : viewed;

  return (
    <section className="rounded-[30px] md:rounded-[60px] bg-(--light-text) p-6 md:p-8">
      <h2 className="font-bold text-xl mb-4">My notices</h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("favorites")}
          className={activeTab === "favorites" ? "font-bold underline" : ""}
        >
          My favorites pets
        </button>

        <button
          onClick={() => setActiveTab("viewed")}
          className={activeTab === "viewed" ? "font-bold underline" : ""}
        >
          Viewed
        </button>
      </div>

      {list.length === 0 ? (
        <p>No notices here</p>
      ) : (
        <ul className="grid gap-4">
          {list.map((notice) => (
            <NoticeCard
              key={notice._id}
              notice={notice}
              canDelete={activeTab === "favorites"}
              onChanged={onChanged}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
