- **Vitest** for unit testing
- **Playwright** for end-to-end testing
- **ESLint + Prettier + Stylelint** for code quality
- **LocalStorage** for data persistence

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository

```bash
git clone git@github.com:reganas/A-Habit-Tracker-App.git
cd habit-tracker-ts
```

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

## Available Scripts

### Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking

### Testing

- `npm run test` - Run unit tests with Vitest
- `npm run test:ui` - Run unit tests with UI
- `npm run test:e2e` - Run end-to-end tests with Playwright
- `npm run test:e2e:ui` - Run E2E tests with UI

### Code Quality

- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run lint:style` - Run Stylelint

## Testing Coverage

### Unit Tests (8 tests)

- **Habit Name Validation** - Empty, duplicate, and valid name testing
- **Habit Completion Logic** - Toggle, multiple habits, cleanup, state management

### End-to-End Tests (6 tests)

- **Add new habit successfully**
- **Show error for duplicate habit name**
- **Complete a habit by clicking checkbox**
- **Edit a habit name**
- **Stop a habit**
- **Delete a habit**

## Usage

1. **Adding Habits**: Click the + button to add new habits
2. **Tracking Progress**: Check/uncheck habits for any day
3. **Navigation**: Use calendar picker or week view to navigate between days
4. **Managing Habits**: Edit, stop, resume, or delete habits using the action buttons
5. **Stop/Resume**: Use the pause button to stop tracking a habit, then resume when ready

## Project Structure

```
src/
├── components/             # Reusable UI components
│   ├── date-navigation/    # Date navigation components
│   └── habit-list/         # Habit-related components
├── composables/            # Vue composition functions
│   └── __tests__/          # Unit tests (Vitest)
├── config/                 # Application configuration
├── router/                 # Vue Router configuration
├── store/                  # State management
├── types/                  # TypeScript type definitions
├── views/                  # Page components
├── App.vue                 # Root component
├── main.ts                 # Application entry point
└── style.css               # Global styles

tests/
├── e2e/                    # End-to-end tests (Playwright)
│   └── habit-management.spec.ts
└── setup.ts                # Test setup configuration
```

## Custom Features

### Stop/Resume Habit Tracking

This application includes a unique feature that allows users to:

- **Stop tracking** a habit from a specific date
- **Resume tracking** a habit from a specific date
- **Visual indicators** showing stopped habits with "(Stopped)" label
- **Date-based logic** ensuring habits are only stopped between stop and resume dates

## TypeScript Implementation

The application has been fully migrated from JavaScript to TypeScript, providing:

- **Type Safety** - Compile-time error checking
- **Better IDE Support** - Enhanced autocomplete and refactoring
- **Interface Definitions** - Clear data structure contracts
- **Strict Type Checking** - Prevents runtime errors

## License

© 2025 Habit Tracker. Made by Justinas Steikunas.
