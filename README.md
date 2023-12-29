# BÀI TẬP LỚN MAGICPOST

## Sinh viên thực hiện
| Họ và tên | Mã Sinh Viên| 
|--------------|-------|
| Nguyễn Tiến Thông | 21020408|
| Phan Mạnh Thắng | 21020405|
| Đỗ Đức Huy | 21020124| 
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

## Các công nghệ sử dụng
- bla bla
