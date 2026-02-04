"use client";

import FriendsList from "@/components/FriendsList";
import PageTitle from "@/components/PageTitle";

export default function FreindsPage() {
  return (
    <main className="pt-44.5 pb-20 min-h-screen">
      <div className="container">
        <PageTitle>Our friends</PageTitle>
        <FriendsList />
      </div>
    </main>
  );
}
