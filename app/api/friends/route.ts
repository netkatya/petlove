import { NextResponse } from "next/server";
import { api } from "../api";

import { isAxiosError } from "axios";

export async function GET() {
  try {
    const res = await api("/friends");

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        return NextResponse.json(
          { error: "Friends service not found" },
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
