const fs = require('fs');
const path = require('path');

// Directories to clean, platform-independent paths
const dirsToClean = [
  'node_modules',
  'dist',
  'coverage',
  '.eslintcache',
  '.vite',
  'build',
].map((dir) => path.normalize(dir));

// Files to clean, platform-independent paths
const filesToClean = [
  'npm-debug.log',
  'yarn-debug.log',
  'yarn-error.log',
  '.DS_Store',
  'Thumbs.db', // Windows thumbnail cache
].map((file) => path.normalize(file));

function cleanProject() {
  console.log('🧹 Starting project cleanup...');

  // Clean directories
  dirsToClean.forEach((dir) => {
    try {
      const dirPath = path.join(process.cwd(), dir);
      if (fs.existsSync(dirPath)) {
        console.log(`📁 Removing ${dir}...`);
        fs.rmSync(dirPath, { recursive: true, force: true });
      }
    } catch (error) {
      console.warn(
        `⚠️ Warning: Could not remove directory ${dir}:`,
        error.message,
      );
    }
  });

  // Clean files
  filesToClean.forEach((file) => {
    try {
      const filePath = path.join(process.cwd(), file);
      if (fs.existsSync(filePath)) {
        console.log(`📄 Removing ${file}...`);
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.warn(`⚠️ Warning: Could not remove file ${file}:`, error.message);
    }
  });

  console.log('✨ Cleanup complete!');
}

cleanProject();
