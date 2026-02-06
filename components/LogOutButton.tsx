"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ModalApproveAction from "./ModalApproveAction";
import { useAuthStore } from "@/lib/store/authStore";

export default function LogOutBtn() {
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
        className="px-4 py-2 rounded-[30px] border"
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
