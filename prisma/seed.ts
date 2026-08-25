import { PrismaClient, ProductUnit, Role } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const store = await db.store.upsert({ where: { id: "00000000-0000-0000-0000-000000000001" }, update: {}, create: { id: "00000000-0000-0000-0000-000000000001", name: "MyShop Tạp hóa", currencyCode: "VND" } });
  await db.user.upsert({ where: { storeId_email: { storeId: store.id, email: "owner@myshop.local" } }, update: {}, create: { storeId: store.id, name: "Chủ cửa hàng", email: "owner@myshop.local", passwordHash: "replace-before-production", role: Role.OWNER } });
  const categories = await Promise.all(["Đồ uống", "Thực phẩm", "Sữa", "Bánh kẹo", "Gia dụng"].map((name) => db.category.upsert({ where: { storeId_name: { storeId: store.id, name } }, update: {}, create: { storeId: store.id, name } })));
  const sample = [{ name: "Nước suối Aquafina 500ml", category: 0, unit: ProductUnit.BOTTLE, cost: 5000, price: 7000, quantity: 8, minimum: 12 }, { name: "Mì Hảo Hảo tôm chua cay", category: 1, unit: ProductUnit.PACK, cost: 3500, price: 4500, quantity: 64, minimum: 20 }, { name: "Sữa tươi Vinamilk 180ml", category: 2, unit: ProductUnit.BOX, cost: 6500, price: 8500, quantity: 11, minimum: 15 }];
  for (const item of sample) await db.product.create({ data: { storeId: store.id, categoryId: categories[item.category].id, name: item.name, unit: item.unit, costPriceMinor: BigInt(item.cost), sellingPriceMinor: BigInt(item.price), currentQuantity: item.quantity, minimumQuantity: item.minimum } });
}

main().finally(() => db.$disconnect());
