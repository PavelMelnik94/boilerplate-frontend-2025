# 🚀 Boilerplate Frontend 2025

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-blue)](package.json)
[![Last Updated](https://img.shields.io/badge/last%20updated-2025--02--12-blue)](README.md)

Welcome to **Boilerplate Frontend 2025**! A modern, feature-rich starter template for frontend development powered by Vite and TypeScript. This boilerplate is designed to provide developers with a robust foundation for building scalable and maintainable web applications.

## ✨ Features

- 🏎️ **[Vite](https://vitejs.dev/)** - Lightning fast build tool with HMR
- 📝 **[TypeScript](https://www.typescriptlang.org/)** - Type safety and enhanced developer experience
- 🧪 **[Vitest](https://vitest.dev/)** - Blazing fast unit testing
- 🎨 **[PostCSS](https://postcss.org/)** - Modern CSS processing
- 📏 **Code Quality**:
  - [ESLint](https://eslint.org/) - Code linting
  - [Prettier](https://prettier.io/) - Code formatting
  - [Stylelint](https://stylelint.io/) - Style linting
- 🪝 **Git Hooks**:
  - [Husky](https://typicode.github.io/husky/) - Git hooks made easy
  - [lint-staged](https://github.com/okonet/lint-staged) - Run linters on git staged files
- 📊 **Analysis & Testing**:
  - [Bundle analysis](https://www.npmjs.com/package/rollup-plugin-visualizer) - Visualize bundle size
  - [Web Vitals monitoring](https://www.npmjs.com/package/web-vitals) - Monitor web performance
  - [Lighthouse integration](https://www.npmjs.com/package/lighthouse) - Run Lighthouse audits
  - [Accessibility testing (axe-core)](https://www.npmjs.com/package/@axe-core/cli) - Check accessibility
- 🔍 **Performance**:
  - [Bundle size limits](https://www.npmjs.com/package/bundlesize) - Set size limits for assets
  - [Browser compatibility checks](https://www.npmjs.com/package/eslint-plugin-compat) - Ensure compatibility
  - [High-performance animations linting](https://www.npmjs.com/package/stylelint-high-performance-animation) - Check animations performance in styles
- 🎛️ **Feature Management**:
  - Runtime feature toggles
  - Type-safe feature flags
  - Environment-based feature switching
- 🗄️ **Enhanced Storage**:
  - Multiple storage instances (main, temporary, secure, cache)
  - Encrypted data support with crypto-js
  - IndexedDB/WebSQL/LocalStorage with [localforage](https://github.com/localForage/localForage)
  - Type-safe storage operations
  - Subscribe to storage changes
  - Automatic state persistence
  - Initial state configuration
- 🌐 **HTTP Client**:
  - Type-safe [Axios](https://axios-http.com/docs/intro)-based HTTP client
  - Automatic error handling
  - Request/Response interceptors
  - Header normalization
  - Configurable timeouts and base URL
  - Comprehensive logging
  - Full TypeScript support
  - Unit test coverage

## 📂 Project Structure

```
boilerplate-frontend-2025/
├── .github/               # GitHub workflows and configurations
├── .husky/                # Git hooks configurations
├── .vscode/               # VS Code settings and recommendations
├── src/                   # Source code directory
├── scripts/               # Helper scripts
├── configs/               # Shared configurations
├── public/               # Static assets and public files
├── dist/                  # Build output
└── config files          # Various configuration files
    ├── .editorconfig
    ├── eslint.config.js  # New flat ESLint configuration
    ├── tsconfig.json
    ├── vite.config.ts
    ├── web-vitals.config.js
    └── vitest.config.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/PavelMelnik94/boilerplate-frontend-2025.git
cd boilerplate-frontend-2025
```

2. Install dependencies:

```bash
npm install
```

3. Set up VS Code extensions (optional):

This command will install recommended extensions for VS Code.

```bash
npm run setup:vscode
```

4. Find all "\*ANCHOR" comments in the project and replace them with your own values.

5. Editing the `README.md`, `LICENSE`, and `package.json` files is also recommended.

6. Start development server:

```bash
npm run dev
```

## 📜 Available Scripts

### Feature Flags

- `npm run feature-flags list` - List all feature flags
- `npm run feature-flags add [name]` - Add new feature flag
- `npm run feature-flags enable [name]` - Enable feature flag
- `npm run feature-flags disable [name]` - Disable feature flag

Usage in code:

```typescript
import { featureFlags } from '@/config/featureFlags';

function MyComponent() {
  return (
    <div>
      {featureFlags.darkMode && <DarkModeToggle />}
    </div>
  );
}
```

### Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Testing

- `npm run test` - Run tests
- `npm run test:ui` - Open test UI
- `npm run test:coverage` - Generate coverage report
- `npm run test:watch` - Watch mode testing
- `npm run test:run` - Single run tests

### Linting & Formatting

- `npm run lint` - Lint code
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code
- `npm run style:check` - Check styles
- `npm run style:fix` - Fix style issues

### Development Tools

- `npm run check:deps` - Check for outdated dependencies and optionally update them
- `npm run clean` - Clean temporary files and build artifacts
- `npm run create:component` - Generate new component with all necessary files
- `npm run analyze:code` - Analyze codebase statistics and potential issues

### Analysis & Quality

- `npm run lighthouse` - Run Lighthouse audit for performance analysis
- `npm run check-a11y` - Check application accessibility
- `npm run bundle-analysis` - Analyze bundle size composition
- `npm run size` - Check bundle size limits
- `npm run check-web-vitals` - Monitor Core Web Vitals metrics

## Bundle Size Limits via `bundlesize`(`npm run size`)

```json
"size-limit": [
  {
    "path": "dist/**/*.js",
    "limit": "100 kb"
  }
]
```

### Setup & Maintenance

- `npm run setup:vscode` - Install recommended VS Code extensions
- `npm run prepare` - Install Husky hooks
- `npm run lint-staged` - Run staged file checks

## 🔧 Configuration

### ESLint Configuration

The project uses the new flat ESLint configuration system with enhanced rules for:

- TypeScript strict checking
- Import/export organization
- Security best practices
- Performance optimizations
- Modern JavaScript practices
- Async code handling
- Error handling
- Code style consistency

### Browser Support

```json
"browserslist": [
  "last 10 Chrome versions",
  "last 10 Firefox versions",
  "last 10 Safari versions",
  "iOS >= 15",
  "> 0.5%",
  "not dead"
]
```

### Public Directory

The project now includes a `public/` directory for static assets with:

- Improved asset organization
- Built-in support for PWA assets
- Favicon and icon management
- Static file serving

### Enhanced HTML Template

The `index.html` template includes:

- Comprehensive meta tags
- SEO optimizations
- Social media sharing support
- Performance optimizations
- PWA support
- DNS prefetching
- Resource preloading

## 📦 Core Dependencies

- **axios** - Promise-based HTTP client
- **crypto-js** - Advanced encryption for secure data storage
- **localforage** - Offline storage with IndexedDB/WebSQL/localStorage

## 🗄️ Storage System

The project includes a robust storage system located in `src/utils/storage/` with the following features:

- Multiple storage instances:
  - `mainStorage` - Primary application data
  - `tempStorage` - Temporary session data
  - `secureStorage` - Encrypted sensitive data
  - `cacheStorage` - Performance optimization cache

````

## 🐳 Docker Support

Build and run with Docker:

```bash
# Build the image
docker-compose build

# Start the container
docker-compose up

# Stop the container
docker-compose down
````

## 🔒 Git Hooks

Pre-commit hooks automatically run:

- ESLint
- Prettier
- Stylelint
- Type checking
- Unit tests

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📫 Support

For support, please open an issue in the GitHub repository.

---

<div align="center">

Made with ❤️ by [PavelMelnik94](https://github.com/PavelMelnik94)

</div>
