"use client";

import { removePet } from "@/lib/api/clientApi";
import { UserPet } from "@/types/user";

type Props = {
  pet: UserPet;
  onChanged: () => void;
};

export default function PetsItem({ pet, onChanged }: Props) {
  const remove = async () => {
    await removePet(pet._id);
    onChanged();
  };

  return (
    <li>
      <img src={pet.imgURL} width={60} />

      <p>{pet.title}</p>
      <p>{pet.name}</p>
      <p>{pet.birthday}</p>
      <p>{pet.sex}</p>
      <p>{pet.species}</p>

      <button onClick={remove}>🗑</button>
    </li>
  );
}
