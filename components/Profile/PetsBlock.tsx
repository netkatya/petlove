"use client";

import { UserPet } from "@/types/user";

import Link from "next/link";
import UserPetsList from "./UserPetsList";

type Props = {
  pets: UserPet[];
  onChanged: () => void;
};

export default function PetsBlock({ pets, onChanged }: Props) {
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="font-bold text-[16px] leading-[125%] mb-5">My pets</h3>
        <Link
          href="/add-pet"
          className="bg-(--orange) rounded-[30px] h-9.5 px-3.5 py-2.5 text-(--light-text) font-medium text-[14px] leading-[129%] tracking-[-0.03em]"
        >
          Add pet +
        </Link>
      </div>

      <UserPetsList pets={pets} onChanged={onChanged} />
    </div>
  );
}
