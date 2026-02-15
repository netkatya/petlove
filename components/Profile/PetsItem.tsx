"use client";

import { removePet } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { UserPet } from "@/types/user";
import { Trash2 } from "lucide-react";
import Image from "next/image";

type Props = {
  pet: UserPet;
};

export default function PetsItem({ pet }: Props) {
  const refreshUser = useAuthStore((s) => s.refreshUser); // ← тут

  const remove = async () => {
    await removePet(pet._id);
    await refreshUser();
  };

  return (
    <li className="relative flex gap-3.5 border border-(--light-grey) rounded-[20px] p-4 ">
      <Image
        src={pet.imgURL}
        width={66}
        height={66}
        alt="pet's photo"
        className="rounded-full min-w-16.5 max-h-16.5"
      />
      <div>
        <h4 className="font-bold text-sm leading-[1.29] mb-2">{pet.title}</h4>
        <button
          onClick={remove}
          className="absolute top-3 right-3 rounded-full bg-(--light-orange-bg) min-w-7.5 min-h-7.5 flex justify-center items-center"
        >
          <Trash2 size={18} className="text-(--orange)" />
        </button>
        <ul className="flex flex-wrap gap-3">
          <li className="flex flex-col gap-1">
            <p className="text-[10px] text-(--grey-text)">Name</p>
            <p className="text-xs">{pet.name}</p>
          </li>
          <li className="flex flex-col gap-1">
            <p className="text-[10px] text-(--grey-text)">Birthday</p>
            <p className="text-xs">{pet.birthday}</p>
          </li>
          <li className="flex flex-col gap-1">
            <p className="text-[10px] text-(--grey-text)">Sex</p>
            <p className="text-xs capitalize">{pet.sex}</p>
          </li>
          <li className="flex flex-col gap-1">
            <p className="text-[10px] text-(--grey-text)">Species</p>
            <p className="text-xs capitalize">{pet.species}</p>
          </li>
        </ul>
      </div>
    </li>
  );
}
