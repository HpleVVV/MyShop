# Product Brief: MyShop

## 1. Product Summary

MyShop is a simple shop-management system for a single grocery shop that sells packaged products with fixed quantities. It helps the owner or cashier record sales, keep stock accurate, manage products and customers, and quickly understand daily business performance.

## 2. Problem

The shop needs one reliable place to manage products, inventory, sales, and customer information. Manual records make it difficult to know current stock, identify products that need replenishment, track revenue, and understand which products sell best.

## 3. Product Vision

Give a small grocery shop a fast, clear, and dependable daily operating system that reduces manual work and makes important business information visible at a glance.

## 4. Target Users

- Shop owner: manages products, stock, sales, customers, and business reports.
- Cashier: searches products, completes sales, accepts payments, and optionally records customers.

The first release supports one shop and simple role-based access for owner and cashier users.

## 5. Goals

- Record every sale accurately.
- Automatically reduce stock when a sale is completed.
- Make low-stock products easy to identify.
- Provide a quick view of revenue, transactions, and best-selling products.
- Keep checkout simple for packaged products with fixed units.
- Maintain optional customer purchase history.

## 6. MVP Scope

### Dashboard

- Today’s revenue.
- Number of sales transactions.
- Estimated gross profit based on purchase and selling prices.
- Products with low stock.
- Recent sales.
- Sales summary for daily, weekly, and monthly periods.

### Product Management

- Create, view, edit, and deactivate products.
- Store product name, category, barcode, unit, purchase price, selling price, supplier, and minimum stock level.
- Support packaged units such as piece, pack, bottle, and box.
- Search and filter products by name, barcode, and category.

### Stock Management

- View current stock quantity.
- Record stock purchases or stock-in transactions.
- Automatically deduct sold quantities.
- Record manual adjustments for damaged, expired, or missing products.
- Show low-stock alerts when quantity reaches the minimum stock level.
- Keep a stock movement history.

### Sale Management

- Search products by name or barcode.
- Add products and quantities to a sale.
- Calculate subtotals and total amount.
- Support discounts at checkout.
- Record cash, card, and mobile-payment methods.
- Complete and cancel sales.
- Print or display a receipt.
- Support sale returns with stock restoration.

### Customer Management

- Optionally create customer records with name and phone number.
- View customer purchase history.
- Associate a completed sale with a customer.
- Allow anonymous walk-in sales without creating a customer record.

### Reports

- Daily, weekly, and monthly sales reports.
- Revenue and estimated gross-profit reports.
- Best-selling products.
- Inventory quantity and inventory-value summary.
- Stock movement history.

## 7. Key User Flow: Complete a Sale

1. Cashier opens the sales screen.
2. Cashier searches by product name or scans a barcode.
3. Cashier adds products and adjusts quantities.
4. System validates available stock and calculates the total.
5. Cashier optionally selects an existing customer.
6. Cashier selects the payment method and confirms payment.
7. System records the sale, reduces stock, and generates a receipt.

## 8. Business Rules

- Only active products can be added to a new sale.
- A sale cannot be completed when requested quantity exceeds available stock.
- Completing a sale decreases stock by the quantity sold.
- Returning a sale increases stock by the returned quantity.
- Low-stock status is triggered when current quantity is less than or equal to the minimum stock level.
- Customer registration is optional for every sale.
- Products are sold only as fixed packaged units; weight-based sales are not supported.
- The first release supports one shop location.

## 9. Success Measures

- Cashiers can complete a normal sale in under one minute.
- Stock quantity reflects completed sales without manual recalculation.
- The owner can see today’s revenue and low-stock products from the dashboard.
- At least 95% of completed sales have complete product, quantity, price, and payment records.
- The owner can identify the best-selling products for a selected reporting period.

## 10. Out of Scope for MVP

- Selling products by weight.
- Multiple branches or warehouses.
- Supplier purchase-order workflows.
- Full accounting, payroll, or tax filing.
- Online ordering or delivery management.
- Customer loyalty points.
- Complex promotions and bundles.
- Advanced permissions beyond owner and cashier.
- Integration with external payment providers or accounting platforms.

## 11. Open Decisions

- Whether receipts should be printed, downloadable, or displayed only on screen.
- Whether product expiry dates should be tracked in the first release.
- Which currency and tax rules the shop uses.
- Whether the shop needs a barcode scanner integration or manual barcode entry is sufficient.
- Whether cashiers may edit or cancel completed sales.
