"use client";

import NewsList from "@/components/NewsList";
import PageTitle from "@/components/PageTitle";
import SearchInput from "@/components/SearchInput";
import { useState } from "react";

export default function NewsPage() {
  const [inputValue, setInputValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = () => {
    setPage(1);
    setKeyword(inputValue.trim());
  };

  const handleClear = () => {
    setInputValue("");
    setKeyword("");
    setPage(1);
  };

  return (
    <main className="pt-28.5 pb-5 md:pb-15 min-h-screen">
      <div className="container">
        <div className="flex flex-col gap-5 mb-6 md:flex-row md:items-center md:justify-between md:mb-11 xl:mb-15">
          <PageTitle>News</PageTitle>
          <SearchInput
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSearch}
            onClear={handleClear}
          />
        </div>
        <NewsList keyword={keyword} page={page} onPageChange={setPage} />
      </div>
    </main>
  );
}
