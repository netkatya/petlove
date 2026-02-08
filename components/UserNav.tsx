"use client";

import LogOutBtn from "./LogOutButton";
import UserBar from "./UserBar";

type Props = {
  isHome: boolean;
};

export default function UserNav({ isHome }: Props) {
  return (
    <div className="flex items-center gap-3 ml-35.5">
      <LogOutBtn isHome={isHome} />
      <UserBar isHome={isHome} />
    </div>
  );
}
