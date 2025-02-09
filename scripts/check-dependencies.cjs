const { execSync } = require('child_process');
const readline = require('readline');
const path = require('path');
const os = require('os');

/**
 * Cross-platform command execution with error handling
 * @param {string} command Command to execute
 * @returns {string} Command output
 */
function executeCommand(command) {
  try {
    return execSync(command, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true,
    });
  } catch (error) {
    if (error.stderr) console.error(error.stderr.toString());
    throw error;
  }
}

function checkDependencies() {
  console.log('🔍 Checking for outdated dependencies...');

  try {
    // Use npm outdated for checking dependencies
    const outdated = executeCommand('npm outdated --json');
    const outdatedDeps = JSON.parse(outdated || '{}');

    if (Object.keys(outdatedDeps).length === 0) {
      console.log('✅ All dependencies are up to date!');
      return;
    }

    // Display outdated packages
    console.log('\n📦 Found outdated packages:');
    Object.entries(outdatedDeps).forEach(([pkg, info]) => {
      console.log(`
        Package: ${pkg}
        Current: ${info.current}
        Latest: ${info.latest}
        Type: ${info.type}
        Homepage: ${info.homepage || 'N/A'}
      `);
    });

    // Create cross-platform readline interface
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Ask for update confirmation
    rl.question(
      '\nWould you like to update these packages? (y/n) ',
      (answer) => {
        if (answer.toLowerCase() === 'y') {
          console.log('\n🚀 Updating packages...');

          try {
            // Run npm update with detailed output
            executeCommand('npm update --verbose');
            console.log('✅ Packages updated successfully!');

            // Run npm outdated again to verify updates
            const remainingUpdates = executeCommand('npm outdated --json');
            if (Object.keys(JSON.parse(remainingUpdates || '{}')).length > 0) {
              console.log(
                '⚠️ Some packages may need manual update due to major version changes.',
              );
            }
          } catch (error) {
            console.error('❌ Error updating packages:', error.message);
          }
        }
        rl.close();
      },
    );
  } catch (error) {
    console.error('❌ Error checking dependencies:', error.message);
    process.exit(1);
  }
}

checkDependencies();
