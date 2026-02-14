"use client";

import { removePet } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { UserPet } from "@/types/user";
import Image from "next/image";
import { useEffect } from "react";

type Props = {
  pet: UserPet;
};

export default function PetsItem({ pet }: Props) {
  const refreshUser = useAuthStore((s) => s.refreshUser); // ← тут

  const remove = async () => {
    await removePet(pet._id);
    await refreshUser();
  };

  useEffect(() => {
    console.log("PET:", pet);
  }, [pet]);

  return (
    <li className="flex gap-3.5">
      <Image
        src={pet.imgURL}
        width={66}
        height={66}
        alt="pet's photo"
        className="rounded-full"
      />
      <div>
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-sm leading-[1.29]">{pet.title}</h4>
          <button onClick={remove}>🗑</button>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <p>Name{pet.name}</p>
          <p>Birthday{pet.birthday}</p>
          <p>Sex{pet.sex}</p>
          <p>Species{pet.species}</p>
        </div>
      </div>
    </li>
  );
}
