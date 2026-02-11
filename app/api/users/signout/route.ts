import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";
import { isAxiosError } from "axios";

export async function POST(request: NextRequest) {
  try {
    let token =
      request.headers.get("authorization")?.replace("Bearer ", "") || "";

    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get("token")?.value || "";
    }

    await api.post(
      "/users/signout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const response = NextResponse.json({ success: true });

    response.cookies.delete("token");

    return response;
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
