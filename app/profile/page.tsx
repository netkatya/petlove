"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import MyNotices from "@/components/Profile/MyNotices";
import UserCard from "@/components/Profile/UserCard";

export default function ProfilePage() {
  const { token, userFull, refreshUser, loading } = useAuthStore();

  useEffect(() => {
    if (!token) return;
    refreshUser();
  }, [token, refreshUser]);

  if (!token) return <p>Please login</p>;
  if (loading || !userFull) return <p>Loading...</p>;

  return (
    <main className="pt-40.5 pb-13">
      <div className="container flex flex-col xl:flex-row gap-10 xl:items-start xl:gap-8">
        <UserCard isHome={false} user={userFull} />
        <MyNotices />
      </div>
    </main>
  );
}
