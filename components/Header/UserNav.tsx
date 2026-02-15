"use client";

import LogOutBtn from "../LogOutButton";
import UserBar from "./UserBar";

type Props = {
  isHome: boolean;
};

export default function UserNav({ isHome }: Props) {
  return (
    <div className="flex flex-col-reverse items-center gap-3 md:flex-row xl:ml-42">
      <LogOutBtn isHome={isHome} />
      <UserBar isHome={isHome} />
    </div>
  );
}
