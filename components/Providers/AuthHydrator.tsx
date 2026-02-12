"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthHydrator() {
  const token = useAuthStore((s) => s.token);
  const userFull = useAuthStore((s) => s.userFull);
  const refreshUser = useAuthStore((s) => s.refreshUser);

  useEffect(() => {
    if (token && !userFull) {
      refreshUser();
    }
  }, [token, userFull, refreshUser]);

  return null;
}
