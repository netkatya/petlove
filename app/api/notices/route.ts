import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";
import { isAxiosError } from "axios";
import { FetchPetsResponse, PetsQueryParams } from "@/types/pets";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const params: PetsQueryParams = {
      keyword: searchParams.get("keyword") || undefined,
      page: Number(searchParams.get("page") ?? 1),
      limit: Number(searchParams.get("perPage") ?? 6),
      category:
        (searchParams.get("category") as PetsQueryParams["category"]) ||
        undefined,
      sex: (searchParams.get("sex") as PetsQueryParams["sex"]) || undefined,
      species:
        (searchParams.get("species") as PetsQueryParams["species"]) ||
        undefined,
    };

    const res = await api.get<FetchPetsResponse>("/notices", { params });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? 500;

      if (status === 404) {
        return NextResponse.json(
          { error: "Notices not found" },
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        { status },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
