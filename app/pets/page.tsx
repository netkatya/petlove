import PageTitle from "@/components/PageTitle";
import Pagination from "@/components/Pagination";
import PetsList from "@/components/PetsList";

export default function Pets() {
  return (
    <main className="pt-44.5 pb-20 min-h-screen">
      <div className="container">
        <PageTitle>Find your favorite pet</PageTitle>
        <PetsList />
      </div>
    </main>
  );
}
