import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { contextFrom, jsonError, serialize } from "@/lib/api";

export async function GET(request: NextRequest) {
  const { storeId } = contextFrom(request);
  if (!storeId) return jsonError("Thiếu x-store-id.", 401, "UNAUTHORIZED");
  const from = new Date();
  from.setHours(0, 0, 0, 0);
  const [sales, products, inventoryValue] = await Promise.all([
    db.sale.aggregate({ where: { storeId, status: { in: ["COMPLETED", "PARTIALLY_RETURNED"] }, completedAt: { gte: from } }, _count: { id: true }, _sum: { totalMinor: true } }),
    db.product.findMany({ where: { storeId, isActive: true }, orderBy: { currentQuantity: "asc" }, take: 100 }),
    db.product.aggregate({ where: { storeId, isActive: true }, _sum: { currentQuantity: true } }),
  ]);
  const lowStockProducts = products.filter((product) => product.currentQuantity <= product.minimumQuantity).slice(0, 10);
  return Response.json(serialize({ revenueMinor: sales._sum.totalMinor ?? 0n, transactions: sales._count.id, inventoryUnits: inventoryValue._sum.currentQuantity ?? 0, lowStockProducts }));
}
