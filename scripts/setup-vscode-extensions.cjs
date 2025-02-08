const fs = require('fs');
const { execSync, exec } = require('child_process');
const path = require('path');
const os = require('os');

const extensions = {
  coreLinting: [
    ['dbaeumer.vscode-eslint', 'JavaScript/TypeScript linting engine'],
    ['esbenp.prettier-vscode', 'Code formatter for consistent style'],
    ['stylelint.vscode-stylelint', 'CSS/SCSS/Less linting'],
    ['clinyong.vscode-css-modules', 'CSS Modules support and autocomplete'],
    [
      'ms-vscode.vscode-typescript-next',
      'Enhanced TypeScript/JavaScript support',
    ],
    ['chamboug.js-auto-backticks', 'Auto converts quotes to backticks'],
    [
      'rvest.vs-code-prettier-eslint',
      'Combines Prettier and ESLint formatting',
    ],
    ['cipchk.cssrem', 'Converts px to rem units automatically'],
  ],
  typeScriptEnhancements: [
    ['streetsidesoftware.code-spell-checker', 'Spell checking for code'],
    ['christian-kohler.path-intellisense', 'Autocompletes filenames'],
    ['formulahendry.auto-rename-tag', 'Auto-renames HTML/XML tags'],
    ['christian-kohler.npm-intellisense', 'Autocompletes npm modules'],
  ],
  gitIntegration: [
    ['eamodio.gitlens', 'Git supercharged'],
    ['mhutchie.git-graph', 'Git repository visualization'],
  ],
  testingDebugging: [
    ['vitest.explorer', 'Vitest test runner'],
    ['usernamehw.errorlens', 'Inline error messages'],
  ],
  codeQuality: [
    ['naumovs.color-highlight', 'Color code highlighting'],
    ['wayou.vscode-todo-highlight', 'TODO comments highlight'],
    ['aaron-bond.better-comments', 'Categorized comments'],
    ['exodiusstudios.comment-anchors', 'Comment navigation'],
    ['pflannery.vscode-versionlens', 'Package version info'],
  ],
  security: [
    ['mikestead.dotenv', '.env file support'],
    ['yoavbls.pretty-ts-errors', 'Better TS errors'],
    ['deque-systems.vscode-axe-linter', 'Accessibility testing'],
    ['webhint.vscode-webhint', 'Performance hints'],
  ],
  uiEnhancements: [
    ['fontanaridaniel.cursor-like-theme', 'Modern cursor'],
    ['miguelsolorio.symbols', 'Custom file symbols'],
  ],
  specializedTools: [
    ['csstools.postcss', 'PostCSS support'],
    ['mrmlnc.vscode-scss', 'SCSS features'],
    ['bradlc.vscode-tailwindcss', 'Tailwind CSS support'],
    ['GraphQL.vscode-graphql', 'GraphQL support'],
    ['antfu.vite', 'Vite support'],
  ],
};

function isVSCodeInstalled() {
  try {
    if (process.platform === 'win32') {
      // Check Windows
      execSync('where code');
    } else {
      // Check macOS/Linux
      execSync('which code');
    }
    return true;
  } catch {
    return false;
  }
}

function installExtension(id, description) {
  return new Promise((resolve, reject) => {
    const command = `code --install-extension ${id}`;
    exec(command, (error, stdout, stderr) => {
      if (error && !stderr.includes('already installed')) {
        console.error(`❌ Failed to install ${id}: ${error.message}`);
        reject(error);
      } else {
        console.log(`✅ ${id} (${description})`);
        resolve();
      }
    });
  });
}

async function main() {
  // Check if VS Code is installed and accessible
  if (!isVSCodeInstalled()) {
    console.error('❌ VS Code CLI is not installed or not in PATH');
    console.log(`
    Please make sure VS Code is installed and the 'code' command is available:
    - Windows: Reinstall VS Code with the "Add to PATH" option
    - macOS: Open VS Code and run 'Install "code" command in PATH' from the command palette
    - Linux: Manually add VS Code to your PATH
    `);
    process.exit(1);
  }

  // Create .vscode directory with proper error handling
  const vscodePath = path.join(process.cwd(), '.vscode');
  try {
    if (!fs.existsSync(vscodePath)) {
      fs.mkdirSync(vscodePath, { recursive: true });
    }
  } catch (error) {
    console.error(`❌ Failed to create .vscode directory: ${error.message}`);
    process.exit(1);
  }

  // Generate and save extensions.json
  const recommendationsJson = {
    recommendations: Object.values(extensions)
      .flat()
      .map(([id]) => id),
  };

  try {
    fs.writeFileSync(
      path.join(vscodePath, 'extensions.json'),
      JSON.stringify(recommendationsJson, null, 2)
    );
    console.log('✅ Created .vscode/extensions.json');
  } catch (error) {
    console.error(`❌ Failed to write extensions.json: ${error.message}`);
    process.exit(1);
  }

  // Install extensions with progress indicator
  for (const [category, exts] of Object.entries(extensions)) {
    console.log(`\n📦 Installing ${category} extensions...`);
    try {
      // Install extensions in parallel for better performance
      await Promise.all(exts.map(([id, desc]) => installExtension(id, desc)));
    } catch (error) {
      console.error(`❌ Error in ${category} category: ${error.message}`);
    }
  }

  console.log('\n✨ Setup complete! Please restart VS Code to activate extensions.');
}

main().catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
