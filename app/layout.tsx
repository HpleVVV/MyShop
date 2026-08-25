import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyShop // Operations Node",
  description: "Quản lý cửa hàng tạp hóa MyShop",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
