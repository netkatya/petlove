"use client";

import { PawPrint } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <PawPrint className="w-20 h-20 text-(--orange) animate-pulse" />
    </div>
  );
}
