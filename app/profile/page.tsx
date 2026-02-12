"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import MyNotices from "@/components/Profile/MyNotices";
import UserCard from "@/components/Profile/UserCard";

export default function ProfilePage() {
  const { token, userFull, refreshUser, loading } = useAuthStore();

  useEffect(() => {
    if (token && !userFull) refreshUser();
  }, [token]);

  if (!token) return <p>Please login</p>;
  if (!userFull || loading) return <p>Loading...</p>;

  return (
    <main className="container">
      <UserCard isHome={false} user={userFull} />
      <MyNotices />
    </main>
  );
}
