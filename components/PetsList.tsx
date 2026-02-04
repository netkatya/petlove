"use client";

import { fetchPetsClient } from "@/lib/api/clientApi";
import { Pet } from "@/types/pets";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Image from "next/image";

export default function PetsList() {
  const [petsData, setPetsData] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchPetsClient(undefined, page);

        setPetsData(response.results);
        setTotalPages(response.totalPages);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch pets");
        }
        setPetsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <ul>
        {petsData.map((pet) => (
          <li key={pet._id} className="p-6">
            <div className="w-full h-44.5 rounded-2xl overflow-hidden mb-6">
              <Image
                src={pet.imgURL}
                alt={pet.title}
                width={287}
                height={178}
                className=" object-cover w-full h-full"
              ></Image>
            </div>
            <div className="flex justify-between mb-2">
              <h3 className="font-bold text-base leading-[125%] text-(--card-text)">
                {pet.title}
              </h3>
              <div className="flex gap-1 items-center">
                <svg width={16} height={16} aria-hidden="true">
                  <use href="/img/icons.svg#icon-star" fill="#ffc531"></use>
                </svg>
                <p className="font-medium text-sm leading-[129%] text-(--card-text)">
                  {pet.popularity}
                </p>
              </div>
            </div>
            <ul className="flex gap-3.5 justify-between mb-4">
              <li>
                <p className="font-medium text-[10px] leading-[140%] tracking-[-0.02em] text-(--grey-text)">
                  Name
                </p>
                <p className="font-medium text-xs leading-[117%] tracking-[-0.02em]">
                  {pet.name}
                </p>
              </li>
              <li>
                <p className="font-medium text-[10px] leading-[140%] tracking-[-0.02em] text-(--grey-text)">
                  Birthday
                </p>
                <p className="font-medium text-xs leading-[117%] tracking-[-0.02em]">
                  {new Date(pet.birthday).toLocaleDateString("uk-UA")}
                </p>
              </li>
              <li>
                <p className="font-medium text-[10px] leading-[140%] tracking-[-0.02em] text-(--grey-text)">
                  Sex
                </p>
                <p className="font-medium text-xs leading-[117%] tracking-[-0.02em] capitalize">
                  {pet.sex}
                </p>
              </li>
              <li>
                <p className="font-medium text-[10px] leading-[140%] tracking-[-0.02em] text-(--grey-text)">
                  Species
                </p>
                <p className="font-medium text-xs leading-[117%] tracking-[-0.02em] capitalize">
                  {pet.species}
                </p>
              </li>
              <li>
                <p className="font-medium text-[10px] leading-[140%] tracking-[-0.02em] text-(--grey-text)">
                  Category
                </p>
                <p className="font-medium text-xs leading-[117%] tracking-[-0.02em] capitalize">
                  {pet.category}
                </p>
              </li>
            </ul>
            <p className="font-medium text-sm leading-[129%] tracking-[-0.02em] text-(--card-text) mb-4">
              {pet.comment}
            </p>
            <p className="font-bold text-base leading-[125%] text-(--card-text) mb-3">
              {pet.price ? `$${pet.price}` : "Free"}
            </p>
            <div className="flex gap-2.5 justify-between">
              <button className="bg-(--orange) rounded-[30px] flex justify-center items-center w-57.75 h-11.5 font-medium text-base leading-[125%] tracking-[-0.03em] text-(--light-text)">
                Learn more
              </button>
              <button
                className="rounded-full bg-(--light-orange-bg) min-w-11.5 h-11.5 flex justify-center items-center"
                aria-label="Add to favorites"
              >
                <svg width={18} height={16}>
                  <use
                    href="/img/icons.svg#icon-heart"
                    stroke="#f6b83d"
                    strokeWidth={1.5}
                    fill="transparent"
                  ></use>
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}
