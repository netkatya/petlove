"use client";

import { UserPet } from "@/types/user";
import PetsItem from "./PetsItem";

type Props = {
  pets: UserPet[];
  onChanged?: () => void;
};

export default function UserPetsList({ pets }: Props) {
  return (
    <ul className="flex flex-col md:flex-row xl:flex-col gap-3.5 my-5">
      {pets.map((p) => (
        <PetsItem key={p._id} pet={p} />
      ))}
    </ul>
  );
}
