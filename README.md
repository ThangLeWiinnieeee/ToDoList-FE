# ToDoList-FE

A fully-functional **Todo List Frontend** built with Next.js 14, React, and Tailwind CSS. This project implements a modern App Router architecture with authentication flow, route protection, and API integration with the backend service.

---

## Features

- **Authentication Flow** - Register, login, logout with cookie-based token storage
- **Protected Routing** - Middleware-based protection for private pages (for example, /todos)
- **Todo Management UI** - Create, update, filter, and delete todos from a clean dashboard
- **Responsive Design** - Mobile-friendly and desktop-friendly UI
- **Error Handling** - User-friendly error messages and request failure handling
- **API Integration** - Centralized Axios client with interceptors and auto token injection
- **Testing Setup** - Jest + React Testing Library test suite for components, hooks, and services

---

## Project Structure

```text
src/
├── __tests__/                  # Unit tests
│   ├── components/
│   ├── hooks/
│   └── services/
├── app/                        # Next.js App Router pages and layouts
│   ├── (auth)/
│   └── todos/
├── components/                 # Reusable UI and feature components
├── config/                     # Centralized endpoint and app config
├── constants/                  # Static messages and constant values
├── contexts/                   # React Context providers
├── hooks/                      # Custom hooks (auth, todos)
├── services/                   # API service layer
├── styles/                     # Theme/config style helpers
├── types/                      # Shared type models (JSDoc/type files)
└── utils/                      # Utility helpers
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| UI Library | React 18 |
| Styling | Tailwind CSS |
| HTTP Client | Axios |
| Auth Storage | js-cookie |
| Icons | lucide-react |
| Testing | Jest + React Testing Library |

---

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Backend API running (recommended: ToDoList-BE)

### Setup

```bash
# 1. Clone repository
git clone https://github.com/ThangLeWiinnieeee/ToDoList-FE.git
cd ToDoList-FE

# 2. Install dependencies
npm install

# 3. Create .env.local file
# (or update the existing one)

# 4. Start development server
npm run dev
```

---

## Environment Variables

Create or update `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NODE_ENV=development
```

---

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

---

## Frontend Routes

### Public Routes
```text
/                         - Landing page
/login                    - Login page
/register                 - Register page
```

### Protected Routes
```text
/todos                    - Todo dashboard page
```

---

## API Integration (Backend)

The frontend is designed to work with the backend API endpoints:

### Authentication
```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
POST   /api/auth/logout
PUT    /api/auth/profile
POST   /api/auth/change-password
```

### Todos
```text
GET    /api/todos
POST   /api/todos
PUT    /api/todos/:id
DELETE /api/todos/:id
GET    /api/todos/completed
GET    /api/todos/pending
```

---

## Architecture Highlights

### Frontend Data Flow

```text
Page → Component → Hook → Service → Axios Client → Backend API
```

### Key Design Decisions

- Context-based global state for authentication and todos
- Feature hooks to encapsulate business logic
- Centralized request/response handling with Axios interceptors
- Middleware route protection for private pages

---

## Running the Application

### Development
```bash
npm run dev
```
App runs on http://localhost:3000

### Production Build
```bash
npm run build
npm run start
```

---

## Available Scripts

```bash
npm run dev            # Start Next.js development server
npm run build          # Build application for production
npm run start          # Start production server
npm run lint           # Run ESLint checks
npm test               # Run tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Run tests and generate coverage report
```

---

## Known Limitations

- Route and API contract must stay aligned with backend endpoint naming
- Dev mode may show duplicate logs due to React Strict Mode behavior
- Full end-to-end tests are not yet included in this repository

---

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -m "Add feature"`
3. Push your branch: `git push origin feature/your-feature`
4. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Author

**Thang Le**
GitHub: [@ThangLeWiinnieeee](https://github.com/ThangLeWiinnieeee)

---

## Support

For questions or issues, please open an issue on GitHub.

---

**Last Updated:** March 2026
**Version:** 1.0.0
