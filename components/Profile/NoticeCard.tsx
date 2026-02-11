"use client";

import { NoticeDetails } from "@/types/pets";
import { removeNoticeFromFavorites } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

type Props = {
  notice: NoticeDetails;
  canDelete: boolean;
  onChanged: () => void;
};

export default function NoticeCard({ notice, canDelete, onChanged }: Props) {
  const token = useAuthStore((s) => s.token);
  const remove = async () => {
    if (!token) return;

    try {
      await removeNoticeFromFavorites(notice._id, token);
      onChanged();
    } catch (error) {
      console.error("Failed to remove favorite:", error);
      alert("Failed to remove from favorites");
    }
  };

  return (
    <li>
      <img src={notice.imgURL} width={80} />
      <p>{notice.title}</p>

      {canDelete && <button onClick={remove}>🗑</button>}
    </li>
  );
}
