import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";

export async function GET(request: NextRequest) {
  const keyword = request.nextUrl.searchParams.get("keyword");

  try {
    const res = await api.get("/cities", {
      params: { keyword },
    });

    return NextResponse.json(res.data);
  } catch {
    return NextResponse.json(
      { error: "Failed to load cities" },
      { status: 500 },
    );
  }
}
