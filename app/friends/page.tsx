"use client";

import FriendsList from "@/components/FriendsList";

export default function FreindsPage() {
  return (
    <main className="pt-44.5 pb-20 min-h-screen">
      <div className="container">
        <h2 className="font-bold text-[54px] leading-none tracking-[-0.03em] mb-15">
          Our friends
        </h2>
        <FriendsList />
      </div>
    </main>
  );
}
