const fs = require('fs');
const path = require('path');

// Get component name from command line arguments
const componentName = process.argv[2];

// Validate component name
if (!componentName) {
  console.error('❌ Please provide a component name');
  process.exit(1);
}

// Validate component name format
const isValidComponentName = (name) => {
  // Allow only alphanumeric characters and PascalCase
  const validNamePattern = /^[A-Z][a-zA-Z0-9]*$/;
  return validNamePattern.test(name);
};

// Sanitize file path to prevent path traversal
const getSafePath = (basePath, ...parts) => {
  const targetPath = path.normalize(path.join(basePath, ...parts));
  if (!targetPath.startsWith(basePath)) {
    throw new Error('Invalid path: Possible path traversal attempt detected');
  }
  return targetPath;
};

function createComponent() {
  // Validate component name
  if (!isValidComponentName(componentName)) {
    console.error(
      '❌ Invalid component name. Use PascalCase (e.g., MyComponent)',
    );
    process.exit(1);
  }

  // Define base directory for components
  const baseDir = path.join(process.cwd(), 'src', 'components');

  try {
    // Create safe component directory path
    const componentDir = getSafePath(baseDir, componentName);

    // Ensure the target directory is within the components directory
    if (!componentDir.startsWith(baseDir)) {
      throw new Error('Invalid component path');
    }

    // Create component directory with recursive option
    fs.mkdirSync(componentDir, { recursive: true });

    // Template contents remain the same
    const componentContent = `import { FC } from 'react';
import styles from './${componentName}.module.scss';

interface ${componentName}Props {
  // Define your props here
}

export const ${componentName}: FC<${componentName}Props> = () => {
  return (
    <div className={styles.root}>
      ${componentName}
    </div>
  );
};
`;

    const styleContent = `.root {
  // Your styles here
}`;

    const testContent = `import { describe, expect, it } from 'vitest';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('should render successfully', () => {
    expect(${componentName}).toBeTruthy();
  });
});`;

    const indexContent = `export { ${componentName} } from './${componentName}';`;

    // Write files using safe paths
    const files = [
      { name: `${componentName}.tsx`, content: componentContent },
      { name: `${componentName}.module.scss`, content: styleContent },
      { name: `${componentName}.test.tsx`, content: testContent },
      { name: 'index.ts', content: indexContent },
    ];

    for (const file of files) {
      const filePath = getSafePath(componentDir, file.name);
      fs.writeFileSync(filePath, file.content);
    }

    console.log(`✅ Component ${componentName} created successfully!`);
  } catch (error) {
    console.error('❌ Error creating component:', error.message);
    process.exit(1);
  }
}

createComponent();
