// "use client";

// import {
//   addNoticeToFavorites,
//   fetchPetsClient,
//   getNoticeById,
//   removeNoticeFromFavorites,
// } from "@/lib/api/clientApi";
// import { NoticeDetails, Pet, PetsFilters } from "@/types/pets";
// import { useEffect, useState } from "react";
// import Pagination from "./Pagination";
// import Image from "next/image";
// import Loading from "@/app/loading";
// import { useAuthStore } from "@/lib/store/authStore";
// import ModalAttention from "./ModalAttention";
// import ModalNotice from "./ModalNotice";

// type Props = {
//   filters: PetsFilters;
// };

// export default function PetsList({ filters }: Props) {
//   const [petsData, setPetsData] = useState<Pet[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const token = useAuthStore((s) => s.token);
//   const isAuth = !!token;

//   const [attentionOpen, setAttentionOpen] = useState(false);

//   const [selectedNotice, setSelectedNotice] = useState<NoticeDetails | null>(
//     null,
//   );
//   const [noticeOpen, setNoticeOpen] = useState(false);

//   const [favorites, setFavorites] = useState<string[]>([]);

//   const [noticeError, setNoticeError] = useState<string | null>(null);

//   const onPageChange = (newPage: number) => {
//     setPage(newPage);
//   };

//   useEffect(() => {
//     setPage(1);
//   }, [filters]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await fetchPetsClient(filters, page);

//         setPetsData(response.results);
//         setTotalPages(response.totalPages);
//       } catch (err: unknown) {
//         setError(err instanceof Error ? err.message : "Failed to fetch pets");
//         setPetsData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [filters, page]);

//   if (loading) return <Loading />;

//   if (error) return <p>{error}</p>;

//   if (!loading && petsData.length === 0) {
//     return <p>No pets found</p>;
//   }

//   // Learn more handler
//

//   return (
//     <>
//       <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-x-8 xl:gap-y-10">
//         {petsData.map((pet) => (
//           <li
//             key={pet._id}
//             className="p-6 bg-(--light-text) rounded-2xl flex flex-col h-full"
//           >
//             <div className="flex flex-col grow">
//               <div className="w-full rounded-2xl overflow-hidden mb-6 aspect-16/10">
//                 <Image
//                   src={pet.imgURL}
//                   alt={pet.title}
//                   width={287}
//                   height={178}
//                   className="object-cover w-full h-full"
//                 />
//               </div>

//               <div className="flex justify-between mb-2">
//                 <h3 className="font-bold text-base leading-[125%] text-(--card-text)">
//                   {pet.title}
//                 </h3>

//                 <div className="flex gap-1 items-center">
//                   <svg width={16} height={16} aria-hidden="true">
//                     <use href="/img/icons.svg#icon-star" fill="#ffc531"></use>
//                   </svg>
//                   <p className="font-medium text-sm leading-[129%] text-(--card-text)">
//                     {pet.popularity}
//                   </p>
//                 </div>
//               </div>

//               <ul className="flex gap-3.5 justify-between mb-4">
//                 <li>
//                   <p className="font-medium text-[10px] leading-[140%] tracking-[-0.02em] text-(--grey-text)">
//                     Name
//                   </p>
//                   <p className="font-medium text-xs leading-[117%] tracking-[-0.02em]">
//                     {pet.name}
//                   </p>
//                 </li>

//                 <li>
//                   <p className="font-medium text-[10px] leading-[140%] tracking-[-0.02em] text-(--grey-text)">
//                     Birthday
//                   </p>
//                   <p className="font-medium text-xs leading-[117%] tracking-[-0.02em]">
//                     {new Date(pet.birthday).toLocaleDateString("uk-UA")}
//                   </p>
//                 </li>

//                 <li>
//                   <p className="font-medium text-[10px] leading-[140%] tracking-[-0.02em] text-(--grey-text)">
//                     Sex
//                   </p>
//                   <p className="font-medium text-xs leading-[117%] tracking-[-0.02em] capitalize">
//                     {pet.sex}
//                   </p>
//                 </li>

//                 <li>
//                   <p className="font-medium text-[10px] leading-[140%] tracking-[-0.02em] text-(--grey-text)">
//                     Species
//                   </p>
//                   <p className="font-medium text-xs leading-[117%] tracking-[-0.02em] capitalize">
//                     {pet.species}
//                   </p>
//                 </li>

//                 <li>
//                   <p className="font-medium text-[10px] leading-[140%] tracking-[-0.02em] text-(--grey-text)">
//                     Category
//                   </p>
//                   <p className="font-medium text-xs leading-[117%] tracking-[-0.02em] capitalize">
//                     {pet.category}
//                   </p>
//                 </li>
//               </ul>

//               <p className="font-medium text-sm leading-[129%] tracking-[-0.02em] text-(--card-text) mb-4 md:mb-6">
//                 {pet.comment}
//               </p>

//               <p className="font-bold text-base leading-[125%] text-(--card-text) mb-3">
//                 {pet.price ? `$${pet.price}` : "Free"}
//               </p>
//             </div>

//             <div className="flex gap-2.5 justify-between">
//               <button
//                 onClick={() => handleLearnMore(pet)}
//                 className="bg-(--orange) rounded-[30px] flex justify-center items-center w-full h-11.5 font-medium text-base text-(--light-text) hover:bg-(--hover-orange)"
//               >
//                 Learn more
//               </button>

//               <button
//                 onClick={() => handleFavoriteClick(pet)}
//                 className="rounded-full bg-(--light-orange-bg) w-11.5 h-11.5 flex justify-center items-center hover:bg-(--light-orange-hover)"
//                 aria-label="Add to favorites"
//               >
//                 <svg width={18} height={16}>
//                   <use
//                     href="/img/icons.svg#icon-heart"
//                     stroke="#f6b83d"
//                     strokeWidth={1.5}
//                     fill={
//                       favorites.includes(pet._id) ? "#f6b83d" : "transparent"
//                     }
//                   />
//                 </svg>
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <Pagination
//         currentPage={page}
//         totalPages={totalPages}
//         onPageChange={onPageChange}
//       />

//
//     </>
//   );
// }

"use client";

import {
  fetchPetsClient,
  getNoticeById,
  addNoticeToFavorites,
  removeNoticeFromFavorites,
} from "@/lib/api/clientApi";

import { NoticeDetails, Pet, PetsFilters } from "@/types/pets";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Image from "next/image";
import Loading from "@/app/loading";
import ModalAttention from "./ModalAttention";
import ModalNotice from "./ModalNotice";
import { useAuthStore } from "@/lib/store/authStore";

type Props = {
  filters: PetsFilters;
};

export default function PetsList({ filters }: Props) {
  const { isAuth, token } = useAuthStore();

  const [petsData, setPetsData] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [attentionOpen, setAttentionOpen] = useState(false);

  const [selectedNotice, setSelectedNotice] = useState<NoticeDetails | null>(
    null,
  );
  const [noticeOpen, setNoticeOpen] = useState(false);

  const [favorites, setFavorites] = useState<string[]>([]);

  const [noticeError, setNoticeError] = useState<string | null>(null);

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchPetsClient(filters, page);

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
  }, [filters, page]);

  if (loading) return <Loading />;

  if (error) return <p>{error}</p>;

  if (petsData.length === 0) {
    return <p>No pets found</p>;
  }

  const handleLearnMore = async (pet: Pet) => {
    if (!isAuth || !token) {
      setAttentionOpen(true);
      return;
    }

    try {
      setNoticeError(null);

      const authToken: string = token;

      const fullInfo = await getNoticeById(pet._id, authToken);

      setSelectedNotice(fullInfo);
      setNoticeOpen(true);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to load notice details";

      setNoticeError(message);
    }
  };

  const toggleFavoriteById = async (id: string) => {
    if (!isAuth || !token) {
      setAttentionOpen(true);
      return;
    }

    const authToken: string = token;

    try {
      const isFav = favorites.includes(id);

      const updated = isFav
        ? await removeNoticeFromFavorites(id, authToken)
        : await addNoticeToFavorites(id, authToken);

      setFavorites(updated);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to update favorites",
      );
    }
  };

  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-x-8 xl:gap-y-10">
        {petsData.map((pet) => {
          const isFavorite = favorites.includes(pet._id);

          return (
            <li
              key={pet._id}
              className="p-6 bg-(--light-text) rounded-2xl flex flex-col h-full"
            >
              <div className="flex flex-col grow">
                <div className="w-full rounded-2xl overflow-hidden mb-6 aspect-16/10">
                  <Image
                    src={pet.imgURL}
                    alt={pet.title}
                    width={287}
                    height={178}
                    className="object-cover w-full h-full"
                  />
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
                    <p className="font-medium text-[10px] text-(--grey-text)">
                      Name
                    </p>
                    <p className="font-medium text-xs">{pet.name}</p>
                  </li>

                  <li>
                    <p className="font-medium text-[10px] text-(--grey-text)">
                      Birthday
                    </p>
                    <p className="font-medium text-xs">
                      {new Date(pet.birthday).toLocaleDateString("uk-UA")}
                    </p>
                  </li>

                  <li>
                    <p className="font-medium text-[10px] text-(--grey-text)">
                      Sex
                    </p>
                    <p className="font-medium text-xs capitalize">{pet.sex}</p>
                  </li>

                  <li>
                    <p className="font-medium text-[10px] text-(--grey-text)">
                      Species
                    </p>
                    <p className="font-medium text-xs capitalize">
                      {pet.species}
                    </p>
                  </li>

                  <li>
                    <p className="font-medium text-[10px] text-(--grey-text)">
                      Category
                    </p>
                    <p className="font-medium text-xs capitalize">
                      {pet.category}
                    </p>
                  </li>
                </ul>

                <p className="font-medium text-sm mb-4">{pet.comment}</p>

                <p className="font-bold text-base mb-3">
                  {pet.price ? `$${pet.price}` : "Free"}
                </p>
              </div>

              <div className="flex gap-2.5 justify-between">
                <button
                  onClick={() => handleLearnMore(pet)}
                  className="bg-(--orange) rounded-[30px] w-full h-11.5 text-(--light-text) hover:bg-(--hover-orange)"
                >
                  Learn more
                </button>

                <button
                  onClick={() => toggleFavoriteById(pet._id)}
                  className="rounded-full bg-(--light-orange-bg) w-11.5 h-11.5 flex justify-center items-center"
                  aria-label="Add to favorites"
                >
                  <svg width={18} height={16}>
                    <use
                      href="/img/icons.svg#icon-heart"
                      stroke="#f6b83d"
                      fill={isFavorite ? "#f6b83d" : "transparent"}
                    ></use>
                  </svg>
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

      <ModalAttention
        isOpen={attentionOpen}
        onClose={() => setAttentionOpen(false)}
      />

      {noticeError && (
        <p className="text-red-600 text-center mt-4">{noticeError}</p>
      )}

      {noticeOpen && selectedNotice && (
        <ModalNotice
          notice={selectedNotice}
          onClose={() => setNoticeOpen(false)}
          onFavoriteToggle={(notice) => toggleFavoriteById(notice._id)}
          isFavorite={favorites.includes(selectedNotice._id)}
        />
      )}
    </>
  );
}
