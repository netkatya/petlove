import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";

import { isAxiosError } from "axios";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const keyword = searchParams.get("keyword") || undefined;
    const page = Number(request.nextUrl.searchParams.get("page") ?? 1);
    const perPage = Number(request.nextUrl.searchParams.get("perPage") ?? 6);

    const res = await api("/news", {
      params: {
        keyword,
        page,
        perPage,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        return NextResponse.json(
          { error: "News service not found" },
          { status: 404 },
        );
      }
      if (isAxiosError(error)) {
        return NextResponse.json(
          { error: error.message, response: error.response?.data },
          { status: error.response?.status ?? 500 },
        );
      }

      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    }
  }
}
