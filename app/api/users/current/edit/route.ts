import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../../api";
import { isAxiosError } from "axios";

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    let token =
      request.headers.get("authorization")?.replace("Bearer ", "") || "";

    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get("token")?.value || "";
    }

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const res = await api.patch("/users/current/edit", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data || error.message },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
