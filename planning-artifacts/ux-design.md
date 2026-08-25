# UX Design Specification: MyShop

**Sản phẩm:** MyShop - Hệ thống quản lý cửa hàng tạp hóa
**Phiên bản:** MVP 1.0
**Ngôn ngữ giao diện:** Tiếng Việt
**Định hướng:** Neo-Brutalist Cybernetics kết hợp Glassmorphism

## 1. Tầm nhìn trải nghiệm

MyShop là một trung tâm điều hành nhỏ gọn cho cửa hàng tạp hóa: mọi thông tin quan trọng phải được đọc nhanh, thao tác phải chắc chắn và trạng thái hệ thống phải luôn rõ ràng. Giao diện mang cảm giác công cụ chuyên nghiệp thế hệ mới, nhưng không để phong cách futuristic làm chậm việc bán hàng tại quầy.

Nguyên tắc ưu tiên:

- **Bán hàng trước:** màn hình bán hàng mở nhanh, tìm sản phẩm rõ ràng, tổng tiền luôn hiện diện.
- **Trạng thái có thể đọc trong một giây:** tồn thấp, giao dịch thành công, lỗi thanh toán và trạng thái đồng bộ dùng màu và nhãn nhất quán.
- **Thông tin dày nhưng có trật tự:** dùng lưới, cột số liệu, bảng và panel thay cho các thẻ trang trí lớn.
- **Không mất ngữ cảnh:** chi tiết sản phẩm, giao dịch hoặc biến động tồn mở trong inspector bên phải.
- **Có thể dùng bằng bàn phím:** phù hợp với thu ngân thao tác liên tục.

## 2. Chuyển hóa concept tham chiếu sang MyShop

| Concept tham chiếu | Cách áp dụng cho MyShop |
|---|---|
| Node graph workflow | Bản đồ vận hành trên dashboard: Nhập kho -> Tồn kho -> Bán hàng -> Doanh thu; các điểm cảnh báo là sản phẩm tồn thấp và giao dịch cần xử lý |
| Vision / Text / Logic / Action nodes | Các module nghiệp vụ: Sản phẩm, Tồn kho, Bán hàng, Báo cáo |
| Kinetic data pipelines | Đường xu hướng doanh thu, dòng biến động tồn và chỉ báo cập nhật trực tiếp |
| Inspector panel | Panel chi tiết cho sản phẩm, giao dịch, khách hàng và biến động kho |
| Model metrics | Chỉ số cửa hàng: doanh thu, số giao dịch, lợi nhuận gộp ước tính, giá trị tồn kho |
| Raw JSON blocks | Chế độ chi tiết kỹ thuật tùy chọn cho dữ liệu giao dịch và lịch sử thao tác, chỉ dành cho chủ cửa hàng |
| Simulation controls | Thanh thao tác nhanh: Bán hàng mới, Nhập kho, Điều chỉnh tồn, Xuất báo cáo |

## 3. Kiến trúc thông tin

### Điều hướng chính

- **Tổng quan** (`/dashboard`)
- **Bán hàng** (`/sales`)
- **Sản phẩm** (`/products`)
- **Tồn kho** (`/inventory`)
- **Khách hàng** (`/customers`)
- **Báo cáo** (`/reports`)
- **Thiết lập** (`/settings`, chỉ chủ cửa hàng)

Điều hướng bên trái luôn hiển thị trên desktop. Trên màn hình hẹp, chuyển thành thanh điều hướng dưới cùng với năm mục chính và menu thêm cho sản phẩm, tồn kho, khách hàng, báo cáo.

## 4. Bố cục ứng dụng

### 4.1. Thanh đầu trang nổi

Thanh đầu trang dạng module kính mờ, cao khoảng 56px:

- Logo chữ **MYSHOP / OPS NODE**.
- Breadcrumb hoặc tên màn hình hiện tại.
- Chỉ báo `SYNC ONLINE`.
- Chỉ báo latency, ví dụ `24ms`.
- Badge vai trò: `OWNER` hoặc `CASHIER`.
- Ngày và giờ hiện tại.
- Avatar/menu tài khoản.

Các badge telemetry là thông tin hỗ trợ, không được lấn át doanh thu hoặc thao tác bán hàng.

### 4.2. Thanh điều hướng trái

- Rộng khoảng 216px trên desktop.
- Mỗi mục có icon Lucide, tên tiếng Việt và phím tắt nếu có.
- Mục hiện tại dùng viền hyper-lime 1px và nền indigo rất nhẹ.
- Badge số lượng hiển thị bên cạnh `Tồn kho` khi có sản phẩm tồn thấp.
- Cuối thanh hiển thị trạng thái cửa hàng và người dùng hiện tại.

### 4.3. Canvas chính

- Nền obsidian với pattern lưới rất nhẹ.
- Nội dung nằm trong lưới 12 cột, khoảng cách 16-24px.
- Panel dùng nền kính mờ, viền 1px, góc bo tối đa 8px.
- Không dùng card lồng trong card.
- Bảng dữ liệu trải rộng theo chiều ngang thay vì nhồi nhiều card nhỏ.

### 4.4. Inspector panel bên phải

Inspector rộng 320-400px, mở bằng click vào một dòng, node hoặc số liệu:

- Header gồm tên đối tượng, trạng thái và nút đóng.
- Các nhóm có thể thu gọn: Tổng quan, Chi tiết, Lịch sử, Dữ liệu.
- Dùng tab cho `Tóm tắt`, `Lịch sử`, `Dữ liệu thô`.
- Dữ liệu thô hiển thị JSON có syntax highlighting, chỉ dành cho chủ cửa hàng.
- Trên mobile, inspector mở thành bottom sheet toàn màn hình có handle kéo.

### 4.5. Thanh điều khiển đáy

Thanh cố định ở cuối canvas, nền kính mờ:

- Nút chính `BÁN HÀNG MỚI` với nền hyper-lime và chữ obsidian.
- `NHẬP KHO`.
- `ĐIỀU CHỈNH TỒN`.
- Bộ lọc thời gian.
- `XUẤT BÁO CÁO`.
- Khu vực trạng thái thao tác cuối cùng.

Thanh chỉ hiển thị hành động phù hợp với vai trò. Trên mobile, hành động chính là nút nổi dạng icon + nhãn ngắn, các hành động còn lại ở menu.

## 5. Màn hình dashboard

### Bố cục desktop

1. Tiêu đề `TỔNG QUAN VẬN HÀNH` và thời gian báo cáo.
2. Hàng telemetry gồm:
   - Doanh thu hôm nay.
   - Giao dịch hôm nay.
   - Lợi nhuận gộp ước tính.
   - Giá trị tồn kho.
3. Canvas vận hành dạng node flow:
   - `NHẬP KHO` nối tới `TỒN KHO`.
   - `TỒN KHO` nối tới `BÁN HÀNG`.
   - `BÁN HÀNG` nối tới `DOANH THU`.
   - Mỗi node hiển thị số liệu chính và trạng thái.
4. Biểu đồ doanh thu theo ngày với đường neon mảnh và vùng nền trong suốt.
5. Hai bảng cạnh nhau:
   - Sản phẩm tồn thấp.
   - Giao dịch gần đây.

Node flow là lớp tóm tắt có thể click, không phải nơi duy nhất để thao tác. Mọi hành động chính đều có lối vào rõ ràng từ điều hướng hoặc thanh đáy.

### Trạng thái dashboard

- **Bình thường:** chỉ báo xanh-lục, đường dữ liệu chuyển động rất nhẹ.
- **Cần chú ý:** hyper-lime cho tồn thấp hoặc dữ liệu cần hành động.
- **Lỗi:** đỏ cam, luôn có thông báo bằng chữ và hành động khắc phục.
- **Đang tải:** skeleton theo đúng kích thước nội dung, không nhảy layout.
- **Không có dữ liệu:** empty state ngắn với nút `TẠO SẢN PHẨM` hoặc `NHẬP KHO`.

## 6. Màn hình bán hàng

Đây là màn hình ưu tiên hiệu năng, không dùng node graph làm layout chính.

### Bố cục

- Cột trái 60-65%: ô tìm kiếm lớn, nút quét mã vạch, kết quả sản phẩm và giỏ hàng.
- Cột phải 35-40%: tổng tiền, giảm giá, khách hàng, phương thức thanh toán và nút xác nhận.
- Ô tìm kiếm tự focus khi mở màn hình.
- Kết quả hiển thị tên, mã vạch, giá bán và tồn khả dụng.
- Giỏ hàng hiển thị sản phẩm, đơn giá, stepper số lượng, thành tiền và nút xóa.
- Nút `THANH TOÁN` luôn nhìn thấy, có tổng tiền lớn và tương phản cao.

### Luồng thanh toán

1. Mở `Bán hàng mới`; con trỏ focus vào tìm kiếm.
2. Tìm hoặc quét mã vạch.
3. Chọn sản phẩm, chỉnh số lượng.
4. Hệ thống kiểm tra tồn ngay khi số lượng thay đổi.
5. Chọn khách hàng nếu cần.
6. Chọn `Tiền mặt`, `Thẻ` hoặc `Thanh toán di động` bằng segmented control.
7. Xác nhận thanh toán.
8. Hiển thị biên lai thành công và các hành động `IN`, `TẢI XUỐNG`, `GIAO DỊCH MỚI`.

### Phím tắt đề xuất

- `F2`: focus tìm sản phẩm.
- `F4`: mở giao dịch mới.
- `Ctrl+Enter`: thanh toán.
- `Esc`: đóng inspector hoặc hộp thoại.
- `Delete`: xóa dòng đang chọn sau khi xác nhận.

Không hiển thị các phím tắt như nội dung trang; chúng xuất hiện trong tooltip và command menu.

## 7. Màn hình sản phẩm

- Header có nút `THÊM SẢN PHẨM`.
- Bảng gồm tên, danh mục, mã vạch, giá bán, tồn kho, mức tối thiểu, trạng thái.
- Bộ lọc dạng segmented control cho `Tất cả`, `Đang bán`, `Ngừng bán`, `Tồn thấp`.
- Panel thêm/sửa bên phải, không chuyển trang khỏi danh sách.
- Giá vốn và ngưỡng tồn có input số rõ ràng.
- Trạng thái hoạt động dùng toggle.
- Sản phẩm ngừng bán vẫn hiển thị trong lịch sử và có watermark trạng thái.

## 8. Màn hình tồn kho

- Header gồm các nút `NHẬP KHO` và `ĐIỀU CHỈNH`.
- Dòng cảnh báo đầu trang cho sản phẩm ở mức tồn thấp.
- Bảng tồn kho gồm sản phẩm, tồn hiện tại, mức tối thiểu, trạng thái, cập nhật gần nhất.
- Thanh số lượng trong mỗi dòng dùng màu theo ngưỡng, không chỉ dựa vào màu mà có nhãn chữ.
- Tab `Tổng quan` và `Lịch sử biến động`.
- Khi chọn một dòng, inspector hiển thị lịch sử nhập, bán, trả và điều chỉnh.

## 9. Màn hình khách hàng

- Tìm kiếm theo tên hoặc số điện thoại.
- Bảng tối giản gồm khách hàng, số giao dịch, lần mua gần nhất.
- Panel chi tiết hiển thị thông tin liên hệ và lịch sử mua hàng.
- Nút tạo khách hàng dùng icon + nhãn rõ ràng.
- Giao dịch khách vãng lai không tạo bản ghi khách hàng.

## 10. Màn hình báo cáo

- Bộ chọn khoảng thời gian dạng segmented control: `Hôm nay`, `7 ngày`, `30 ngày`, `Tùy chọn`.
- Biểu đồ doanh thu và lợi nhuận gộp.
- Bảng sản phẩm bán chạy.
- Bảng giá trị tồn kho.
- Bảng biến động tồn.
- Nút xuất/in ở thanh điều khiển đáy.
- Chủ cửa hàng thấy toàn bộ báo cáo; thu ngân chỉ thấy báo cáo được cấp quyền.

## 11. Hệ thống thị giác

### Màu sắc

```css
--obsidian: #0B0C10;
--surface: #12151C;
--surface-raised: #191D26;
--line: #2B3442;
--electric-indigo: #6366F1;
--hyper-lime: #C7F000;
--text-primary: #F3F5F7;
--text-secondary: #9AA5B1;
--success: #42E8A0;
--warning: #FFCB66;
--danger: #FF6B5E;
```

- Obsidian là nền chính, không dùng nền đen tuyệt đối.
- Indigo dành cho cấu trúc, liên kết, focus và các node nghiệp vụ.
- Hyper-lime dành cho hành động chính, trạng thái cần xử lý và điểm nhấn số liệu.
- Success, warning và danger phải có icon hoặc nhãn đi cùng màu.
- Tránh gradient tím chiếm toàn bộ màn hình; chỉ dùng glow nhỏ ở đường nối, focus và biểu đồ.

### Typography

- Display: `Space Grotesk`, fallback sans-serif hình học.
- Telemetry và dữ liệu: `IBM Plex Mono`, fallback monospace.
- Nội dung: `DM Sans`, fallback sans-serif.
- Tiêu đề dùng chữ hoa có kiểm soát, không dùng letter spacing âm.
- Số liệu lớn dùng IBM Plex Mono để các chữ số thẳng hàng.

### Hình học và hiệu ứng

- Viền 1px, góc bo tối đa 8px.
- Frosted glass có độ trong vừa phải, bảo đảm độ tương phản văn bản.
- Pattern lưới nền 40px với opacity thấp.
- Glow chỉ dùng cho trạng thái, focus và đường dữ liệu.
- Không dùng các khối orb/bokeh trang trí.

## 12. Chuyển động

- Khi mở trang: tiêu đề, telemetry và bảng xuất hiện theo stagger 40ms.
- Đường dữ liệu trong dashboard có chuyển động chậm, tắt được ở chế độ giảm chuyển động.
- Inspector trượt vào trong 180ms.
- Thành công khi thanh toán dùng một pulse hyper-lime ngắn.
- Không dùng animation liên tục trong màn hình bán hàng nếu gây mất tập trung.
- Tôn trọng `prefers-reduced-motion`.

## 13. Thành phần tương tác

- Dùng icon Lucide cho tìm kiếm, quét mã, lọc, chỉnh sửa, xóa, đóng, in và tải xuống.
- Mọi icon button phải có tooltip.
- Nút chính luôn có icon và nhãn khi không hiển nhiên.
- Segmented control cho khoảng thời gian và phương thức thanh toán.
- Toggle cho trạng thái hoạt động.
- Stepper cho số lượng sản phẩm.
- Modal chỉ dùng cho xác nhận nguy hiểm hoặc thanh toán; panel dùng cho chỉnh sửa thường ngày.
- Toast dùng cho kết quả ngắn, còn lỗi cần xử lý phải xuất hiện gần trường hoặc thao tác gây lỗi.

## 14. Responsive và khả năng tiếp cận

- Desktop quầy thu ngân: tối ưu từ 1280px trở lên.
- Tablet: từ 768px, chuyển inspector thành panel nổi và rút gọn điều hướng.
- Mobile: một cột, thanh điều hướng dưới, giỏ hàng và thanh toán dùng bottom sheet.
- Vùng chạm tối thiểu 44x44px.
- Không truyền đạt trạng thái chỉ bằng màu.
- Focus keyboard phải có outline hyper-lime rõ ràng.
- Văn bản và số liệu đạt tương phản WCAG AA.
- Bảng có phiên bản responsive: ưu tiên cột quan trọng, phần còn lại ở inspector.
- Nội dung dài phải xuống dòng hoặc cuộn, không được chồng lấn.

## 15. Trạng thái và lỗi quan trọng

- Tìm kiếm không có kết quả: `Không tìm thấy sản phẩm phù hợp` và nút thêm sản phẩm nếu người dùng là chủ cửa hàng.
- Tồn không đủ: khóa thanh toán, đánh dấu dòng lỗi và hiển thị số lượng còn lại.
- Mã vạch trùng: từ chối lưu và đưa focus về trường mã vạch.
- Giao dịch gửi lặp: vô hiệu hóa nút trong lúc xử lý và dùng mã idempotency.
- Mất kết nối: hiển thị `OFFLINE / CHỜ ĐỒNG BỘ`, không giả vờ hoàn tất giao dịch.
- Hết phiên đăng nhập: giữ dữ liệu chưa gửi nếu có thể và yêu cầu đăng nhập lại.
- Trả hàng vượt số lượng đã bán: khóa xác nhận và hiển thị giới hạn cho phép.

## 16. Definition of Done cho UX

- Luồng bán hàng hoàn tất được thiết kế cho desktop, tablet và mobile.
- Dashboard thể hiện đủ doanh thu, giao dịch, lợi nhuận ước tính, tồn thấp và giao dịch gần đây.
- Product, inventory, customer và report có trạng thái loading, empty, success và error.
- Quyền owner/cashier được thể hiện trong điều hướng và hành động.
- Inspector có thiết kế cho chi tiết sản phẩm, giao dịch và biến động tồn.
- Màu, typography, motion và spacing dùng token thống nhất.
- Không có text hoặc control bị chồng lấn ở viewport desktop và mobile.
- Prototype cần được kiểm tra bằng dữ liệu mẫu trước khi chuyển sang kiến trúc và triển khai.
