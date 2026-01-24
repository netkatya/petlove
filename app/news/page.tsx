import NewsList from "@/components/NewsList";

export default function NewsPage() {
  return (
    <main className="pt-28.5 pb-5 md:pb-15 min-h-screen">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-5 md:justify-between mb-6 md:mb-11 xl:mb-15">
          <h2 className="font-bold text-2xl md:text-[54px] leading-none tracking-tight">
            News
          </h2>
          <input type="text" placeholder="Search" />
        </div>
        <NewsList />
      </div>
    </main>
  );
}
