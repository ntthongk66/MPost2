# BÀI TẬP LỚN MAGICPOST

## Sinh viên thực hiện - nhóm 8
| Họ và tên | Mã Sinh Viên| Công việc | 
|--------------|-------|---------------|
| Nguyễn Tiến Thông | 21020408| Nhóm trưởng + BE|
| Phan Mạnh Thắng | 21020405| FE |
| Đỗ Đức Huy | 21020124| FE |
## Video demo
[Link]()


## Giới thiệu
MagicPost là công ty hoạt động trong lĩnh vực chuyển phát. Công ty này có các điểm giao dịch phủ khắp cả nước. Mỗi điểm giao dịch phụ trách một vùng. Ngoài các điểm giao dịch, công ty cũng có nhiều điểm tập kết hàng hóa. Mỗi điểm giao dịch sẽ làm việc với một điểm tập kết. Ngược lại, một điểm tập kết sẽ làm việc với nhiều điểm giao dịch.

Người gửi, có hàng cần gửi, đem hàng đến một điểm giao dịch (thường là gần nhất) để gửi. Hàng, sau đó, được đưa đến điểm tập kết ứng với điểm giao dịch của người gửi, rồi được chuyển đến điểm tập kết ứng với điểm giao dịch của người nhận. Tại điểm giao dịch của người nhận, nhân viên giao hàng sẽ chuyển hàng đến tận tay người nhận.

Công ty cần phát triển một phần mềm nhằm quản lý hệ thống chuyển phát nêu trên. Yêu cầu chức năng cho từng đối tượng sử dụng như sau:

### Chức năng cho lãnh đạo công ty

- [x] Quản lý hệ thống các điểm giao dịch và điểm tập kết.
- [x] Quản lý tài khoản trưởng điểm điểm tập kết và điểm giao dịch. Mỗi điểm giao dịch hoặc điểm tập kết có một tài khoản trưởng điểm.
- [x] Thống kê hàng gửi, hàng nhận trên toàn quốc, từng điểm giao dịch hoặc điểm tập kết.

### Chức năng cho trưởng điểm tại điểm giao dịch

- [x] Cấp tài khoản cho giao dịch viên tại điểm giao dịch.
- [x] Thống kê hàng gửi, hàng nhận tại điểm giao dịch.

### Chức năng cho giao dịch viên tại điểm giao dịch

- [x] Ghi nhận hàng cần gửi của khách (người gửi), in giấy biên nhận chuyển phát và phát cho khách hàng (tham khảo Hình 1 trong phụ lục).
- [x] Tạo đơn chuyển hàng gửi đến điểm tập kết mỗi/trước khi đem hàng gửi đến điểm tập kết.
- [x] Xác nhận (đơn) hàng về từ điểm tập kết.
- [x] Tạo đơn hàng cần chuyển đến tay người nhận.
- [x] Xác nhận hàng đã chuyển đến tay người nhận theo .
- [x] Xác nhận hàng không chuyển được đến người nhận và trả lại điểm giao dịch.
- [x] Thống kê các hàng đã chuyển thành công, các hàng chuyển không thành công và trả lại điểm giao dịch.

### Chức năng cho trưởng điểm tại điểm tập kết

- [x] Quản lý tài khoản nhân viên tại điểm tập kết.
- [x] Thống kê hàng đi, đến.

### Chức năng cho nhân viên tại điểm tập kết

- [x] Xác nhận (đơn) hàng đi từ điểm giao dịch chuyển đến.
- [x] Tạo đơn chuyển hàng đến điểm tập kết đích (ứng với điểm giao dịch đích, tức điểm giao dịch phụ trách vùng ứng với địa chỉ của người nhận).
- [x] Xác nhận (đơn) hàng nhận về từ điểm tập kết khác.
- [x] Tạo đơn chuyển hàng đến điểm giao dịch đích.

### Chức năng cho khách hàng

- [x] Tra cứu trạng thái và tiến trình chuyển phát của kiện hàng mình gửi.

## Hướng dẫn sử dụng
### Yêu cầu tiên quyết
Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt các phần sau trên máy của mình:
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

### Phía Backend
1. Cài dependencies:
```bash	
    npm install
```	
2. Tạo tệp .env và cung cấp các giá trị cấu hình cần thiết: DATABASE_URI, JWT_SECRET, JWT_REFRESH_SECRET, NODEMAILER_EMAIL và ODEMAILER_PASS.

3. Chạy:
```bash
    npm run start
```
( Mặc định, backend sẽ chạy trên cổng 4545. http://localhost:4545)

### Phía Frontend
1. Cài dependencies:
```bash	
    npm install
```	

2. Thay đổi apiHost trong apiLoc.js (http://localhost:4545 cho máy cục bộ)

3. Chạy:
```bash
    npm run start
```