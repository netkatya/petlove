import { fetchFriendsClient } from "@/lib/api/clientApi";
import { Friend } from "@/types/friends";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FriendsList() {
  const [friendsData, setFriendsData] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const friends = await fetchFriendsClient();

        setFriendsData(friends);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch friends");
        }
        setFriendsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function formatWorkDays(
    workDays:
      | { isOpen: boolean; from?: string; to?: string }[]
      | null
      | undefined,
  ) {
    if (!workDays || workDays.length === 0) return "Day and night";
    const openDays = workDays.filter((day) => day.isOpen);

    if (openDays.length === 0) return "Closed";

    const firstOpen = openDays[0];
    return firstOpen.from && firstOpen.to
      ? `${firstOpen.from}-${firstOpen.to}`
      : "Open";
  }

  return (
    <div className="container">
      <h1 className="font-bold text-[54px] leading-none tracking-[-0.03em] mb-15">
        Our friends
      </h1>
      {loading && <p>Loading friends...</p>}
      {!loading && error && <p className="text-red-500">{error}</p>}
      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-5 xl:gap-y-7">
        {friendsData.map((item) => {
          const slug = item._id;

          return (
            <li
              key={slug}
              className="bg-(--light-text) rounded-[15px] px-5 py-10 relative flex gap-4 items-center"
            >
              <p
                className="block absolute top-2.5 right-2.5 rounded-[30px] p-2 text-(--orange) bg-(--light-orange-bg)
              font-medium text-[14px] leading-[1.29] tracking-[-0.02em]"
              >
                {formatWorkDays(item.workDays)}
              </p>
              <Image
                src={item.imageUrl}
                alt="partner's logo"
                width={90}
                height={90}
                className="w-22.5 h-22.5"
              ></Image>
              <div>
                <p className="font-bold text-[20px] leading-[1.3] tracking-[-0.04em] mb-5">
                  {item.title}
                </p>
                <ul className="flex flex-col gap-2">
                  {item.email && (
                    <li className="text-(--grey-text) font-medium text-[14px] leading-[1.29] tracking-[-0.02em]">
                      Email:{" "}
                      <Link
                        href={`mailto:${item.email}`}
                        className="text-foreground hover:text-(--orange) transition duration-300"
                      >
                        {item.email}
                      </Link>
                    </li>
                  )}
                  {item.address && item.addressUrl && (
                    <li className="text-(--grey-text) font-medium text-[14px] leading-[1.29] tracking-[-0.02em]">
                      Address:{" "}
                      <Link
                        href={item.addressUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-(--orange) transition duration-300"
                      >
                        {item.address}
                      </Link>
                    </li>
                  )}
                  {item.phone && (
                    <li className="text-(--grey-text) font-medium text-[14px] leading-[1.29] tracking-[-0.02em]">
                      Phone:{" "}
                      <Link
                        href={`tel:${item.phone}`}
                        className="text-foreground hover:text-(--orange) transition duration-300"
                      >
                        {item.phone}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
