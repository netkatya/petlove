"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={`bg-transparent py-8 w-full absolute top-0 left-0 ${
        isHome ? "px-20" : "px-10"
      }`}
    >
      <div className="container">
        <div className="flex justify-between items-center w-full">
          <Link
            href="/"
            className={`flex items-baseline-last font-bold text-[20px] md:text-[28px] leading-none tracking-[-0.04em] text-${isHome ? "(--light-text)" : "(--foreground)"}`}
          >
            petl
            <span>
              <svg width={19} height={17}>
                <use
                  href="/img/icons.svg#icon-heart"
                  fill={isHome ? "#fff" : "var(--orange)"}
                ></use>
              </svg>
            </span>
            ve
          </Link>
          <Navigation isHome={isHome} />
        </div>
      </div>
    </header>
  );
}
