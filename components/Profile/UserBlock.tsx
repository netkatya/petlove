"use client";

import { CurrentUserResponse } from "@/types/user";
import EditUserBtn from "./EditUserButton";
import ModalEditUser from "./ModalEditUser";
import { useState } from "react";
import Image from "next/image";

type Props = {
  user: CurrentUserResponse;
  onUpdated: () => void;
};

export default function UserBlock({ user, onUpdated }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {user.avatar ? (
        <Image
          src={user.avatar}
          width={94}
          height={94}
          alt="User's photo or default icon"
        />
      ) : (
        <EditUserBtn onClick={() => setOpen(true)} />
      )}
      <p>Upload photo</p>
      <h2>My information</h2>
      <ul>
        <li>{user.name}</li>
        <li>{user.email}</li>
        <li>{user.phone}</li>
      </ul>

      {open && (
        <ModalEditUser onClose={() => setOpen(false)} onUpdated={onUpdated} />
      )}
    </div>
  );
}
