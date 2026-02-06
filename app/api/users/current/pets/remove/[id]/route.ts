import { api } from "@/app/api/api";
import { isAxiosError } from "axios";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const res = await api.delete(`/users/current/pets/remove/${params.id}`);

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
