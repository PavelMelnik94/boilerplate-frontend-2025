# 🚀 Boilerplate Frontend 2025

Welcome to **Boilerplate Frontend 2025**! This project provides a modern starter template for frontend development using TypeScript, Vite, Vitest, ESLint, Prettier, Stylelint, PostCSS, Husky, pre-commit hooks, and GitHub Actions.

## 📂 Project Structure

The repository is organized as follows:

- `.bolt/`: Configuration files for Bolt.
- `.github/`: GitHub-specific configurations, including workflows.
- `.husky/`: Husky hooks for managing Git hooks.
- `.vscode/`: Visual Studio Code settings and extensions recommendations.
- `src/`: Main source code directory containing application components and assets.
- `.editorconfig`: EditorConfig file to maintain consistent coding styles.
- `.gitattributes`: Git attributes file.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `.lintstagedrc.json`: Configuration for lint-staged to run linters on staged Git files.
- `.prettierrc`: Configuration file for Prettier code formatter.
- `.stylelintignore`: Specifies files and directories to be ignored by Stylelint.
- `.stylelintrc.json`: Configuration file for Stylelint.
- `LICENSE`: MIT License file.
- `README.md`: Project documentation (this file).
- `eslint.config.js`: Configuration file for ESLint.
- `index.html`: Main HTML file.
- `jsconfig.json`: Configuration file for JavaScript projects.
- `package-lock.json`: Automatically generated file for locking dependencies.
- `package.json`: Contains project metadata and dependencies.
- `postcss.config.js`: Configuration file for PostCSS.
- `stylelint-report.json`: JSON report file for Stylelint.
- `tsconfig.json`: TypeScript configuration file.
- `vite.config.ts`: Configuration file for Vite.
- `vitest.config.ts`: Configuration file for Vitest.

## 🛠️ Key Features

- **TypeScript**: Enhances JavaScript with static typing for improved developer experience.
- **Vite**: A fast build tool that offers rapid development and hot module replacement.
- **Vitest**: A blazing-fast unit testing framework.
- **ESLint**: A linter tool to identify and fix problems in JavaScript/TypeScript code.
- **Prettier**: An opinionated code formatter to ensure consistent code style.
- **Stylelint**: A linter for stylesheets to enforce consistent conventions and avoid errors.
- **PostCSS**: A tool for transforming CSS with JavaScript plugins.
- **Husky**: Git hooks made easy, enabling pre-commit hooks to run linters and tests.
- **Lint-staged**: Runs linters on staged Git files to ensure code quality before commits.
- **GitHub Actions**: Automates workflows, including continuous integration and deployment.

## 🚀 Getting Started

To get started with this project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/PavelMelnik94/boilerplate-frontend-2025.git
   cd boilerplate-frontend-2025
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

## 📦 Available Scripts

- `npm run dev`: Starts the development server with hot module replacement.
- `npm run build`: Builds the application for production.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs ESLint to analyze code for potential errors.
- `npm run format`: Formats code using Prettier.
- `npm run stylelint`: Lints CSS/SCSS files using Stylelint.
- `npm run test`: Runs unit tests using Vitest.

## ✅ Pre-commit Hooks

This project uses Husky and lint-staged to enforce code quality. Before each commit, the following checks are performed:

- Linting of staged JavaScript/TypeScript files using ESLint.
- Formatting of staged files using Prettier.
- Linting of staged CSS/SCSS files using Stylelint.

If any of these checks fail, the commit will be aborted to maintain code quality.

## 🐳 Docker

To build and run the project with Docker, follow these steps:

1. **Build the Docker image**:

   ```bash
   docker-compose build
   ```

2. **Run the Docker container**:

   ```bash
   docker-compose up
   ```

   The application will be available at `http://localhost:3000`.

3. **Stop the Docker container**:

   ```bash
   docker-compose down
   ```

## 🛡️ License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.

---

Happy coding! 🎉
