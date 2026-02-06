import { NextResponse } from "next/server";
import { api } from "@/app/api/api";
import { isAxiosError } from "axios";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const res = await api.patch("/users/current/edit", body);

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
