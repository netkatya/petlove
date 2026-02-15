"use client";

import Link from "next/link";

export default function AuthNav() {
  return (
    <ul className="flex flex-col justify-center gap-2 md:flex-row xl:ml-42">
      <li>
        <Link
          href="/login"
          className="h-10.5 md:h-12.5 md:px-8.75 flex justify-center items-center border border-(--light-text) rounded-[30px] bg-(--orange) text-(--light-text) text-center hover:bg-(--hover-orange) transition-all duration-300"
        >
          LOG IN
        </Link>
      </li>
      <li>
        <Link
          href="/register"
          className="h-10.5 md:h-12.5 md:px-5 flex justify-center items-center border border-(--light-orange-bg) rounded-[30px] bg-(--light-orange-bg) text-(--orange) text-center hover:bg-(--light-orange-hover) transition-all duration-300"
        >
          REGISTRATION
        </Link>
      </li>
    </ul>
  );
}
