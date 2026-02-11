"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { getCurrentUserFull } from "@/lib/api/clientApi";

import MyNotices from "@/components/Profile/MyNotices";
import UserCard from "@/components/Profile/UserCard";
import { CurrentUserFullResponse } from "@/types/user";

export default function ProfilePage() {
  const token = useAuthStore((s) => s.token);
  const isAuth = !!token;

  const [user, setUser] = useState<CurrentUserFullResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetchUser = async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getCurrentUserFull(token);
      setUser(data);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to load user profile",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuth) {
      setUser(null);
      setLoading(false);
      return;
    }

    refetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  if (!isAuth) {
    return (
      <main className="pt-20.5 md:pt-28.5 pb-10">
        <div className="container">
          <p>Please login to view your profile.</p>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="pt-20.5 md:pt-28.5 pb-10">
        <div className="container">Loading profile...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="pt-20.5 md:pt-28.5 pb-10">
        <div className="container text-red-500">{error}</div>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="pt-20.5 md:pt-28.5 pb-10">
      <div className="container grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-8 items-start">
        <UserCard isHome={false} user={user} onUpdated={refetchUser} />

        <MyNotices
          favorites={user.noticesFavorites}
          viewed={user.noticesViewed}
          onChanged={refetchUser}
        />
      </div>
    </main>
  );
}
