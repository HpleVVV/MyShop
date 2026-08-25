# PRD: MyShop

**Tên sản phẩm:** MyShop - Hệ thống quản lý cửa hàng tạp hóa
**Phiên bản:** 1.0 MVP
**Ngôn ngữ tài liệu:** Tiếng Việt
**Ngày:** 25/08/2026
**Trạng thái:** Bản nháp để xác nhận

## 1. Tổng quan

MyShop là hệ thống quản lý đơn giản dành cho một cửa hàng tạp hóa bán các sản phẩm đóng gói có số lượng cố định. Hệ thống hỗ trợ chủ cửa hàng và thu ngân quản lý sản phẩm, tồn kho, bán hàng, khách hàng và các báo cáo vận hành hằng ngày.

Mục tiêu của phiên bản MVP là thay thế việc ghi chép thủ công bằng quy trình bán hàng nhanh, cập nhật tồn kho tự động và bảng điều khiển dễ theo dõi.

## 2. Vấn đề và cơ hội

Việc quản lý bằng sổ sách hoặc nhiều bảng rời rạc khiến cửa hàng khó biết số lượng tồn thực tế, sản phẩm nào cần nhập thêm, doanh thu trong ngày và sản phẩm bán chạy. Sai sót khi ghi nhận bán hàng cũng làm cho số liệu tồn kho không đáng tin cậy.

MyShop tập trung vào một quy trình đơn giản: tạo danh mục sản phẩm, nhập tồn, bán hàng, tự động trừ tồn và cung cấp số liệu kinh doanh rõ ràng.

## 3. Mục tiêu sản phẩm

- Ghi nhận chính xác mọi giao dịch bán hàng đã hoàn tất.
- Tự động trừ tồn kho theo số lượng bán.
- Hiển thị rõ doanh thu, số giao dịch và sản phẩm sắp hết hàng.
- Cho phép thu ngân hoàn tất một giao dịch thông thường trong dưới một phút.
- Hỗ trợ tra cứu sản phẩm nhanh bằng tên hoặc mã vạch.
- Cho phép lưu thông tin khách hàng khi cần, nhưng không bắt buộc cho giao dịch mua lẻ.
- Cung cấp báo cáo bán hàng và tồn kho cho chủ cửa hàng.

## 4. Phạm vi MVP

### 4.1. Trong phạm vi

- Một cửa hàng và một địa điểm kinh doanh.
- Hai vai trò: chủ cửa hàng và thu ngân.
- Sản phẩm đóng gói, bán theo đơn vị cố định như cái, gói, chai hoặc hộp.
- Quản lý danh mục sản phẩm.
- Quản lý nhập kho, điều chỉnh tồn và lịch sử biến động tồn.
- Bán hàng tại quầy và biên lai.
- Trả hàng và hoàn tồn kho.
- Quản lý khách hàng tùy chọn.
- Dashboard và báo cáo cơ bản.

### 4.2. Ngoài phạm vi

- Sản phẩm bán theo khối lượng.
- Nhiều chi nhánh hoặc nhiều kho.
- Bán chịu, công nợ khách hàng và thu hồi công nợ.
- Đặt hàng trực tuyến, giao hàng hoặc thương mại điện tử.
- Quản lý đơn mua hàng nâng cao với nhà cung cấp.
- Kế toán đầy đủ, tính lương hoặc kê khai thuế.
- Tích điểm khách hàng và chương trình khuyến mãi phức tạp.
- Tích hợp cổng thanh toán bên ngoài.
- Phân quyền chi tiết ngoài vai trò chủ cửa hàng và thu ngân.

## 5. Người dùng và quyền hạn

### 5.1. Chủ cửa hàng

Chủ cửa hàng có thể xem dashboard và báo cáo, quản lý sản phẩm, nhập và điều chỉnh tồn kho, quản lý khách hàng, xem toàn bộ giao dịch và quản lý người dùng thu ngân.

### 5.2. Thu ngân

Thu ngân có thể tra cứu sản phẩm, tạo giao dịch bán hàng, nhận thanh toán, tạo hoặc chọn khách hàng, xem biên lai và thực hiện trả hàng theo chính sách được cửa hàng cho phép.

Thu ngân không được xóa dữ liệu lịch sử, thay đổi giá vốn hoặc thay đổi thiết lập hệ thống nếu chưa được cấp quyền.

## 6. Yêu cầu chức năng

### FR-01: Đăng nhập và vai trò

- Người dùng phải đăng nhập để sử dụng hệ thống.
- Hệ thống phải áp dụng quyền theo vai trò chủ cửa hàng hoặc thu ngân.
- Hệ thống phải ghi nhận người dùng tạo giao dịch và thay đổi tồn kho.

**Tiêu chí chấp nhận:** Người dùng chỉ nhìn thấy và thực hiện được các thao tác thuộc vai trò của mình.

### FR-02: Dashboard

- Hiển thị doanh thu hôm nay.
- Hiển thị số giao dịch hôm nay.
- Hiển thị lợi nhuận gộp ước tính dựa trên giá bán trừ giá vốn.
- Hiển thị danh sách sản phẩm có tồn kho thấp.
- Hiển thị các giao dịch gần đây.
- Cho phép xem tổng hợp theo ngày, tuần và tháng.

**Tiêu chí chấp nhận:** Sau khi giao dịch hoàn tất, doanh thu, số giao dịch và tồn kho trên dashboard được cập nhật theo dữ liệu giao dịch.

### FR-03: Quản lý sản phẩm

Mỗi sản phẩm phải hỗ trợ các thông tin:

- Tên sản phẩm.
- Danh mục.
- Mã vạch, có thể để trống nếu cửa hàng không sử dụng mã vạch.
- Đơn vị đóng gói.
- Giá vốn.
- Giá bán.
- Nhà cung cấp, có thể để trống.
- Số lượng tồn hiện tại.
- Mức tồn tối thiểu.
- Ngày hết hạn, nếu cửa hàng chọn theo dõi.
- Trạng thái hoạt động.

Hệ thống phải cho phép thêm, xem, sửa, tìm kiếm, lọc và ngừng bán sản phẩm. Sản phẩm đã phát sinh giao dịch không được xóa cứng khỏi lịch sử.

**Tiêu chí chấp nhận:** Sản phẩm ngừng hoạt động không thể được thêm vào giao dịch mới nhưng vẫn xuất hiện trong lịch sử giao dịch.

### FR-04: Quản lý tồn kho

- Ghi nhận phiếu nhập hoặc thao tác nhập kho với số lượng dương.
- Tăng tồn kho sau khi nhập kho được xác nhận.
- Ghi nhận điều chỉnh cho sản phẩm hỏng, hết hạn, thất thoát hoặc kiểm kê.
- Hiển thị lịch sử biến động gồm sản phẩm, loại biến động, số lượng, thời gian, người thực hiện và ghi chú.
- Đánh dấu sản phẩm tồn thấp khi tồn hiện tại nhỏ hơn hoặc bằng mức tồn tối thiểu.
- Không cho phép tồn kho âm.

**Tiêu chí chấp nhận:** Mỗi thay đổi tồn kho tạo ra một bản ghi lịch sử và số lượng tồn sau thay đổi được tính nhất quán.

### FR-05: Bán hàng

- Cho phép tìm sản phẩm theo tên hoặc mã vạch.
- Cho phép thêm sản phẩm vào giỏ hàng và thay đổi số lượng.
- Hiển thị đơn giá, số lượng, thành tiền, giảm giá và tổng tiền.
- Không cho phép bán số lượng lớn hơn tồn kho hiện tại.
- Hỗ trợ phương thức thanh toán tiền mặt, thẻ và thanh toán di động.
- Cho phép gắn khách hàng hoặc để giao dịch ở dạng khách vãng lai.
- Khi xác nhận thanh toán, lưu giao dịch và tự động trừ tồn kho.
- Sinh biên lai sau khi giao dịch hoàn tất.
- Cho phép hủy giao dịch chưa hoàn tất.

**Tiêu chí chấp nhận:** Một giao dịch hoàn tất phải lưu đầy đủ sản phẩm, số lượng, đơn giá tại thời điểm bán, tổng tiền, phương thức thanh toán, thời gian và người thực hiện.

### FR-06: Trả hàng

- Cho phép tìm giao dịch đã hoàn tất.
- Cho phép chọn sản phẩm và số lượng cần trả, không vượt quá số lượng đã bán.
- Ghi nhận lý do trả hàng.
- Hoàn lại số lượng vào tồn kho khi trả hàng được xác nhận.
- Lưu liên kết giữa giao dịch trả hàng và giao dịch bán ban đầu.

**Tiêu chí chấp nhận:** Sau khi trả hàng, tồn kho tăng đúng số lượng được trả và báo cáo phản ánh giá trị giao dịch hoàn trả.

### FR-07: Quản lý khách hàng

- Cho phép tạo, sửa và tìm khách hàng.
- Lưu tên và số điện thoại khách hàng.
- Cho phép xem lịch sử mua hàng của từng khách hàng.
- Cho phép gắn khách hàng vào giao dịch.
- Không bắt buộc tạo khách hàng cho giao dịch mua lẻ.

**Tiêu chí chấp nhận:** Giao dịch không gắn khách hàng vẫn hoàn tất bình thường; giao dịch có gắn khách hàng xuất hiện trong lịch sử của khách đó.

### FR-08: Báo cáo

- Báo cáo doanh thu theo ngày, tuần và tháng.
- Báo cáo số lượng giao dịch.
- Báo cáo lợi nhuận gộp ước tính.
- Danh sách sản phẩm bán chạy theo khoảng thời gian.
- Báo cáo số lượng và giá trị tồn kho.
- Báo cáo lịch sử nhập, xuất và điều chỉnh tồn.
- Cho phép lọc theo khoảng thời gian và xuất hoặc in báo cáo khi tính năng được xác nhận.

**Tiêu chí chấp nhận:** Các tổng số trong báo cáo được tính từ giao dịch đã hoàn tất và xử lý đúng giao dịch trả hàng.

## 7. Quy trình chính: hoàn tất bán hàng

1. Thu ngân mở màn hình bán hàng.
2. Thu ngân tìm hoặc quét mã vạch sản phẩm.
3. Thu ngân thêm sản phẩm và điều chỉnh số lượng.
4. Hệ thống kiểm tra tồn kho và tính tổng tiền.
5. Thu ngân tùy chọn chọn khách hàng.
6. Thu ngân chọn phương thức thanh toán.
7. Thu ngân xác nhận giao dịch.
8. Hệ thống lưu giao dịch, trừ tồn kho và hiển thị biên lai.

Nếu tồn kho không đủ, hệ thống phải từ chối xác nhận và chỉ rõ sản phẩm không đủ số lượng.

## 8. Mô hình dữ liệu mức khái niệm

- **User:** người dùng, vai trò, trạng thái tài khoản.
- **Product:** thông tin sản phẩm, giá, đơn vị, mã vạch và mức tồn tối thiểu.
- **Category:** danh mục sản phẩm.
- **Supplier:** thông tin nhà cung cấp cơ bản.
- **Customer:** thông tin khách hàng.
- **Sale:** giao dịch bán hàng, trạng thái, tổng tiền, thanh toán và người tạo.
- **SaleItem:** sản phẩm, số lượng, đơn giá và giảm giá tại thời điểm bán.
- **Return:** giao dịch trả hàng và lý do trả.
- **StockMovement:** biến động nhập, bán, trả hoặc điều chỉnh tồn.

## 9. Yêu cầu phi chức năng

### NFR-01: Hiệu năng

- Màn hình bán hàng phải phản hồi thao tác tìm kiếm thông thường trong tối đa 2 giây.
- Dashboard và báo cáo cơ bản phải tải trong tối đa 3 giây với dữ liệu MVP.

### NFR-02: Tính chính xác và toàn vẹn dữ liệu

- Việc lưu giao dịch và trừ tồn kho phải được xử lý như một thao tác nhất quán: hoặc hoàn tất cả hai, hoặc không cập nhật phần nào.
- Tiền tệ phải được lưu và tính toán theo kiểu số chính xác, không phụ thuộc vào lỗi làm tròn số thực.
- Giao dịch và lịch sử tồn kho không được bị xóa khỏi dữ liệu vận hành bằng thao tác thông thường.

### NFR-03: Bảo mật

- Mật khẩu phải được lưu dưới dạng băm, không lưu dạng văn bản thuần.
- Người dùng chỉ được truy cập dữ liệu trong cửa hàng của mình.
- Các thao tác nhạy cảm như điều chỉnh tồn và hủy giao dịch phải có người thực hiện và thời gian.

### NFR-04: Khả dụng

- Giao diện phải sử dụng được trên máy tính tại quầy và màn hình có kích thước phổ biến.
- Các lỗi nhập liệu phải hiển thị bằng thông báo rõ ràng, có hướng dẫn xử lý.
- Hệ thống phải ngăn việc gửi lặp giao dịch khi người dùng nhấn xác nhận nhiều lần.

## 10. Chỉ số thành công

- Thu ngân hoàn tất giao dịch thông thường trong dưới một phút.
- Tồn kho phản ánh đúng các giao dịch bán đã hoàn tất mà không cần tính lại thủ công.
- Chủ cửa hàng xem được doanh thu hôm nay và sản phẩm tồn thấp ngay trên dashboard.
- Ít nhất 95% giao dịch hoàn tất có đầy đủ sản phẩm, số lượng, giá và phương thức thanh toán.
- Chủ cửa hàng xác định được sản phẩm bán chạy trong một khoảng thời gian đã chọn.

## 11. Giả định và quyết định cần xác nhận

- Phiên bản đầu tiên chỉ có một cửa hàng.
- Sản phẩm chỉ bán theo đơn vị đóng gói cố định, không bán theo cân nặng.
- Giao dịch được thanh toán ngay; bán chịu chưa thuộc MVP.
- Loại tiền tệ và quy tắc thuế chưa được xác định trong brief, cần xác nhận trước khi triển khai tính tiền.
- Cần xác nhận biên lai sẽ được in, tải xuống hay chỉ hiển thị trên màn hình.
- Cần xác nhận có theo dõi ngày hết hạn ngay trong MVP hay không.
- Cần xác nhận tích hợp máy quét mã vạch hay chỉ nhập mã vạch thủ công.
- Cần xác nhận thu ngân có được hủy giao dịch đã hoàn tất hay phải yêu cầu chủ cửa hàng.

## 12. Tiêu chí sẵn sàng cho thiết kế và triển khai

PRD được xem là sẵn sàng khi đã xác nhận loại tiền tệ, quy tắc thuế, chính sách trả hàng, hình thức biên lai, quyền hủy giao dịch và yêu cầu theo dõi ngày hết hạn. Sau đó có thể chuyển sang thiết kế UX, kiến trúc và lập kế hoạch sprint.
