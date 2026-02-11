"use client";

import Link from "next/link";

export default function AuthNav() {
  return (
    <ul className="flex gap-2 ml-35.5">
      <li>
        <Link
          href="/login"
          className="px-6 py-3.75 border border-(--light-text) rounded-[30px] bg-(--orange) text-(--light-text) hover:bg-(--hover-orange) transition-all duration-300"
        >
          LOG IN
        </Link>
      </li>
      <li>
        <Link
          href="/register"
          className="px-6 py-3.75 border border-(--light-orange-bg) rounded-[30px] bg-(--light-orange-bg) text-(--orange) hover:bg-(--light-orange-hover) transition-all duration-300"
        >
          REGISTRATION
        </Link>
      </li>
    </ul>
  );
}
