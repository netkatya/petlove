"use client";

import { useAuthStore } from "@/lib/store/authStore";
import Nav from "./Nav";
import UserNav from "./UserNav";
import AuthNav from "./AuthNav";


type Props = {
  isHome: boolean;
};

export default function Navigation({ isHome }: Props) {
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <div className="flex items-center gap-6">
      <Nav isHome={isHome} />

      {isAuth ? <UserNav isHome={isHome} /> : <AuthNav />}
    </div>
  );
}
