import { NextRequest, NextResponse } from "next/server";
import { api } from "../../../../api";
import { isAxiosError } from "axios";
import { ApiErrorResponse } from "@/types/auth";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    const res = await api.delete(`/notices/favorites/remove/${id}`);

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError<ApiErrorResponse>(error)) {
      const status = error.response?.status || 500;

      const data = error.response?.data;

      const message =
        data?.message || data?.error || error.message || "Unknown error";

      return NextResponse.json({ message }, { status });
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
