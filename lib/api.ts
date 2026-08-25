import type { NextRequest } from "next/server";

export function contextFrom(request: NextRequest) {
  return {
    storeId: request.headers.get("x-store-id"),
    userId: request.headers.get("x-user-id"),
  };
}

export function jsonError(message: string, status = 400, code = "BAD_REQUEST") {
  return Response.json({ error: { code, message } }, { status });
}

export function serialize<T>(value: T): T {
  return JSON.parse(JSON.stringify(value, (_, item) => typeof item === "bigint" ? Number(item) : item));
}
