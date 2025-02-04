# 🚀 Boilerplate Frontend 2025

Welcome to **Boilerplate Frontend 2025**! 🎉 This project provides a modern starter template for frontend development using cutting-edge tools and configurations. 🛠️

## 📋 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Linting & Formatting](#linting--formatting)
- [Pre-commit Hooks](#pre-commit-hooks)
- [CI/CD](#cicd)
- [License](#license)

## 🌟 Features

- **TypeScript**: Static typing for better code reliability.
- **Vite**: Super-fast build and dev server.
- **Vitest**: Powerful and fast testing framework.
- **ESLint**: Customizable linter to maintain code quality.
- **Prettier**: Automatic code formatting for consistency.
- **Stylelint**: Linter for CSS to enforce best practices.
- **PostCSS**: Tool for CSS transformation using plugins.
- **Husky**: Git hooks management.
- **Pre-commit Hooks**: Automated scripts before commits.
- **GitHub Actions**: CI/CD workflows.

## 🛠️ Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/PavelMelnik94/boilerplate-frontend-2025.git
   cd boilerplate-frontend-2025
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## 🚀 Scripts

- **Run development server:**

  ```bash
  npm run dev
  ```

- **Build for production:**

  ```bash
  npm run build
  ```

- **Preview the built project:**

  ```bash
  npm run preview
  ```

- **Run tests:**

  ```bash
  npm run test
  ```

- **Run linting:**

  ```bash
  npm run lint
  ```

- **Format code:**

  ```bash
  npm run format
  ```

## 📂 Project Structure

```bash
boilerplate-frontend-2025/
├── .bolt/
├── .github/
│   └── workflows/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
├── .editorconfig
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── .stylelintrc
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 📏 Linting & Formatting

This project uses:

- **ESLint** for JavaScript/TypeScript linting.
- **Prettier** for code formatting.
- **Stylelint** for CSS linting.

Run linting and formatting with:

```bash
npm run lint && npm run format
```

## 🎯 Pre-commit Hooks

We use **Husky** and **lint-staged** to enforce code quality before commits. Hooks include:

- Running ESLint and Prettier.
- Running tests.

## 🚀 CI/CD

GitHub Actions automate testing and deployment.

## 📜 License

This project is licensed under the [MIT License](LICENSE).

