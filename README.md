# Task Management & Activity Dashboard
Web Engineering & AI - Assignment 01 (React: components, class/functional, JSX, hooks).

## Features
- Add / complete / delete tasks, filter by status and priority, metrics summary
- Light/Dark theme (Context API), tasks saved in localStorage
- Class component `ActivityLogger` (componentDidMount / DidUpdate / WillUnmount, this.state)
- Hooks: useState, useEffect, useContext, useRef, useMemo, useCallback (+ custom `useLocalStorage`)
- `CardWrapper` uses `props.children`

## Setup
```
npm install
npm run dev      # development at http://localhost:5173
npm run build    # production build in dist/
```

## Deploy (Vercel / Netlify)
Build command `npm run build`, output directory `dist`.

## Structure
```
src/
├── components/class/ActivityLogger.jsx
├── components/functional/{TaskForm,TaskList,TaskCard,CardWrapper,Header,MetricsSummary}.jsx
├── context/ThemeContext.jsx
├── hooks/useLocalStorage.js
└── App.jsx
```
