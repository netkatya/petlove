"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ModalApproveAction from "./ModalApproveAction";
import { useAuthStore } from "@/lib/store/authStore";

type Props = {
  isHome: boolean;
};

export default function LogOutBtn({ isHome }: Props) {
  const [open, setOpen] = useState(false);

  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const handleConfirm = async () => {
    await logout();

    router.push("/");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`px-7 md:px-5 py-3 md:py-3.75 border rounded-[30px] text-(--light-text) font-bold text-[14px] md:text-[16px] leading-[129%] md:leading-[125%] tracking-[-0.03em] uppercase transition-all duration-300 ease-in-out
          ${
            isHome
              ? "border-(--light-text) hover:bg-(--light-orange-bg) hover:text-(--orange)"
              : "border-(--orange) bg-(--orange) hover:bg-(--hover-orange)"
          }`}
      >
        Log out
      </button>
      {open && (
        <ModalApproveAction
          onConfirm={handleConfirm}
          onCancel={() => setOpen(false)}
        />
      )}
    </>
  );
}
