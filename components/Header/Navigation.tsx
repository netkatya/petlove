"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import Nav from "./Nav";
import UserNav from "./UserNav";
import AuthNav from "./AuthNav";
import UserBar from "./UserBar";
import BurgerButton from "./BurgerButton";
import { X } from "lucide-react";

type Props = {
  isHome: boolean;
};

export default function Navigation({ isHome }: Props) {
  const isAuth = useAuthStore((s) => s.isAuth);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="flex justify-between items-center gap-3 md:gap-6">
      {/* up to XL (mobile + tablet + laptop) */}
      <div className="flex items-center gap-3 xl:hidden">
        {isAuth ? <UserBar isHome={isHome} /> : null}
        <BurgerButton
          isHome={isHome}
          open={open}
          onClick={() => setOpen(!open)}
        />
      </div>

      {/* XL+ (desktop full)  */}
      <div className="hidden xl:flex items-center gap-6">
        <Nav isHome={isHome} />
        {isAuth ? <UserNav isHome={isHome} /> : <AuthNav />}
      </div>

      {/* overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-white/40 z-40 transition-opacity duration-300
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
      />

      {/* menu */}
      <div
        className={`fixed top-0 right-0 h-full w-54.5 md:w-93.5 bg-(--orange) z-50 px-6 pt-70 pb-10 flex flex-col justify-between gap-6
        transform transition-transform duration-300 ease-out
        ${open ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-7 right-7 text-(--light-text)"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
        <div onClick={() => setOpen(false)}>
          <Nav isHome={true} />
        </div>

        <div onClick={() => setOpen(false)}>
          {isAuth ? <UserNav isHome={true} /> : <AuthNav />}
        </div>
      </div>
    </div>
  );
}
