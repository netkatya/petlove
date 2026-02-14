"use client";

import { CurrentUserFullResponse } from "@/types/user";
import LogOutBtn from "../LogOutButton";
import UserBlock from "./UserBlock";
import PetsBlock from "./PetsBlock";

type Props = {
  isHome: boolean;
  user: CurrentUserFullResponse;
};

export default function UserCard({ isHome, user }: Props) {
  return (
    <section className="w-full xl:max-w-130 rounded-[30px] md:rounded-[60px] bg-(--light-text) px-5 py-4.5 md:p-10">
      <div className="mb-10">
        <UserBlock user={user} />
      </div>

      <div className="">
        <PetsBlock pets={user.pets} />
      </div>

      <LogOutBtn isHome={isHome} />
    </section>
  );
}
