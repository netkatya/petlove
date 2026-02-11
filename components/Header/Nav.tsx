"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  isHome: boolean;
};

export default function Nav({ isHome }: Props) {
  const pathname = usePathname();

  const links = [
    { href: "/news", label: "News" },
    { href: "/pets", label: "Find pet" },
    { href: "/friends", label: "Our friends" },
  ];

  return (
    <nav className="flex gap-2.5">
      {links.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={`px-5 py-3.75 border rounded-[30px] font-medium text-base leading-[125%] tracking-[-0.03em] transition-all duration-300 ease-in-out
              ${
                isActive
                  ? "bg-(--orange) text-(--light-text)"
                  : isHome
                    ? "border-(--light-text) text-(--light-text) hover:bg-(--light-orange-bg) hover:text-(--orange)"
                    : "border-(--light-grey) text-foreground hover:bg-background hover:text-(--orange)"
              }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
