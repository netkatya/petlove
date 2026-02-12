"use client";

import { CurrentUserFullResponse } from "@/types/user";

import LogOutBtn from "../LogOutButton";
import UserBlock from "./UserBlock";
import PetsBlock from "./PetsBlock";

type Props = {
  isHome: boolean;
  user: CurrentUserFullResponse;
  onUpdated: () => void;
};

export default function UserCard({ isHome, user, onUpdated }: Props) {
  return (
    <section className="rounded-[30px] md:rounded-[60px] bg-(--light-text) px-5 py-4.5">
      <div className="flex justify-between items-start gap-3"></div>

      <div className="mt-6">
        <UserBlock user={user} onUpdated={onUpdated} />
      </div>

      <div className="mt-6">
        <PetsBlock pets={user.pets} onChanged={onUpdated} />
      </div>

      <LogOutBtn isHome={isHome} />
    </section>
  );
}
