import { NextResponse } from "next/server";
import { api } from "@/app/api/api";
import { isAxiosError } from "axios";

export async function GET(req: Request) {
  try {
    const res = await api.get("/users/current/full");

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
