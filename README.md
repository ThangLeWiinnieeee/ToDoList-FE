# ToDoList-FE

Frontend cho ứng dụng quản lý công việc (Todo List), xây dựng bằng Next.js 14 + React + Tailwind CSS.

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Axios
- js-cookie
- Lucide React

## Tính năng chính

- Đăng ký / đăng nhập / đăng xuất
- Bảo vệ route `/todos` bằng middleware
- Quản lý todo: tạo, cập nhật trạng thái, xóa
- Lọc todo theo trạng thái
- Giao diện responsive

## Yêu cầu môi trường

- Node.js >= 18
- npm >= 9

## Cài đặt

```bash
npm install
```

## Chạy môi trường development

```bash
npm run dev
```

Mặc định ứng dụng chạy tại:

- http://localhost:3000

## Biến môi trường

Tạo file `.env.local` (nếu chưa có):

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## Scripts

- `npm run dev`: chạy dev server
- `npm run build`: build production
- `npm run start`: chạy bản production
- `npm run test`: chạy test

## Cấu trúc thư mục chính

```text
src/
  app/
  components/
  contexts/
  hooks/
  services/
  utils/
```

## Ghi chú

- Backend cần chạy trước tại `http://localhost:4000`.
- Nếu gặp lỗi CORS hoặc auth, kiểm tra lại biến môi trường và token cookie.
