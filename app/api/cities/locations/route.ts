import { NextResponse } from "next/server";
import { api } from "../../api";
import { isAxiosError } from "axios";

export async function GET() {
  try {
    const res = await api.get("/cities/locations");

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? 500;

      if (status === 404) {
        return NextResponse.json(
          { error: "Service not found" },
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          error: error.message || "Failed to load locations",
        },
        { status },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
