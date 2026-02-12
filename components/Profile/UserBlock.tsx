"use client";

import { CurrentUserResponse } from "@/types/user";
import EditUserBtn from "./EditUserButton";
import ModalEditUser from "./ModalEditUser";
import { useState } from "react";
import Image from "next/image";
import { uploadAvatar } from "@/lib/cloudinary/cloudinary";
import { editUser } from "@/lib/api/clientApi";

type Props = {
  user: CurrentUserResponse;
  onUpdated: () => void;
};

export default function UserBlock({ user, onUpdated }: Props) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      const url = await uploadAvatar(file);

      await editUser({ avatar: url });

      onUpdated();
    } catch (err) {
      console.error(err);
      alert("Failed to upload avatar");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <div className="flex items-center justify-center gap-1 rounded-[30px] bg-(--orange) p-2.5 max-w-20 h-9.5">
          <span className="font-medium text-[14px] leading-[129%] tracking-[-0.02em] text-(--light-text)">
            {user?.name || "User"}
          </span>
          <svg height={18} width={18}>
            <use href="/img/icons.svg#icon-user" fill="#fff"></use>
          </svg>
        </div>
        <EditUserBtn onClick={() => setOpen(true)} />
      </div>
      <div className="flex flex-col justify-center items-center gap-2 mb-7">
        {user.avatar ? (
          <Image
            src={user.avatar}
            width={94}
            height={94}
            alt="User's photo or default icon"
            className="rounded-full"
          />
        ) : (
          <Image
            src="/img/user-image.png"
            width={94}
            height={94}
            alt="User's photo or default icon"
          />
        )}

        <label className="cursor-pointer text-sm text-(--orange)">
          {uploading ? "Uploading..." : "Upload photo"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </label>
      </div>

      <h3 className="font-bold text-[16px] leading-[125%] mb-5">
        My information
      </h3>
      <ul className="flex flex-col gap-2.5">
        <li className="rounded-[30px] p-2.5 border border-(--orange) font-medium text-[14px] leading-[129%] tracking-[-0.03em]">
          {user.name}
        </li>
        <li className="rounded-[30px] p-2.5 border border-(--orange) font-medium text-[14px] leading-[129%] tracking-[-0.03em]">
          {user.email}
        </li>
        <li
          className={`rounded-[30px] p-2.5 border font-medium text-[14px] leading-[129%] tracking-[-0.03em] ${
            user.phone ? "border-(--orange)" : "border-(--light-grey)"
          }`}
        >
          {user.phone ? user.phone : "+380"}
        </li>
      </ul>

      {open && (
        <ModalEditUser
          onClose={() => setOpen(false)}
          onUpdated={onUpdated}
          initialAvatar={user.avatar ?? undefined}
          initialValues={{
            name: user.name ?? undefined,
            email: user.email ?? undefined,
            phone: user.phone ?? undefined,
          }}
        />
      )}
    </div>
  );
}
