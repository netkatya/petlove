import { NextResponse } from "next/server";
import { api } from "../../api";

export async function GET() {
  try {
    const res = await api.get("/notices/sex");
    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load sex options" },
      { status: 500 },
    );
  }
}
