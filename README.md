# 🚀 Boilerplate Frontend 2025

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](package.json)
[![Last Updated](https://img.shields.io/badge/last%20updated-2025--02--07-brightgreen)](README.md)

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
  - Bundle analysis
  - Web Vitals monitoring
  - Lighthouse integration
  - Accessibility testing (axe-core)
- 🔍 **Performance**:
  - Bundle size limits
  - Browser compatibility checks
  - High-performance animations linting

## 📂 Project Structure

```
boilerplate-frontend-2025/
├── .bolt/                  # Bolt configuration files
├── .github/               # GitHub workflows and configurations
├── .husky/                # Git hooks configurations
├── .vscode/               # VS Code settings and recommendations
├── src/                   # Source code directory
├── scripts/               # Helper scripts
├── dist/                  # Build output
└── config files          # Various configuration files
    ├── .editorconfig
    ├── .eslintrc.json
    ├── .prettierrc
    ├── .stylelintrc.json
    ├── postcss.config.js
    ├── tsconfig.json
    ├── vite.config.ts
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
```bash
npm run setup:vscode
```

4. Start development server:
```bash
npm run dev
```

## 📜 Available Scripts

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

### Type Checking
- `npm run type-check` - Check types
- `npm run type-check:watch` - Watch mode type checking

### Performance & Analysis
- `npm run lighthouse` - Run Lighthouse audit
- `npm run check-a11y` - Check accessibility
- `npm run bundle-analysis` - Analyze bundle size
- `npm run size` - Check size limits
- `npm run check-web-vitals` - Monitor web vitals

### Git Hooks
- `npm run prepare` - Install Husky hooks
- `npm run lint-staged` - Run staged file checks

## 🔧 Configuration

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

### Size Limits

```json
"size-limit": [
  {
    "path": "dist/**/*.js",
    "limit": "100 kb"
  }
]
```

## 🐳 Docker Support

Build and run with Docker:

```bash
# Build the image
docker-compose build

# Start the container
docker-compose up

# Stop the container
docker-compose down
```

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

Contributions are welcome! Please feel free to submit a Pull Request.

## 📫 Support

For support, please open an issue in the GitHub repository.

---

<div align="center">

Made with ❤️ by [PavelMelnik94](https://github.com/PavelMelnik94)

Last updated: 2025-02-07 21:56:30 UTC

</div>
