const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Add auto-generation of REQUIRED_VARS from .env.example
function generateRequiredVarsFromExample() {
  const envExample = fs.readFileSync(
    path.join(process.cwd(), '.env.example'),
    'utf8'
  );

  const vars = {};
  let isOptionalSection = false;

  envExample.split('\n').forEach(line => {
    if (line.toLowerCase().includes('# optional')) {
      isOptionalSection = true;
      return;
    }

    const match = line.match(/^([^#\s][^=]+)=(.+)$/);
    if (match) {
      const [, key, value] = match;
      vars[key.trim()] = {
        required: !isOptionalSection,
        type: value.startsWith('http') ? 'string' :
              !isNaN(value) ? 'number' : 'string',
        ...(value.startsWith('http') && { pattern: /^https?:\/\/.+/ }),
        ...(key === 'NODE_ENV' && { values: ['development', 'production', 'test'] })
      };
    }
  });

  return vars;
}

const REQUIRED_VARS = generateRequiredVarsFromExample();

function validateEnv() {
  console.log('🔍 Validating environment variables...');

  const errors = [];

  // Check for .env file
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    console.warn('⚠️ No .env file found, checking process.env');
  }

  // Validate each required variable
  Object.entries(REQUIRED_VARS).forEach(([varName, rules]) => {
    const value = process.env[varName];

    if (!value) {
      if (rules.required) {
        errors.push(`Missing ${varName}`);
      }
      return;
    }

    if (rules.type === 'number') {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        errors.push(`${varName} must be a number`);
      } else if (rules.min && numValue < rules.min) {
        errors.push(`${varName} must be >= ${rules.min}`);
      } else if (rules.max && numValue > rules.max) {
        errors.push(`${varName} must be <= ${rules.max}`);
      }
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      errors.push(`${varName} format is invalid`);
    }

    if (rules.values && !rules.values.includes(value)) {
      errors.push(`${varName} must be one of: ${rules.values.join(', ')}`);
    }
  });

  if (errors.length > 0) {
    console.error('❌ Environment validation failed:');
    errors.forEach(error => console.error(`  - ${error}`));
    process.exit(1);
  }

  console.log('✅ Environment variables validated successfully!');
}

validateEnv();
