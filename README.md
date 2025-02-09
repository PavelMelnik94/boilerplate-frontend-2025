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
  - [Bundle analysis](https://www.npmjs.com/package/rollup-plugin-visualizer) - Visualize bundle size
  - [Web Vitals monitoring](https://www.npmjs.com/package/web-vitals) - Monitor web performance
  - [Lighthouse integration](https://www.npmjs.com/package/lighthouse) - Run Lighthouse audits
  - [Accessibility testing (axe-core)](https://www.npmjs.com/package/@axe-core/cli) - Check accessibility
- 🔍 **Performance**:
  - [Bundle size limits](https://www.npmjs.com/package/bundlesize) - Set size limits for assets
  - [Browser compatibility checks](https://www.npmjs.com/package/eslint-plugin-compat) - Ensure compatibility
  - [High-performance animations linting](https://www.npmjs.com/package/stylelint-high-performance-animation) - Check animations performance in styles

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

### Setup & Maintenance

- `npm run setup:vscode` - Install recommended VS Code extensions
- `npm run prepare` - Install Husky hooks
- `npm run lint-staged` - Run staged file checks

## 🛠️ Development Tools

### Component Generator

```bash
npm run create:component ComponentName
```

Generates a new component with:

- Component file (TSX)
- Styles module (SCSS)
- Test file
- Index file for exports

### Dependency Management

```bash
npm run check:deps
```

- Checks for outdated dependencies
- Shows available updates
- Offers interactive update process

### Project Cleanup

```bash
npm run clean
```

Removes:

- Build artifacts
- Temporary files
- Cache directories
- Debug logs

### Codebase Analysis

```bash
npm run analyze:code
```

Provides:

- File count and types statistics
- Line count analysis
- Largest files identification
- Security audit results

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
