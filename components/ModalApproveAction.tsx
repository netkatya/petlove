"use client";

import { useEffect } from "react";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ModalApproveAction({ onConfirm, onCancel }: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
      onClick={onCancel}
    >
      <div
        className="bg-white p-6 rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mb-4">Are you sure you want to log out?</p>

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="bg-(--orange) text-white px-4 py-2 rounded"
          >
            Yes
          </button>

          <button onClick={onCancel} className="border px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
