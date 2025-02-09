const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(process.cwd(), 'src', 'config');
const FLAGS_FILE = 'featureFlags.json';

// Example usage:
// node feature-flags.cjs add darkMode    - adds new feature flag
// node feature-flags.cjs enable darkMode  - enables feature
// node feature-flags.cjs list            - shows all flags

function manageFeatureFlags() {
  const command = process.argv[2];
  const flagName = process.argv[3];

  if (!['list', 'enable', 'disable', 'add'].includes(command)) {
    console.error('❌ Valid commands: list, enable, disable, add');
    process.exit(1);
  }

  try {
    // Ensure config directory exists
    if (!fs.existsSync(CONFIG_PATH)) {
      fs.mkdirSync(CONFIG_PATH, { recursive: true });
    }

    // Add example usage in features object
    const defaultFlags = {
      darkMode: false,
      betaFeatures: false,
      newUserInterface: false
    };

    // Load or create flags file
    const flagsPath = path.join(CONFIG_PATH, FLAGS_FILE);
    let flags = defaultFlags;

    if (fs.existsSync(flagsPath)) {
      flags = { ...defaultFlags, ...JSON.parse(fs.readFileSync(flagsPath, 'utf8')) };
    }

    switch (command) {
      case 'list':
        console.log('\n📑 Feature Flags:');
        Object.entries(flags).forEach(([flag, enabled]) => {
          console.log(`${flag}: ${enabled ? '✅ enabled' : '❌ disabled'}`);
        });
        break;

      case 'enable':
      case 'disable':
        if (!flagName || !flags.hasOwnProperty(flagName)) {
          console.error('❌ Flag does not exist');
          process.exit(1);
        }
        flags[flagName] = command === 'enable';
        break;

      case 'add':
        if (!flagName) {
          console.error('❌ Please provide a flag name');
          process.exit(1);
        }
        if (flags.hasOwnProperty(flagName)) {
          console.error('❌ Flag already exists');
          process.exit(1);
        }
        flags[flagName] = false; // disabled by default
        break;
    }

    // Save changes
    fs.writeFileSync(flagsPath, JSON.stringify(flags, null, 2));

    // Generate TypeScript type definitions
    const tsContent = `// Auto-generated feature flags types
export interface FeatureFlags {
  ${Object.keys(flags).map((flag,) => `readonly ${flag}: boolean;`).join('\n  ')}
}

export const featureFlags: FeatureFlags = ${JSON.stringify(flags, null, 2)} as const;
`;

    fs.writeFileSync(
      path.join(CONFIG_PATH, 'featureFlags.ts'),
      tsContent.replace(/"/g, '')
     .replace(/(.*)(\n)(\s*)}(\s*)as(\s*)const(\s*)/g, '$1,$2$3}$4as$5const$6')

    );

    console.log('✅ Feature flags updated successfully!');
  } catch (error) {
    console.error('❌ Error managing feature flags:', error.message);
    process.exit(1);
  }
}

manageFeatureFlags();

// Add example of usage in comments
/*
Example usage in React:

import { featureFlags } from '@/config/featureFlags';

function App() {
  return (
    <div>
      {featureFlags.darkMode && <DarkModeToggle />}
      {featureFlags.betaFeatures && <BetaFeatures />}
    </div>
  );
}
*/
