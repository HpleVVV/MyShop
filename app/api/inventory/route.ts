import { z } from "zod";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { contextFrom, jsonError, serialize } from "@/lib/api";

const movementSchema = z.object({
  productId: z.string().uuid(),
  quantityDelta: z.coerce.number().int().refine((value) => value !== 0, "Số lượng không được bằng 0."),
  reason: z.string().trim().max(255).optional(),
});

export async function GET(request: NextRequest) {
  const { storeId } = contextFrom(request);
  if (!storeId) return jsonError("Thiếu x-store-id.", 401, "UNAUTHORIZED");
  const movements = await db.stockMovement.findMany({ where: { storeId }, include: { product: { select: { name: true, unit: true } } }, orderBy: { createdAt: "desc" }, take: 100 });
  return Response.json(serialize(movements));
}

export async function POST(request: NextRequest) {
  const { storeId, userId } = contextFrom(request);
  if (!storeId || !userId) return jsonError("Thiếu x-store-id hoặc x-user-id.", 401, "UNAUTHORIZED");
  const parsed = movementSchema.safeParse(await request.json());
  if (!parsed.success) return jsonError(parsed.error.issues[0]?.message ?? "Dữ liệu tồn kho không hợp lệ.");
  const movement = await db.$transaction(async (tx) => {
    const product = await tx.product.findFirst({ where: { id: parsed.data.productId, storeId } });
    if (!product) throw new Error("PRODUCT_NOT_FOUND");
    const nextQuantity = product.currentQuantity + parsed.data.quantityDelta;
    if (nextQuantity < 0) throw new Error("INSUFFICIENT_STOCK");
    const updated = await tx.product.update({ where: { id: product.id }, data: { currentQuantity: nextQuantity } });
    const created = await tx.stockMovement.create({ data: { storeId, productId: product.id, performedById: userId, type: parsed.data.quantityDelta > 0 ? "PURCHASE" : "ADJUSTMENT_OUT", quantityDelta: parsed.data.quantityDelta, quantityBefore: product.currentQuantity, quantityAfter: nextQuantity, reason: parsed.data.reason } });
    return { product: updated, movement: created };
  }).catch((error: Error) => { throw error; });
  return Response.json(serialize(movement), { status: 201 });
}
