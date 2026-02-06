"use client";

import LogOutBtn from "./LogOutButton";
import UserBar from "./UserBar";

export default function UserNav() {
  return (
    <div className="flex items-center gap-3">
      <UserBar />
      <LogOutBtn />
    </div>
  );
}
