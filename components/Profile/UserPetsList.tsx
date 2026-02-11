"use client";

import { UserPet } from "@/types/user";
import PetsItem from "./PetsItem";

type Props = {
  pets: UserPet[];
  onChanged: () => void;
};

export default function UserPetsList({ pets, onChanged }: Props) {
  return (
    <ul>
      {pets.map((p) => (
        <PetsItem key={p._id} pet={p} onChanged={onChanged} />
      ))}
    </ul>
  );
}
