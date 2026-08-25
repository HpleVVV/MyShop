import { z } from "zod";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { contextFrom, jsonError, serialize } from "@/lib/api";

const saleSchema = z.object({
  customerId: z.string().uuid().optional().nullable(),
  paymentMethod: z.enum(["CASH", "CARD", "MOBILE"]),
  discountMinor: z.coerce.bigint().nonnegative().default(0n),
  items: z.array(z.object({ productId: z.string().uuid(), quantity: z.coerce.number().int().positive() })).min(1),
});

export async function GET(request: NextRequest) {
  const { storeId } = contextFrom(request);
  if (!storeId) return jsonError("Thiếu x-store-id.", 401, "UNAUTHORIZED");
  const sales = await db.sale.findMany({ where: { storeId }, include: { items: true, customer: true }, orderBy: { createdAt: "desc" }, take: 100 });
  return Response.json(serialize(sales));
}

export async function POST(request: NextRequest) {
  const { storeId, userId } = contextFrom(request);
  if (!storeId || !userId) return jsonError("Thiếu x-store-id hoặc x-user-id.", 401, "UNAUTHORIZED");
  const parsed = saleSchema.safeParse(await request.json());
  if (!parsed.success) return jsonError(parsed.error.issues[0]?.message ?? "Dữ liệu bán hàng không hợp lệ.");
  try {
    const sale = await db.$transaction(async (tx) => {
      const uniqueItems = new Map<string, number>();
      for (const item of parsed.data.items) uniqueItems.set(item.productId, (uniqueItems.get(item.productId) ?? 0) + item.quantity);
      const productIds = [...uniqueItems.keys()];
      const products = await tx.$queryRaw<Array<{ id: string; name: string; unit: string; costPriceMinor: bigint; sellingPriceMinor: bigint; currentQuantity: number }>>`
        SELECT "id", "name", "unit", "cost_price_minor" AS "costPriceMinor", "selling_price_minor" AS "sellingPriceMinor", "current_quantity" AS "currentQuantity"
        FROM "Product" WHERE "store_id" = ${storeId}::uuid AND "id" IN (${productIds.map((id) => id)}::uuid[]) AND "is_active" = true FOR UPDATE`;
      if (products.length !== productIds.length) throw new Error("PRODUCT_NOT_FOUND");
      const byId = new Map(products.map((product) => [product.id, product]));
      const items = productIds.map((productId) => {
        const product = byId.get(productId)!;
        const quantity = uniqueItems.get(productId)!;
        if (product.currentQuantity < quantity) throw new Error("INSUFFICIENT_STOCK");
        return { product, quantity, lineTotalMinor: product.sellingPriceMinor * BigInt(quantity) };
      });
      const subtotalMinor = items.reduce((sum, item) => sum + item.lineTotalMinor, 0n);
      if (parsed.data.discountMinor > subtotalMinor) throw new Error("INVALID_DISCOUNT");
      const receiptNumber = `MS-${Date.now().toString(36).toUpperCase()}`;
      const created = await tx.sale.create({ data: { storeId, receiptNumber, customerId: parsed.data.customerId, createdById: userId, status: "COMPLETED", paymentMethod: parsed.data.paymentMethod, subtotalMinor, discountMinor: parsed.data.discountMinor, taxMinor: 0n, totalMinor: subtotalMinor - parsed.data.discountMinor, completedAt: new Date(), items: { create: items.map(({ product, quantity, lineTotalMinor }) => ({ productId: product.id, productNameSnapshot: product.name, unitSnapshot: product.unit, costPriceMinor: product.costPriceMinor, sellingPriceMinor: product.sellingPriceMinor, quantity, lineTotalMinor })) } } });
      for (const { product, quantity } of items) {
        await tx.product.update({ where: { id: product.id }, data: { currentQuantity: { decrement: quantity } } });
        await tx.stockMovement.create({ data: { storeId, productId: product.id, performedById: userId, saleId: created.id, type: "SALE", quantityDelta: -quantity, quantityBefore: product.currentQuantity, quantityAfter: product.currentQuantity - quantity } });
      }
      return created;
    });
    return Response.json(serialize(sale), { status: 201 });
  } catch (error) {
    const code = error instanceof Error ? error.message : "SALE_FAILED";
    if (code === "INSUFFICIENT_STOCK") return jsonError("Sản phẩm không đủ số lượng tồn.", 409, code);
    if (code === "PRODUCT_NOT_FOUND") return jsonError("Sản phẩm không tồn tại hoặc đã ngừng bán.", 404, code);
    if (code === "INVALID_DISCOUNT") return jsonError("Giảm giá không được lớn hơn tiền hàng.", 400, code);
    throw error;
  }
}
