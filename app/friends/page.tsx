"use client";

import FriendsList from "@/components/Friends/FriendsList";
import PageTitle from "@/components/PageTitle";

export default function FreindsPage() {
  return (
    <main className="pt-28.5 pb-20 min-h-screen">
      <div className="container">
        <PageTitle>Our friends</PageTitle>
        <FriendsList />
      </div>
    </main>
  );
}
