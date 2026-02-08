"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";

type Props = {
  isHome: boolean;
};

export default function UserBar({ isHome }: Props) {
  const user = useAuthStore((s) => s.user);

  const avatar = user?.avatar || "/img/icons.svg#icon-user";

  return (
    <Link href="/profile" className="flex items-center gap-2">
      <div className="rounded-full bg-(--light-orange-bg) p-3.25">
        <svg height={24} width={24}>
          <use href={avatar} fill="#f6b83d"></use>
        </svg>
      </div>

      <span
        className={`font-bold text-[20px] leading-none tracking-[-0.03em]
          ${isHome ? "text-(--light-text)" : "text-foreground"}`}
      >
        {user?.name || "User"}
      </span>
    </Link>
  );
}
