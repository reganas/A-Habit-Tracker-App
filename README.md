# Habit Tracker

A responsive habit tracking application built with Vue 3 and Vite. It tracks your daily habits, navigates between days, and manages your progress.

## Features

- **Daily Habit Tracking** - Mark habits as complete/incomplete for any day
- **Day Navigation** - Navigate between days with calendar picker and week view
- **Habit Management** - Add, edit, stop, resume, and delete habits
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Light/Dark Mode** - Automatic theme switching based on system preference
- **Accessibility** - High contrast mode and keyboard navigation support
- **Local Storage** - Data persists between sessions

## Tech Stack

- **Vue 3** with Composition API
- **Vue Router** for client-side routing
- **Vite** for build tooling
- **ESLint + Prettier + Stylelint** for code quality
- **LocalStorage** for data persistence

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository

```bash
git clone git@github.com:TuringCollegeSubmissions/jsteik-WD2.3.1.5.git
cd habit-tracker-app
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

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run lint:style` - Run Stylelint

## Usage

1. **Adding Habits**: Click the + button to add new habits
2. **Tracking Progress**: Check/uncheck habits for any day
3. **Navigation**: Use calendar picker or week view to navigate between days
4. **Managing Habits**: Edit, stop, resume, or delete habits using the action buttons

## Project Structure

```
src/
├── components/             # Reusable UI components
│   ├── date-navigation/    # Date navigation components
│   └── habit-list/         # Habit-related components
├── composables/            # Vue composition functions
├── config/                 # Application configuration
├── router/                 # Vue Router configuration
├── store/                  # State management
├── views/                  # Page components
├── App.vue                 # Root component
├── main.js                 # Application entry point
└── style.css               # Global styles
```

## License

© 2025 Habit Tracker. Made by Justinas Steikunas.
