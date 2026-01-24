import NewsList from "@/components/NewsList";

export default function NewsPage() {
  return (
    <main className="pt-28.5 pb-20">
      <div className="container">
        <h2>News</h2>
        <input type="text" placeholder="Search" />
        <NewsList />
      </div>
    </main>
  );
}
