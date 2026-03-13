# Hướng dẫn Chạy Game Triết học Tương tác HCM 1975

Tôi đã hoàn thành việc nâng cấp game của bạn dựa trên dữ liệu 10 cảnh (scenes) và cấu trúc JSON mới.

## 🚀 Tính năng nổi bật đã cài đặt:
1. **Dữ liệu chuẩn 10 cảnh**: Đã được nạp vào `data.sql` với đầy đủ giải thích triết học và hệ thống điểm.
2. **Gameplay Feedback**: Mỗi khi chọn, game sẽ hiện một Modal (FeedbackModal) giải thích kết quả hành động và chiều sâu triết học của lựa chọn đó trước khi chuyển cảnh.
3. **Giao diện Visual Novel**: Premium dark theme, progress bar, và thẻ bài (StoryPanel) hiển thị nội dung mượt mà.
4. **Hệ thống lưu trữ**: Tích hợp đầy đủ Save/Load giữa Backend và LocalStorage.

## 📁 Cách sử dụng Ảnh (Assets):
Dựa trên yêu cầu của bạn, hãy đặt các tệp ảnh vào thư mục sau:
`frontend/public/assets/images/`

Tên tệp cần khớp với trong DB:
- `scene_01.jpg`
- `scene_02.jpg`
- ... đến `scene_10.jpg`

## 🛠️ Cách khởi động:

### Bước 1: Chạy Backend (Spring Boot)
Mở terminal tại thư mục gốc và chạy:
```powershell
.\mvnw.cmd spring-boot:run
```
*Backend sẽ tự động nạp dữ liệu từ `src/main/resources/data.sql` vào H2 Database.*

### Bước 2: Chạy Frontend (React)
Mở một terminal khác tại thư mục `frontend/` và chạy:
```powershell
npm run dev
```
Truy cập: `http://localhost:5173` để trải nghiệm.

## 📊 Cấu trúc Dữ liệu Backup
Tôi cũng đã tạo tệp `frontend/src/data/story_hcm1975.json` như bạn yêu cầu để dự phòng hoặc dùng khi chạy offline.

## ⚙️ Admin Dashboard
Bạn có thể truy cập `http://localhost:5173/admin` để xem tổng quan các Chapter, Scenes và danh sách API Endpoints.
