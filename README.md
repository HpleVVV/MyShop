# MyShop

Hệ thống quản lý cửa hàng tạp hóa, gồm dashboard, sản phẩm, tồn kho và bán hàng.

## Chạy PostgreSQL local

```powershell
docker compose up -d
Copy-Item .env.example .env
npm run db:migrate -- --name init
npm run db:seed
npm run dev
```

Mở `http://localhost:3000`.

## API development headers

Các API hiện yêu cầu context tạm thời qua headers:

- `x-store-id`: UUID cửa hàng
- `x-user-id`: UUID người dùng cho thao tác ghi

Ví dụ:

```powershell
Invoke-RestMethod http://localhost:3000/api/products -Headers @{ 'x-store-id' = '00000000-0000-0000-0000-000000000001' }
```

Trong bước tiếp theo, các headers này sẽ được thay bằng session Auth.js.

## API routes

- `GET/POST /api/products`
- `GET/POST /api/inventory`
- `GET/POST /api/sales`
- `GET /api/dashboard`

Bán hàng, trả hàng và điều chỉnh tồn phải dùng transaction database để tránh tồn kho âm hoặc lệch dữ liệu.
