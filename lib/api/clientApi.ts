import { isAxiosError } from "axios";
import { nextServer } from "./api";
import { FetchFriendsResponse } from "@/types/friends";
import { FetchNewsParams, FetchNewsResponse } from "@/types/news";
import {
  AddPetRequest,
  AddPetResponse,
  Category,
  City,
  FavoritesResponse,
  FetchPetsResponse,
  GetNoticeResponse,
  PetsFilters,
  PetsQueryParams,
  Sex,
  Species,
} from "@/types/pets";
import { AuthResponse, SignInRequest, SignUpRequest } from "@/types/auth";
import {
  ApiErrorResponse,
  CurrentUserResponse,
  EditUserRequest,
  EditUserResponse,
} from "@/types/user";
import { useAuthStore } from "../store/authStore";

//auth
export async function signUpUser(data: SignUpRequest) {
  try {
    const res = await nextServer.post<AuthResponse>("/users/signup", data);
    return res.data;
  } catch (error) {
    if (isAxiosError<ApiErrorResponse>(error)) {
      const apiData = error.response?.data;

      const message =
        apiData?.message ||
        apiData?.error ||
        error.message ||
        "Registration failed";

      throw new Error(message);
    }

    throw new Error("Registration failed");
  }
}

export async function signInUser(data: SignInRequest) {
  try {
    const res = await nextServer.post<AuthResponse>("/users/signin", data);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.error || error.response?.data || "Login failed";

      throw new Error(message);
    }

    throw new Error("Login failed");
  }
}

export async function signOutUser(token: string) {
  const res = await nextServer.post(
    "/users/signout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
}

export async function getCurrentUser(token: string) {
  const res = await nextServer.get<CurrentUserResponse>("/users/current", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function getCurrentUserFull(token: string) {
  const res = await nextServer.get("/users/current/full", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function editUser(data: EditUserRequest) {
  const token = useAuthStore.getState().token;

  const res = await nextServer.patch<EditUserResponse>(
    "/users/current/edit",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
}

export async function addPet(data: AddPetRequest) {
  const token = useAuthStore.getState().token;

  const res = await nextServer.post<AddPetResponse>(
    "/users/current/pets/add",
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return res.data;
}

export async function removePet(id: string) {
  const token = useAuthStore.getState().token;

  return nextServer.delete(`/users/current/pets/remove/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

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

export async function getNoticeById(
  id: string,
  token: string,
): Promise<GetNoticeResponse> {
  try {
    const { data } = await nextServer.get<GetNoticeResponse>(`/notices/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    throw new Error(
      extractErrorMessage(error, "Fetching notice details failed"),
    );
  }
}

function extractErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError(error)) {
    const data = error.response?.data as ApiErrorResponse | string | undefined;

    return (
      (typeof data === "object" && data?.message) ||
      (typeof data === "string" ? data : null) ||
      error.message ||
      fallback
    );
  }

  return fallback;
}

export async function addNoticeToFavorites(
  id: string,
  token: string,
): Promise<FavoritesResponse> {
  try {
    const { data } = await nextServer.post<FavoritesResponse>(
      `/notices/favorites/add/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  } catch (error) {
    throw new Error(
      extractErrorMessage(error, "Failed to add notice to favorites"),
    );
  }
}

export async function removeNoticeFromFavorites(
  id: string,
  token: string,
): Promise<FavoritesResponse> {
  try {
    const { data } = await nextServer.delete<FavoritesResponse>(
      `/notices/favorites/remove/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  } catch (error) {
    throw new Error(
      extractErrorMessage(error, "Failed to remove notice from favorites"),
    );
  }
}
