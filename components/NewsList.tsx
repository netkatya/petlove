"use client";

import Loading from "@/app/loading";
import { fetchNewsClient } from "@/lib/api/clientApi";
import { NewsItem } from "@/types/news";
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

      <ul>
        {newsData.map((item) => (
          <li key={item._id}>
            <Image
              src={item.imgUrl}
              alt="News photo"
              width={335}
              height={190}
            ></Image>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <p>{item.date}</p>
            <Link href={item.url}>Read more</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
