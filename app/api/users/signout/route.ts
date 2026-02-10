import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { isAxiosError } from "axios";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    const res = await api.post(
      "/users/signout",
      {},
      {
        headers: authHeader ? { Authorization: authHeader } : {},
      },
    );

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.response?.data || error.message,
        },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
