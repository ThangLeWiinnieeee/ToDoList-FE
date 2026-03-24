# ToDoList Frontend - Next.js

## 🚀 Installation

### 1. Install Dependencies

```bash
npm install
# hoặc
yarn install
```

### 2. Setup Environment Variables

File `.env.local` đã được tạo, bạn chỉ cần cập nhật nếu cần:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=development
```

### 3. Run Development Server

```bash
npm run dev
# hoặc 
yarn dev
```

App sẽ chạy tại: **http://localhost:3000**

---

## 📦 Dependencies

### Core
- **Next.js 14** - React framework
- **React 18** - UI library
- **React DOM 18** - React rendering

### HTTP & Storage
- **Axios 1.6** - HTTP client
- **js-cookie 3.0** - Cookie management

### Styling
- **Tailwind CSS 3.3** - Utility-first CSS
- **PostCSS 8.4** - CSS processing
- **AutoPrefixer 10.4** - Vendor prefixes

### Testing
- **Jest 29** - Testing framework
- **React Testing Library 14** - React component testing
- **jest-environment-jsdom** - DOM environment for Jest

### Linting
- **ESLint 8** - Code linting
- **ESLint Config Next** - Next.js ESLint config

---

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload

# Production
npm run build        # Build for production
npm start            # Start production server

# Testing
npm test             # Run tests once
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report

# Linting
npm run lint         # Run ESLint
```

---

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js App Router
├── components/          # React Components
├── config/              # Configuration
├── constants/           # Constants
├── contexts/            # Context API
├── hooks/               # Custom Hooks
├── services/            # API Services
├── styles/              # Theme & Styles
├── types/               # TypeScript/JSDoc types
├── utils/               # Utility Functions
└── __tests__/           # Tests
```

---

## 🔧 Configuration Files

- **`tailwind.config.js`** - Tailwind CSS configuration
- **`postcss.config.js`** - PostCSS configuration
- **`jsconfig.json`** - JavaScript/TypeScript paths
- **`jest.config.js`** - Jest testing configuration
- **`next.config.js`** - Next.js configuration
- **`.env.local`** - Environment variables

---

## 📌 Important Notes

1. **Absolute Imports**: Use `@/` prefix instead of relative paths
   ```javascript
   import Button from '@/components/common/Button'
   ```

2. **API Configuration**: Backend URL is in `.env.local`
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

3. **Token Management**: Tokens are stored in cookies using `js-cookie`

4. **Styling**: Tailwind CSS + Custom CSS classes are available in `globals.css`

---

## 🚦 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Start development: `npm run dev`
3. ✅ Use components from the template
4. ✅ Connect to backend (ensure backend is running on port 3000)
5. ✅ Write and run tests: `npm test`

---

## 🐛 Troubleshooting

**Port already in use?**
```bash
npm run dev -- -p 3001  # Use different port
```

**Clear cache:**
```bash
rm -rf .next node_modules
npm install
npm run dev
```

**Module not found?**
Make sure path in `jsconfig.json` is correct and restart dev server.

---

Happy coding! 🎉
