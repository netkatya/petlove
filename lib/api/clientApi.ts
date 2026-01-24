import { isAxiosError } from "axios";
import { nextServer } from "./api";
import { FetchFriendsResponse } from "@/types/friends";
import { FetchNewsParams, FetchNewsResponse } from "@/types/news";

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
