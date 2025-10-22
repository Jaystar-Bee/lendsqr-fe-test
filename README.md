# Lendsqr User Management Dashboard

A modern user management dashboard built with Next.js 15, featuring user listing, filtering, and detailed user profiles also using IndexedDB for offline-first capabilities (API is not used).

## 🚀 Features

- **User Management** - View, filter, and manage users with pagination
- **User Details** - Comprehensive user profile pages with personal, employment, and guarantor information
- **Status Management** - Activate or blacklist users with confirmation modals
- **Offline-First** - IndexedDB integration for persistent local data storage
- **Responsive Design** - Mobile-friendly UI built with Mantine components
- **Type-Safe** - Full TypeScript support with Zod validation
- **Tested** - Comprehensive test coverage with Jest and React Testing Library

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router with Turbopack)
- **UI Library:** Mantine v8
- **Styling:** SCSS Modules
- **State Management:** React Hooks
- **Database:** IndexedDB (via idb)
- **Testing:** Jest + React Testing Library
- **Type Safety:** TypeScript + Zod
- **Icons:** Iconify

## 📦 Installation

```bash
# Clone the repository
git clone <https://github.com/Jaystar-Bee/lendsqr-fe-test.git>

# Navigate to project directory
cd lendsqr-fe-test

# Install dependencies
npm install
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

## 📁 Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   └── users/
│   │       ├── [id]/          # User detail page
│   │       └── page.tsx       # Users listing page
│   ├──page.tsx                # Authentication
├── components/
│   ├── element/               # Reusable UI elements
│   └── ui/                    # Complex UI components
├── hooks/
│   └── useUserDB.ts           # IndexedDB hook
├── types/                     # TypeScript type definitions
```

## 🔑 Key Features Explained

### IndexedDB Integration
User data is stored locally using IndexedDB for offline access and faster load times. The `useUserDB` hook provides methods to:
- Fetch all users
- Get user by ID
- Update user status
- Save users to local database

### User Filtering
Filter users by status (Active, Inactive, Pending, Blacklisted) using URL search parameters.
Filter users by full name using URL search parameters.
Filter users by email using URL search parameters.
Filter users by phone number using URL search parameters.
Filter user by Date Joined using URL search parameters.
Filter user by Organization using URL search parameters.

### Pagination
Customizable items per page (10, 20, 50, 100) with smooth navigation.

### Status Management
Update user status with confirmation modals to prevent accidental changes.

## 🧩 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest tests |
| `npm run test:watch` | Run tests in watch mode |

## 🌐 Environment Variables

No environment variables required for basic functionality. The app fetches mock data from a public API.

## 📝 Testing

The project includes comprehensive tests for:
- User listing page
- User detail page
- Component rendering
- User interactions
- Error handling
- Loading states

All tests use actual components (no mocks) for realistic testing.
