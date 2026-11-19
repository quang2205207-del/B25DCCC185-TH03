# ShopMini

Ứng dụng cửa hàng mini được xây dựng bằng React, TypeScript, Vite, Context API và Redux Toolkit.

## Chạy ứng dụng

```bash
npm install
npm run dev
```

Tạo bản build production bằng `npm run build`.

## Tổ chức state

- **`useState`** dành cho dữ liệu ngắn hạn chỉ cần trong một màn hình: từ khóa tìm kiếm, giá trị biểu mẫu đăng nhập, thông báo lỗi và trạng thái xác nhận đặt hàng. Chúng không cần được chia sẻ với các trang khác.
- **Context API** dành cho các thiết lập dùng chung toàn ứng dụng: `ThemeContext` quản lý giao diện sáng/tối và lưu lựa chọn vào `localStorage`; `AuthContext` quản lý user đăng nhập cùng các hàm `login`/`logout`. Đăng nhập demo thành công khi mật khẩu là `123456`.
- **Redux Toolkit** dành cho dữ liệu nghiệp vụ được chia sẻ giữa nhiều trang: `productsSlice` tải sản phẩm từ Fake Store API và theo dõi trạng thái tải; `cartSlice` quản lý giỏ hàng, số lượng và tổng tiền. Các selector giỏ hàng nằm cùng slice để mọi màn hình dùng chung cách tính.

## Tính năng

- Trang sản phẩm responsive, tìm theo tên, xem chi tiết và thêm vào giỏ.
- Giỏ hàng có thể cập nhật số lượng, xóa món và xem tổng tiền.
- Trang thanh toán được bảo vệ; sau đăng nhập, người dùng được đưa về trang định truy cập.
- Đặt hàng xóa giỏ và hiển thị thông báo thành công.
- Header dùng chung hiển thị giỏ, tài khoản và điều khiển theme.

## API sản phẩm

`https://fakestoreapi.com/products`
