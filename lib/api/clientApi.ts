import { isAxiosError } from "axios";
import { nextServer } from "./api";
import { FetchFriendsResponse } from "@/types/friends";
import { FetchNewsParams, FetchNewsResponse } from "@/types/news";
import {
  Category,
  City,
  FetchPetsResponse,
  PetsFilters,
  PetsQueryParams,
  Sex,
  Species,
} from "@/types/pets";
import { api } from "@/app/api/api";

//friends
export async function fetchFriendsClient(): Promise<FetchFriendsResponse> {
  try {
    const { data } = await nextServer.get<FetchFriendsResponse>("/friends");
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        return [];
      }

      throw new Error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Fetching friends failed",
      );
    }
    throw new Error("Fetching friends failed");
  }
}

//news
export async function fetchNewsClient(
  keyword?: string,
  page = 1,
  perPage = 6,
): Promise<FetchNewsResponse> {
  try {
    const params: FetchNewsParams = {
      page,
      limit: perPage,
      ...(keyword ? { keyword: keyword.trim() } : {}),
    };

    const { data } = await nextServer.get<FetchNewsResponse>("/news", {
      params,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Fetching news failed");
    }
    throw new Error("Fetching news failed");
  }
}

//pets
export async function fetchPetsClient(
  filters: PetsFilters,
  page = 1,
  perPage = 6,
): Promise<FetchPetsResponse> {
  try {
    const params: PetsQueryParams = {
      page,
      limit: perPage,
      ...filters,
    };

    const { data } = await nextServer.get<FetchPetsResponse>("/notices", {
      params,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Fetching pets failed");
    }
    throw new Error("Fetching pets failed");
  }
}

//category
export async function getCategories(): Promise<Category[]> {
  const { data } = await nextServer.get<Category[]>("/notices/categories");
  return data;
}

// sex
export async function getSex(): Promise<Sex[]> {
  const { data } = await nextServer.get<Sex[]>("/notices/sex");
  return data;
}

// species
export async function getSpecies(): Promise<Species[]> {
  const { data } = await nextServer.get<Species[]>("/notices/species");
  return data;
}

// locations
export async function getAllLocations(): Promise<City[]> {
  const { data } = await nextServer.get<City[]>("/cities/locations");
  return data;
}

// location search
export async function searchCities(keyword: string): Promise<City[]> {
  const { data } = await nextServer.get<City[]>("/cities", {
    params: { keyword },
  });
  return data;
}
