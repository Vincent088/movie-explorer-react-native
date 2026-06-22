# Movie Explorer

A React Native app for browsing popular movies, searching titles, and saving favorites — powered by the TMDB API.

---

## Running the app

### Prerequisites

- Node.js 18+
- Expo Go installed on your phone, or an Android/iOS emulator set up

### Setup

1. Install dependencies

```bash
npm install
```

2. Start the dev server

```bash
npm start
```

After the dev server starts, press:

- `a` — run on Android (emulator or connected device)
- `i` — run on iOS (simulator or connected device, macOS only)

### Running tests

```bash
npm test
```

---

## Third-party libraries

| Library                                       | Why                                                                                                                              |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **expo-router**                               | File-based navigation — pages map directly to files, same mental model as Next.js. Less boilerplate than React Navigation setup. |
| **axios**                                     | Cleaner API client than fetch — interceptors for global error handling and auth params, better default timeout behavior.         |
| **zustand**                                   | Minimal state management for the favorites store. Much less ceremony than Redux, and works well with React's hook model.         |
| **expo-image**                                | Drop-in replacement for React Native's Image with built-in disk/memory caching and smooth transitions.                           |
| **@react-native-async-storage/async-storage** | Persisting favorites to local storage between app sessions.                                                                      |
| **@testing-library/react-native**             | Component testing that focuses on what the user sees, not implementation details.                                                |

---

## Architecture

The app follows a **feature-based layered architecture**:

```
src/
├── app/          # Screens (Expo Router file-based routes)
├── screens/      # Screen-level components with layout logic
├── components/   # Reusable UI components (MovieCard, SearchBar, etc.)
├── hooks/        # Data-fetching hooks (useMovies, useSearch)
├── services/     # API layer — all TMDB calls live here
├── store/        # Zustand global state (favorites)
├── types/        # Shared TypeScript interfaces
└── constants/    # API config, strings, theme
```

**Data flow**: screens call hooks → hooks call services → services call the API. The store sits outside this flow and is accessed directly by any component that needs it.

This keeps each layer responsible for one thing — the API service doesn't know about UI state, and components don't know about HTTP calls.
