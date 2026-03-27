# 🔔 Rung Chuông Vàng Pikachu

Trò chơi trắc nghiệm Tiếng Anh vui nhộn dành cho trẻ mầm non. Hỗ trợ PWA cài đặt lên điện thoại, máy tính như một ứng dụng độc lập.

## 💻 Hướng Dẫn Phát Triển (Local)
```bash
npm install
npm run dev
```
Truy cập: `http://localhost:5173`

---

## 🚀 Hướng Dẫn Triển Khai Lên Cloudflare Pages

### Phương án A — Upload trực tiếp (Đơn giản nhất, không dùng CLI)

**Bước 1:** Tạo bản build: Mở terminal chạy `npm install` rồi chạy `npm run build`. Sau khi chạy xong sẽ xuất hiện thư mục `dist/`.  
**Bước 2:** Nén toàn bộ bên trong thư mục `dist/` thành file ZIP (VD: `rung-chuong-vang.zip`).  
**Bước 3:** Đăng nhập [https://dash.cloudflare.com](https://dash.cloudflare.com) → chọn **Workers & Pages**.  
**Bước 4:** Nhấn **"Create a project"** → Chọn thẻ **"Pages"** → **"Upload assets"** (Direct Upload).  
**Bước 5:** Đặt tên project (ví dụ: `rung-chuong-vang`) → nhấn **"Create project"**.  
**Bước 6:** Kéo thả file `rung-chuong-vang.zip` vào màn hình để upload.  
**Bước 7:** Nhấn **"Deploy site"** → đợi 30-60 giây. Nhận URL dạng: `https://rung-chuong-vang.pages.dev` ✅

---

### Phương án B — Dùng Wrangler CLI (Dành cho Developer)

```bash
# 1. Cài đặt các thư viện cần thiết
npm install

# 2. Đăng nhập Cloudflare
npx wrangler login

# 3. Build mã nguồn (Vite sẽ tự đóng gói toàn bộ ảnh, CSS, JS, Worker vào mục dist/)
npm run build

# 4. Deploy thẳng lên Cloudflare Pages
npx wrangler pages project create rung-chuong-vang --production-branch main
npx wrangler pages deploy dist --project-name rung-chuong-vang
```

---

### ⚠️ Lưu ý quan trọng để không phát sinh lỗi

| Yêu cầu | Chi tiết |
|---------|---------|
| **File `_worker.js`** | Bắt buộc có trong upload. Sau khi chạy `npm run build`, file sẽ tự được sinh ra trong thư mục `dist/`. |
| **Thư mục `assets/`** | Toàn bộ ảnh PNG, media âm thanh sẽ được Vite tự đưa vào `dist/assets/` khi build, không cần chép tay. |
| **Thư mục Upload** | **Chỉ upload nội dung bên trong thư mục `dist/`**, không upload `node_modules` hay file code thô. |
| **Biến môi trường** | Mặc định game không dùng Env Vars, không cần thiết lập Database. |
