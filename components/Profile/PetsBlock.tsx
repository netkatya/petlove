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
      <div className="flex">
        <h3>My pets</h3>
        <Link href="/add-pet">Add pet</Link>
      </div>

      <UserPetsList pets={pets} onChanged={onChanged} />
    </div>
  );
}
