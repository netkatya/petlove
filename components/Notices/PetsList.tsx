"use client";

import { useEffect, useRef, useState } from "react";
import { fetchPetsClient, getNoticeById } from "@/lib/api/clientApi";
import { Pet, PetsFilters, NoticeDetails } from "@/types/pets";
import Pagination from "../Pagination";
import Loading from "@/app/loading";
import ModalNotice from "./ModalNotice";
import ModalAttention from "./ModalAttention";
import { useAuthStore } from "@/lib/store/authStore";
import { useFavoritesStore } from "@/lib/store/favoritesStore";
import NoticeCard from "./NoticeCard";

type Props = { filters: PetsFilters };

export default function PetsList({ filters }: Props) {
  const { isAuth, token } = useAuthStore();
  const { toggleFavorite, isFavorite, loadFavorites, loaded } =
    useFavoritesStore();

  const [petsData, setPetsData] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedNotice, setSelectedNotice] = useState<NoticeDetails | null>(
    null,
  );
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [attentionOpen, setAttentionOpen] = useState(false);

  const prevFilters = useRef<PetsFilters | null>(null);

  /* ---------------- LOAD FAVORITES AFTER AUTH ---------------- */
  useEffect(() => {
    if (isAuth && !loaded) {
      loadFavorites();
    }
  }, [isAuth, loaded, loadFavorites]);

  /* ---------------- RESET PAGE WHEN FILTERS CHANGE ---------------- */
  if (prevFilters.current !== filters) {
    prevFilters.current = filters;
    if (page !== 1) setPage(1);
  }

  /* ---------------- LOAD PETS ---------------- */
  useEffect(() => {
    let ignore = false;

    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchPetsClient(filters, page);

        if (!ignore) {
          setPetsData(res.results);
          setTotalPages(res.totalPages);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [filters, page]);

  /* ---------------- OPEN NOTICE ---------------- */
  const handleLearnMore = async (id: string) => {
    if (!isAuth || !token) {
      setAttentionOpen(true);
      return;
    }

    const full = await getNoticeById(id, token);
    setSelectedNotice(full);
    setNoticeOpen(true);
  };

  if (loading) return <Loading />;

  const handleFavorite = (id: string) => {
    if (!isAuth || !token) {
      setAttentionOpen(true);
      return;
    }

    toggleFavorite(id);
  };

  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-x-8 xl:gap-y-10">
        {petsData.map((pet) => (
          <NoticeCard
            key={pet._id}
            notice={pet}
            variant="catalog"
            isFavorite={isFavorite(pet._id)}
            onFavorite={handleFavorite}
            onLearnMore={handleLearnMore}
          />
        ))}
      </ul>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <ModalAttention
        isOpen={attentionOpen}
        onClose={() => setAttentionOpen(false)}
      />

      {noticeOpen && selectedNotice && (
        <ModalNotice
          notice={selectedNotice}
          onClose={() => setNoticeOpen(false)}
          onFavoriteToggle={() => toggleFavorite(selectedNotice._id)}
          isFavorite={isFavorite(selectedNotice._id)}
        />
      )}
    </>
  );
}
