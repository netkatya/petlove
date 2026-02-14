"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";

type Props = {
  isHome: boolean;
};

export default function UserBar({ isHome }: Props) {
  const name = useAuthStore((s) => s.user?.name);
  const avatar = useAuthStore((s) => s.user?.avatar);

  return (
    <Link href="/profile" className="flex items-center gap-2">
      <div className="rounded-full bg-(--light-orange-bg) w-11 h-11 flex items-center justify-center overflow-hidden">
        {avatar ? (
          <Image
            src={avatar}
            alt="User avatar"
            width={44}
            height={44}
            className="rounded-full object-cover w-full h-full"
          />
        ) : (
          <svg width={24} height={24}>
            <use href="/img/icons.svg#icon-user" fill="#f6b83d" />
          </svg>
        )}
      </div>

      <span
        className={`font-bold text-[20px] leading-none tracking-[-0.03em] ${
          isHome ? "text-(--light-text)" : "text-foreground"
        }`}
      >
        {name || "User"}
      </span>
    </Link>
  );
}
