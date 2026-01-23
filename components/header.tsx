"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={`bg-transparent py-8 w-full absolute top-0 left-0 px-${isHome ? "20" : "10"}`}
    >
      <div className="container">
        <div className="flex justify-between items-center w-full">
          <p
            className={`flex items-baseline-last font-bold text-[28px] leading-none tracking-[-0.04em] text-${isHome ? "(--light-text)" : "(--foreground)"}`}
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
          </p>
          <nav className="flex gap-2.5">
            <Link
              href="/news"
              className={`px-5 py-3.75  
              border ${isHome ? "border-(--light-text)" : "border-(--light-grey)"} rounded-[30px] font-medium 
              text-base text-${isHome ? "(--light-text)" : "(--foreground)"} leading-[125%] 
              tracking-[-0.03em] hover:bg-${isHome ? "(--light-orange-bg)" : "(--background)"} 
              hover:text-(--orange) transition-all duration-300 ease-in-out`}
            >
              News
            </Link>
            <Link
              href="/find"
              className={`px-5 py-3.75 border 
              ${isHome ? "border-(--light-text)" : "border-(--light-grey)"} rounded-[30px] font-medium 
              text-base text-${isHome ? "(--light-text)" : "(--foreground)"} leading-[125%] 
              tracking-[-0.03em] hover:bg-${isHome ? "(--light-orange-bg)" : "(--background)"} 
              hover:text-(--orange) transition-all duration-300 ease-in-out`}
            >
              Find pet
            </Link>
            <Link
              href="/friends"
              className={`px-5 py-3.75 border 
              ${isHome ? "border-(--light-text)" : "border-(--light-grey)"} rounded-[30px] font-medium 
              text-base text-${isHome ? "(--light-text)" : "(--foreground)"} leading-[125%] 
              tracking-[-0.03em] hover:bg-${isHome ? "(--light-orange-bg)" : "(--background)"} 
              hover:text-(--orange) transition-all duration-300 ease-in-out`}
            >
              Our friends
            </Link>
          </nav>
          <ul className="flex gap-2">
            <li>
              <Link
                href="/login"
                className="px-6 py-3.75 border border-(--light-text) rounded-[30px] bg-(--orange) text-(--light-text) hover:bg-(--light-orange-bg) hover:text-(--orange) transition-all duration-300 ease-in-out"
              >
                LOG IN
              </Link>
            </li>
            <li>
              <Link
                href="/registration"
                className="px-6 py-3.75 border border-(--light-orange-bg) rounded-[30px] bg-(--light-orange-bg) text-(--orange) hover:bg-(--light-orange-hover) transition duration-300 ease-in-out"
              >
                REGISTRATION
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
