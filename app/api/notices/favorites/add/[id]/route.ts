import { NextRequest, NextResponse } from "next/server";
import { api } from "../../../../api";
import { isAxiosError } from "axios";
import { ApiErrorResponse } from "@/types/user";

type Props = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;

    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }

    const res = await api.post(`/notices/favorites/add/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status || 500;

      const data = error.response?.data as
        | ApiErrorResponse
        | string
        | undefined;

      let message: string | undefined;

      if (typeof data === "string") {
        message = data;
      } else if (typeof data === "object" && data !== null) {
        message = data.message || data.error;
      }

      return NextResponse.json(
        { message: message || "Failed to add notice to favorites" },
        { status },
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
