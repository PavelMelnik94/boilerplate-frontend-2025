const fs = require('fs');
const path = require('path');

// Get component name from command line arguments
const componentName = process.argv[2];

// Validate component name
if (!componentName) {
  console.error('❌ Please provide a component name');
  process.exit(1);
}

function createComponent() {
  // Use path.join for cross-platform compatibility
  const componentDir = path.join(
    process.cwd(),
    'src',
    'components',
    componentName,
  );

  // Create component directory with recursive option
  fs.mkdirSync(componentDir, { recursive: true });

  // Template for the component file
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

  // Template for the styles file
  const styleContent = `.root {
  // Your styles here
}`;

  // Template for the test file
  const testContent = `import { describe, expect, it } from 'vitest';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('should render successfully', () => {
    expect(${componentName}).toBeTruthy();
  });
});`;

  // Template for the index file
  const indexContent = `export { ${componentName} } from './${componentName}';`;

  try {
    // Write all files using path.join for cross-platform compatibility
    fs.writeFileSync(
      path.join(componentDir, `${componentName}.tsx`),
      componentContent,
    );
    fs.writeFileSync(
      path.join(componentDir, `${componentName}.module.scss`),
      styleContent,
    );
    fs.writeFileSync(
      path.join(componentDir, `${componentName}.test.tsx`),
      testContent,
    );
    fs.writeFileSync(path.join(componentDir, 'index.ts'), indexContent);

    console.log(`✅ Component ${componentName} created successfully!`);
  } catch (error) {
    console.error('❌ Error creating component:', error.message);
    process.exit(1);
  }
}

createComponent();
