import { NextResponse } from "next/server";
import { api } from "../../api";

export async function GET() {
  try {
    const res = await api.get("/notices/species");
    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load species" },
      { status: 500 },
    );
  }
}
