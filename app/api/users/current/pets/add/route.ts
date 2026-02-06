import { api } from "@/app/api/api";
import { isAxiosError } from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await api.post("/users/current/pets/add", body);

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
