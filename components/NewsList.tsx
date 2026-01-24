"use client";

import Loading from "@/app/loading";
import { fetchNewsClient } from "@/lib/api/clientApi";
import { NewsItem } from "@/types/news";
import { formatDate } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NewsList() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchNewsClient();
        setNewsData(response.results);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch news");
        }
        setNewsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && error && <p className="text-(--orange)">{error}</p>}

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-6 md:gap-y-8 xl:grid-cols-3 xl:gap-x-8.75 xl:gap-y-10">
        {newsData.map((item) => (
          <li key={item._id} className="flex flex-col justify-between">
            <Image
              src={item.imgUrl}
              alt="News photo"
              width={335}
              height={190}
              className="rounded-[15px] w-full mb-5"
            ></Image>
            <h3 className="font-bold text-base leading-tight tracking-[-0.03em] mb-3">
              {item.title}
            </h3>
            <p className="font-medium text-sm leading-[1.29] tracking-[-0.02em] mb-4.75">
              {item.text}
            </p>
            <div className="flex justify-between">
              <p className="font-medium text-sm leading-[1.29] tracking-[-0.02em] text-(--grey-text)">
                {formatDate(item.date)}
              </p>
              <Link
                href={item.url}
                target="_blank"
                className="font-medium text-[14px] leading-[1.29] tracking-[-0.02em] underline decoration-skip-ink-none text-(--orange) hover:text-(--grey-text)"
              >
                Read more
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
