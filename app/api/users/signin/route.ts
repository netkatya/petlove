import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { isAxiosError } from "axios";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const res = await api.post("/users/signin", body);

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data;

      let message = "Something went wrong";

      if (status === 400) {
        message = "Invalid request data";
      }

      if (status === 401) {
        message = "Email or password invalid";
      }

      if (status === 404) {
        message = "Service not found";
      }

      if (status === 500) {
        message = "Server error. Please try again later";
      }

      // Если бэкенд вернул свой текст ошибки
      if (typeof data === "string") {
        message = data;
      }

      return NextResponse.json({ error: message }, { status: status || 500 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
