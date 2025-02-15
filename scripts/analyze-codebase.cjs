const { execSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

// Ignored directories and files patterns
const IGNORED_PATTERNS = [
  'node_modules',
  '.git',
  'dist',
  'coverage',
  'build',
  '.DS_Store',
  'Thumbs.db',
]

function analyzeCodebase() {
  console.log('📊 Starting codebase analysis...')

  // Statistics object
  const stats = {
    totalFiles: 0,
    totalLines: 0,
    fileTypes: {},
    largestFiles: [],
    totalSize: 0,
  }

  // Count lines in a file
  function countLines(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8')
      // Handle different line endings (CRLF vs LF)
      return content.split(/\r\n|\r|\n/).length
    }
    catch (error) {
      console.warn(
        `⚠️ Warning: Could not read file ${filePath}:`,
        error.message,
      )
      return 0
    }
  }

  // Check if path should be ignored
  function shouldIgnore(pathToCheck) {
    return IGNORED_PATTERNS.some(pattern =>
      pathToCheck.includes(path.normalize(pattern)),
    )
  }

  // Walk through directory
  function walkDir(dir) {
    try {
      const files = fs.readdirSync(dir)

      files.forEach((file) => {
        const fullPath = path.join(dir, file)

        if (shouldIgnore(fullPath))
          return

        const stat = fs.statSync(fullPath)

        if (stat.isDirectory()) {
          walkDir(fullPath)
        }
        else if (stat.isFile()) {
          const ext = path.extname(file)
          const lines = countLines(fullPath)
          const size = stat.size

          stats.totalFiles++
          stats.totalLines += lines
          stats.totalSize += size
          stats.fileTypes[ext] = (stats.fileTypes[ext] || 0) + 1

          stats.largestFiles.push({
            path: path.relative(process.cwd(), fullPath),
            lines,
            size,
          })
        }
      })
    }
    catch (error) {
      console.warn(
        `⚠️ Warning: Could not process directory ${dir}:`,
        error.message,
      )
    }
  }

  try {
    // Start analysis from current directory
    walkDir(process.cwd())

    // Sort and limit largest files
    stats.largestFiles.sort((a, b) => b.size - a.size)
    stats.largestFiles = stats.largestFiles.slice(0, 10)

    // Print statistics
    console.log('\n📈 Codebase Statistics:')
    console.log(`Total Files: ${stats.totalFiles}`)
    console.log(`Total Lines: ${stats.totalLines}`)
    console.log(`Total Size: ${(stats.totalSize / 1024 / 1024).toFixed(2)} MB`)

    console.log('\n📊 File Types:')
    Object.entries(stats.fileTypes)
      .sort(([, a], [, b]) => b - a)
      .forEach(([ext, count]) => {
        console.log(`${ext || 'no extension'}: ${count} files`)
      })

    console.log('\n📑 Largest Files:')
    stats.largestFiles.forEach((file) => {
      console.log(`${file.path}:`)
      console.log(`  Size: ${(file.size / 1024).toFixed(2)} KB`)
      console.log(`  Lines: ${file.lines}`)
    })

    // Run security audit
    console.log('\n🔍 Running security audit...')
    try {
      execSync('npm audit', { stdio: 'inherit' })
    }
    catch {
      console.log('⚠️ Security vulnerabilities found')
    }
  }
  catch (error) {
    console.error('❌ Error analyzing codebase:', error.message)
    process.exit(1)
  }
}

analyzeCodebase()
