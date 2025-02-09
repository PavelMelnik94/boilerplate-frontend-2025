const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { repository } = require('../package.json');

function syncDocs() {
  const DOCS_DIR = path.join(process.cwd(), 'docs');
  const WIKI_DIR = path.join(process.cwd(), '.wiki');
  const DOCS_BACKUP_DIR = path.join(process.cwd(), 'docs-backup');
  const REPO_URL = repository.url.replace('git+', '').replace('.git', '');
  const WIKI_URL = `${REPO_URL}.wiki.git`;

  console.log('🔄 Syncing documentation...');

  // Ensure docs directory exists
  if (!fs.existsSync(DOCS_DIR)) {
    console.error('❌ Documentation directory not found. Run npm run docs first.');
    process.exit(1);
  }

  try {
    // Try to sync with GitHub Wiki
    if (!fs.existsSync(WIKI_DIR)) {
      try {
        execSync(`git clone ${WIKI_URL} ${WIKI_DIR}`, { stdio: 'pipe' });
        console.log('✅ Wiki repository cloned successfully');
      } catch (error) {
        console.log('ℹ️ GitHub Wiki not found. Creating local backup instead...');
        // Create backup directory if wiki sync fails
        if (!fs.existsSync(DOCS_BACKUP_DIR)) {
          fs.mkdirSync(DOCS_BACKUP_DIR, { recursive: true });
        }
        fs.cpSync(DOCS_DIR, DOCS_BACKUP_DIR, { recursive: true });
        console.log(`✅ Documentation backed up to ${DOCS_BACKUP_DIR}`);
        return;
      }
    }

    // If wiki exists, try to update it
    try {
      fs.cpSync(DOCS_DIR, WIKI_DIR, { recursive: true });

      const commands = [
        'git add .',
        'git commit -m "docs: update documentation"',
        'git push origin master'
      ];

      process.chdir(WIKI_DIR);

      commands.forEach(cmd => {
        try {
          execSync(cmd, { stdio: 'pipe' });
        } catch (error) {
          if (!error.message.includes('nothing to commit')) {
            throw error;
          }
        }
      });

      console.log('✅ Documentation successfully synced with GitHub Wiki!');
    } catch (error) {
      console.error('❌ Error updating wiki:', error.message);
      console.log('ℹ️ Creating local backup instead...');
      fs.cpSync(DOCS_DIR, DOCS_BACKUP_DIR, { recursive: true });
      console.log(`✅ Documentation backed up to ${DOCS_BACKUP_DIR}`);
    }
  } catch (error) {
    console.error('❌ Error syncing documentation:', error.message);
    process.exit(1);
  }
}

syncDocs();
