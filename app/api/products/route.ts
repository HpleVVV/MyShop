import { z } from "zod";
import { db } from "@/lib/db";
import { contextFrom, jsonError, serialize } from "@/lib/api";
import { NextRequest } from "next/server";

const productSchema = z.object({
  name: z.string().trim().min(1).max(180),
  categoryId: z.string().uuid().optional().nullable(),
  supplierId: z.string().uuid().optional().nullable(),
  barcode: z.string().trim().max(80).optional().nullable(),
  unit: z.enum(["PIECE", "PACK", "BOTTLE", "BOX"]).default("PIECE"),
  costPriceMinor: z.coerce.bigint().nonnegative(),
  sellingPriceMinor: z.coerce.bigint().nonnegative(),
  currentQuantity: z.coerce.number().int().nonnegative().default(0),
  minimumQuantity: z.coerce.number().int().nonnegative().default(0),
  expiryDate: z.coerce.date().optional().nullable(),
});

export async function GET(request: NextRequest) {
  const { storeId } = contextFrom(request);
  if (!storeId) return jsonError("Thiếu x-store-id.", 401, "UNAUTHORIZED");
  const query = request.nextUrl.searchParams.get("q")?.trim();
  const products = await db.product.findMany({
    where: { storeId, ...(query ? { OR: [{ name: { contains: query, mode: "insensitive" } }, { barcode: query }] } : {}) },
    orderBy: { name: "asc" },
    take: 100,
  });
  return Response.json(serialize(products));
}

export async function POST(request: NextRequest) {
  const { storeId } = contextFrom(request);
  if (!storeId) return jsonError("Thiếu x-store-id.", 401, "UNAUTHORIZED");
  const parsed = productSchema.safeParse(await request.json());
  if (!parsed.success) return jsonError(parsed.error.issues[0]?.message ?? "Dữ liệu sản phẩm không hợp lệ.");
  const product = await db.product.create({ data: { ...parsed.data, storeId } });
  return Response.json(serialize(product), { status: 201 });
}
