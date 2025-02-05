# 🚀 Vite TypeScript Starter

Welcome to **Vite TypeScript Starter**! 🎉 A modern starter template for frontend development using cutting-edge tools and configurations. 🛠️

## 📋 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Development Dependencies](#development-dependencies)
- [Testing](#testing)
- [Type Checking](#type-checking)
- [Linting & Formatting](#linting--formatting)
- [Browser Compatibility](#browser-compatibility)
- [Pre-commit Hooks](#pre-commit-hooks)
- [CI/CD](#cicd)
- [Author](#author)
- [License](#license)

## 🌟 Features

- **TypeScript**: Static typing for better code reliability
- **Vite 6**: Super-fast build and dev server
- **Testing Suite**:
  - Vitest for fast unit testing
  - Testing Library with Jest DOM for component testing
  - UI test interface and coverage reports
- **Comprehensive Linting**:
  - ESLint with advanced configuration
  - Browser compatibility checks
  - Security plugins
  - Performance optimization rules
  - Code quality plugins (sonarjs, unicorn)
- **Style Management**:
  - Stylelint with modern configuration
  - High-performance animation linting
  - Module resolution checking
  - PostCSS processing
- **Code Quality Tools**:
  - Prettier for consistent formatting
  - Husky for git hooks
  - Automated pre-commit checks

## 🛠️ Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/PavelMelnik94/vite-typescript-starter.git
   cd vite-typescript-starter
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

## 🚀 Scripts

- **Development:**
  ```
  npm run dev          # Start dev server
  npm run build        # Build for production
  npm run preview      # Preview production build
  ```

- **Testing:**
  ```
  npm run test         # Run tests in watch mode
  npm run test:ui      # Run tests with UI
  npm run test:run     # Run tests once
  npm run test:coverage # Run tests with coverage
  npm run test:watch   # Watch mode for tests
  ```

- **Type Checking:**
  ```
  npm run type-check        # Check types
  npm run type-check:watch  # Watch mode for type checking
  ```

- **Linting & Formatting:**
  ```
  npm run lint         # Run ESLint
  npm run lint:fix     # Fix ESLint issues
  npm run format       # Run Prettier
  npm run style:check  # Check styles
  npm run style:fix    # Fix style issues
  ```

## 📂 Project Structure

```
vite-typescript-starter/
├── .github/
│   └── workflows/
├── src/
│   ├── assets/
│   ├── components/
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
├── tests/
├── .eslintrc.json
├── .prettierrc
├── .stylelintrc.json
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🛠️ Development Dependencies

- Vite: ^6.0.11
- TypeScript: ^5.7.3
- PostCSS: ^8.4.35
- Vitest: ^3.0.5
- ESLint: ^9.19.0
- Stylelint: ^16.14.1
- Testing Library/Jest DOM: ^6.6.3

## 🧪 Testing

Comprehensive testing suite powered by Vitest and Testing Library:

```
npm run test           # Interactive testing
npm run test:ui        # Visual test interface
npm run test:coverage  # Generate coverage report
```

## 📘 Type Checking

TypeScript type checking with watch mode support:

```
npm run type-check
npm run type-check:watch
```

## 📏 Linting & Formatting

Advanced linting configuration with:

- ESLint for TypeScript and React
- Security and performance plugins
- SonarJS for code quality
- Stylelint for CSS best practices
- Prettier for code formatting

Run all checks:
```
npm run lint && npm run style:check && npm run format
```

## 🌐 Browser Compatibility

Built-in browser compatibility checking through eslint-plugin-compat. Configure target browsers in \`.browserslistrc\`.

## 🎯 Pre-commit Hooks

Automated quality checks on commit:

- Type checking
- Linting and formatting
- Unit tests
- Style validation

## 🚀 CI/CD

GitHub Actions workflow for automated:

- Code quality checks
- Test execution
- Build verification
- Type checking

## 👨‍💻 Author

- Pavel Melnik

## 📜 License

This project is licensed under the MIT License.

---

*Last Updated: 2025-02-05*
