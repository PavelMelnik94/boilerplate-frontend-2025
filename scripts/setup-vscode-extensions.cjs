const { execSync, exec } = require("child_process");
const path = require("path");
const fs = require("fs");

// Core extensions only - minimal required set
const extensions = {
  essential: [
    ["dbaeumer.vscode-eslint", "ESLint"],
    ["github.copilot", "Copilot"],
    ["github.copilot-chat", "Copilot Chat"],
    ["esbenp.prettier-vscode", "Prettier"],
    ["stylelint.vscode-stylelint", "Stylelint"],
    ["bradlc.vscode-tailwindcss", "Tailwind"],
  ],
};

// Extensions to be removed
const unwantedExtensions = [
  "steoates.autoimport",
  "pmneo.tsimporter",
  "xabikos.javascriptsnippets",
  "visualstudioexptteam.intellicode-api-usage-examples",
  "visualstudioexptteam.vscodeintellicode",
  "webhint.vscode-webhint",
  "wix.vscode-import-cost",
  "hookyqr.beautify",
  "rvest.vs-code-prettier-eslint",
  "planbcoding.vscode-react-refactor",
  "christian-kohler.path-intellisense",
  "formulahendry.auto-rename-tag",
  "christian-kohler.npm-intellisense",
  "chamboug.js-auto-backticks",
  "cipchk.cssrem",
];

// Check VS Code CLI availability
const isVSCodeInstalled = () => {
  try {
    execSync(process.platform === "win32" ? "where code" : "which code");
    return true;
  } catch {
    return false;
  }
};

// Execute VS Code CLI command with retry
const executeVSCodeCommand = async (command) => {
  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      resolve({ error, stdout, stderr });
    });
  });
};

// Main function
async function main() {
  if (!isVSCodeInstalled()) {
    console.error("❌ VS Code CLI not found in PATH");
    process.exit(1);
  }

  // Create .vscode/extensions.json
  const vscodePath = path.join(process.cwd(), ".vscode");
  !fs.existsSync(vscodePath) && fs.mkdirSync(vscodePath, { recursive: true });

  // Write config
  fs.writeFileSync(
    path.join(vscodePath, "extensions.json"),
    JSON.stringify(
      {
        recommendations: extensions.essential.map(([id]) => id),
        unwantedRecommendations: unwantedExtensions,
      },
      null,
      2,
    ),
  );

  // Batch uninstall unwanted
  console.log("🗑️ Removing unwanted extensions...");
  const uninstallPromises = unwantedExtensions.map((id) =>
    executeVSCodeCommand(`code --uninstall-extension ${id}`),
  );
  await Promise.all(uninstallPromises);

  // Batch install recommended
  console.log("📦 Installing essential extensions...");
  const installPromises = extensions.essential.map(([id]) =>
    executeVSCodeCommand(`code --install-extension ${id}`),
  );
  await Promise.all(installPromises);

  console.log("✨ Done! Restart VS Code to apply changes.");
}

main().catch(console.error);
