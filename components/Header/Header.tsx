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
        isHome ? "px-5 md:px-10 lg:px-30 xl:px-20 2xl:px-32" : "px-0"
      }`}
    >
      <div className="container">
        <div className="flex justify-between items-center ">
          <Link
            href="/"
            className={`flex items-baseline-last font-bold text-[20px] md:text-[28px] leading-none tracking-[-0.04em] text-${isHome ? "(--light-text)" : "(--foreground)"}`}
          >
            petl
            <span>
              <svg className="w-3.5 h-3 md:w-4.75 md:h-4.25">
                <use
                  href="/img/icons.svg#icon-heart"
                  fill={isHome ? "#fff" : "var(--orange)"}
                />
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
