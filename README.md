# 802Collections

A modular web application platform that hosts multiple tools and utilities in one unified interface. Built with React, TypeScript, Vite, and Tailwind CSS.

![802Collections](https://img.shields.io/badge/version-1.0.0-76B900?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-76B900?style=for-the-badge)

## ✨ Features

- **Modular Architecture** - Easy to add new apps/modules to the platform
- **App Registry System** - Centralized registration and management of applications
- **Lazy Loading** - Each app is lazy-loaded for optimal performance
- **Dark Mode Theme** - Modern dark theme with green accent
- **TypeScript** - Full type safety with strict TypeScript configuration
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **State Management** - Zustand for lightweight and efficient state management
- **Error Boundaries** - Graceful error handling with recovery options

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/xSolstice1/802Collections.git
cd 802Collections

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
802Collections/
├── public/                 # Static assets
├── src/
│   ├── apps/              # Application modules
│   │   ├── home/          # Dashboard/Home app
│   │   ├── json-formatter/# JSON Formatter utility
│   │   └── index.ts       # App registry configuration
│   ├── components/        # Reusable UI components
│   │   ├── layout/        # Layout components (Sidebar, Header)
│   │   ├── ErrorBoundary.tsx
│   │   └── LoadingSpinner.tsx
│   ├── core/              # Core framework code
│   │   ├── registry/      # App registry system
│   │   └── router/        # Routing configuration
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API and external services
│   ├── store/             # Zustand state management
│   ├── styles/            # Global styles and Tailwind config
│   ├── model/             # TypeScript type definitions and models
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── index.html             # HTML template
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite build configuration
```

## 🎨 Design System

### Colors

The application uses a dark theme with Pantone 802C green as the primary accent:

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#76B900` | Buttons, links, accents |
| Background | `#0a0b0e` | Main background |
| Surface | `#121418` | Cards, panels |
| Border | `#343a40` | Borders, dividers |

### Components

Pre-styled components are available via Tailwind CSS classes:

- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.btn-ghost` - Ghost/minimal button
- `.card` - Card container
- `.input` - Form input
- `.glass` - Glassmorphism effect

## 🧩 Adding New Apps

### Step 1: Create the App Component

Create a new folder in `src/apps/` and add your component:

```tsx
// src/apps/my-app/MyApp.tsx
import { useState } from 'react';

const MyApp = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">My App</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)} className="btn-primary">
        Increment
      </button>
    </div>
  );
};

export default MyApp;
```

### Step 2: Register the App

Add your app to `src/apps/index.ts`:

```typescript
import { lazy } from 'react';
import { Calculator } from 'lucide-react';

const apps: AppDefinition[] = [
  // ... existing apps
  {
    id: 'my-app',
    name: 'My App',
    description: 'Description of my app',
    route: '/my-app',
    icon: <Calculator className="w-5 h-5" />,
    component: lazy(() => import('@apps/my-app/MyApp')),
    enabled: true,
    category: 'utilities',
  },
];
```

That's it! Your app will automatically appear in the sidebar and dashboard.

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| React Router | Client-side routing |
| Zustand | State management |
| Tailwind CSS | Styling |
| Lucide React | Icons |

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🔮 Future Enhancements

- [ ] **Plugin System** - Dynamic plugin loading without rebuild
- [ ] **Microfrontend Support** - Load apps from external sources
- [ ] **Authentication Layer** - User authentication and authorization
- [ ] **App Communication** - Inter-app messaging system
- [ ] **Settings Persistence** - Save user preferences per app
- [ ] **App Store** - Browse and install community apps
- [ ] **Offline Support** - PWA capabilities with service workers
- [ ] **Analytics Dashboard** - Track app usage and performance

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with ❤️ using React, TypeScript, and Tailwind CSS