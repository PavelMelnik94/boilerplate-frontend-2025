const ts = require('typescript');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function generateApiDocs() {
  const API_SOURCE_DIR = path.join(process.cwd(), 'src', 'api');
  const DOCS_OUTPUT_DIR = path.join(process.cwd(), 'docs', 'api');
  const WIKI_DIR = path.join(process.cwd(), '.wiki');

  // Create necessary directories
  [DOCS_OUTPUT_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  function extractJSDocComment(node) {
    const jsDoc = ts.getJSDocTags(node);
    if (!jsDoc.length) return '';

    return jsDoc
      .map(tag => {
        const comment = tag.comment ? `: ${tag.comment}` : '';
        return `@${tag.tagName.text}${comment}`;
      })
      .join('\n');
  }

  function processNode(node, sourceFile) {
    let documentation = [];

    if (ts.isInterfaceDeclaration(node) || ts.isClassDeclaration(node) || ts.isTypeAliasDeclaration(node)) {
      const name = node.name?.text;
      const jsDoc = extractJSDocComment(node);
      const kind = ts.isInterfaceDeclaration(node) ? 'interface' :
                  ts.isClassDeclaration(node) ? 'class' : 'type';

      const members = [];

      if (node.members) {
        node.members.forEach(member => {
          if (ts.isPropertyDeclaration(member) || ts.isMethodDeclaration(member) || ts.isPropertySignature(member)) {
            const memberDoc = {
              name: member.name.getText(sourceFile),
              type: member.type ? member.type.getText(sourceFile) : 'any',
              optional: member.questionToken ? true : false,
              docs: extractJSDocComment(member),
              kind: ts.isMethodDeclaration(member) ? 'method' : 'property'
            };
            members.push(memberDoc);
          }
        });
      }

      documentation.push({
        kind,
        name,
        docs: jsDoc,
        members
      });
    }

    ts.forEachChild(node, child => {
      documentation = documentation.concat(processNode(child, sourceFile));
    });

    return documentation;
  }

  function generateMarkdown(docs) {
    let markdown = '# API Documentation\n\n';

    docs.forEach(doc => {
      markdown += `## ${doc.name}\n\n`;
      if (doc.docs) markdown += `${doc.docs}\n\n`;

      if (doc.members.length > 0) {
        markdown += '### Members\n\n';
        markdown += '| Name | Type | Kind | Optional | Description |\n';
        markdown += '|------|------|------|----------|-------------|\n';

        doc.members.forEach(member => {
          markdown += `| ${member.name} | \`${member.type}\` | ${member.kind} | ${member.optional ? 'Yes' : 'No'} | ${member.docs.replace(/\n/g, ' ')} |\n`;
        });
        markdown += '\n';
      }
    });

    return markdown;
  }

  try {
    const files = fs.readdirSync(API_SOURCE_DIR)
      .filter(file => /\.ts$/.test(file))
      .map(file => path.join(API_SOURCE_DIR, file));

    const program = ts.createProgram(files, {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
    });

    const documentation = {};

    program.getSourceFiles()
      .filter(sourceFile => !sourceFile.fileName.includes('node_modules'))
      .forEach(sourceFile => {
        const docs = processNode(sourceFile, sourceFile);
        if (docs.length > 0) {
          const filename = path.basename(sourceFile.fileName, '.ts');
          documentation[filename] = docs;
        }
      });

    // Generate markdown files
    Object.entries(documentation).forEach(([filename, docs]) => {
      const markdown = generateMarkdown(docs);
      fs.writeFileSync(
        path.join(DOCS_OUTPUT_DIR, `${filename}.md`),
        markdown
      );
    });

    // Generate index file
    const indexContent = Object.keys(documentation)
      .map(filename => `- [${filename}](./${filename}.md)`)
      .join('\n');

    fs.writeFileSync(
      path.join(DOCS_OUTPUT_DIR, 'index.md'),
      '# API Documentation Index\n\n' + indexContent
    );

    console.log('✅ API documentation generated successfully!');

    // Sync with GitHub Wiki if available
    if (fs.existsSync(WIKI_DIR)) {
      try {
        fs.cpSync(DOCS_OUTPUT_DIR, path.join(WIKI_DIR, 'api'), { recursive: true });
        process.chdir(WIKI_DIR);
        execSync('git add .');
        execSync('git commit -m "Update API documentation"');
        execSync('git push');
        console.log('✅ Documentation synced with GitHub Wiki');
      } catch (error) {
        console.warn('⚠️ Failed to sync with GitHub Wiki:', error.message);
      }
    }

  } catch (error) {
    console.error('❌ Error generating API documentation:', error);
    process.exit(1);
  }
}

generateApiDocs();
