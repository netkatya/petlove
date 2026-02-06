"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";

export default function UserBar() {
  const user = useAuthStore((s) => s.user);

  const avatar = user?.avatar || "/img/default-avatar.png";

  return (
    <Link
      href="/profile"
      className="flex items-center gap-2 px-4 py-2 rounded-[30px] bg-(--light-orange-bg)"
    >
      <Image
        src={avatar}
        alt="avatar"
        width={32}
        height={32}
        className="rounded-full"
      />
      <span className="font-medium">{user?.name || "User"}</span>
    </Link>
  );
}
