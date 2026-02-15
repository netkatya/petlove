"use client";

import PageTitle from "@/components/PageTitle";
import PetsList from "@/components/Notices/PetsList";
import { useState } from "react";
import PetsFilters from "@/components/Notices/PetsFilters";
import { PetsFilters as PetsFiltersType } from "@/types/pets";

export default function Pets() {
  const [filters, setFilters] = useState<PetsFiltersType>({});
  return (
    <main className="pt-28.5 pb-20 min-h-screen">
      <div className="container">
        <PageTitle>Find your favorite pet</PageTitle>
        <PetsFilters onChange={setFilters} onReset={() => setFilters({})} />
        <PetsList filters={filters} />
      </div>
    </main>
  );
}
