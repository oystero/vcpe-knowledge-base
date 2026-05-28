/**
 * fetch-content.mjs
 * Reads all .md files from the knowledge base, parses frontmatter and content,
 * then generates a single JSON data file for the Astro site.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KB_ROOT = path.resolve(__dirname, '..', '..');
const OUTPUT_DIR = path.resolve(__dirname, '..', 'src', 'data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'articles.json');

// Module definitions
const MODULES = {
  '00-基础概念': { id: '00', name: '基础概念', icon: '📚', description: 'VC/PE 行业核心概念与框架' },
  '01-投资流程': { id: '01', name: '投资流程', icon: '🔄', description: '从项目发现到交割的完整流程' },
  '02-估值方法': { id: '02', name: '估值方法', icon: '💵', description: '企业估值的核心方法论' },
  '03-法律与条款': { id: '03', name: '法律与条款', icon: '📜', description: '投资协议与法律保护条款' },
  '04-行业赛道': { id: '04', name: '行业赛道', icon: '🏭', description: '重点行业分析与投资逻辑' },
  '05-尽职调查': { id: '05', name: '尽职调查', icon: '🔍', description: '尽调方法论与清单' },
  '06-投后管理': { id: '06', name: '投后管理', icon: '🤝', description: '投后赋能与监控体系' },
  '07-退出策略': { id: '07', name: '退出策略', icon: '🚪', description: '退出路径与回报实现' },
  '08-中国VC-PE实务': { id: '08', name: '中国VC/PE实务', icon: '🇨🇳', description: '本土化监管与实务要点' },
  '09-风险与组合': { id: '09', name: '风险与组合', icon: '📊', description: '风险管理与组合构建' },
  '10-案例库': { id: '10', name: '案例库', icon: '📖', description: '真实投资案例分析' },
  '11-工具与资源': { id: '11', name: '工具与资源', icon: '🛠️', description: '实用工具与学习资源' },
};

function getModuleFromPath(filePath) {
  const relative = path.relative(KB_ROOT, filePath);
  const parts = relative.split(path.sep);
  if (parts.length > 1) {
    const folder = parts[0];
    if (MODULES[folder]) {
      return { folder, ...MODULES[folder] };
    }
  }
  return null;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w一-鿿]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function collectMarkdownFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip hidden dirs, .obsidian, site
      if (entry.name.startsWith('.') || entry.name === 'site') continue;
      results.push(...collectMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(fullPath);
    }
  }
  return results;
}

function processFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(raw);

  const module = getModuleFromPath(filePath);
  const relativePath = path.relative(KB_ROOT, filePath);
  const fileName = path.basename(filePath, '.md');

  // Extract title from first H1 or filename
  const h1Match = content.match(/^#\s+(.+)$/m);
  const title = h1Match ? h1Match[1].replace(/[#*_`]/g, '').trim() : fileName;

  // Extract excerpt: first paragraph after H1
  let excerpt = '';
  const afterH1 = content.replace(/^#\s+.+$/m, '').trim();
  const firstPara = afterH1.split(/\n\n+/).find(p =>
    p.trim() && !p.startsWith('#') && !p.startsWith('>') && !p.startsWith('|') && !p.startsWith('```')
  );
  if (firstPara) {
    excerpt = firstPara.replace(/[\[\]()#*_`]/g, '').trim().slice(0, 200);
  }

  // Count words (approximate for Chinese)
  const wordCount = content.replace(/\s/g, '').length;

  // Extract wikilinks
  const wikilinks = [];
  const linkRegex = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    if (!wikilinks.includes(match[1])) {
      wikilinks.push(match[1]);
    }
  }

  // Extract headings for TOC
  const headings = [];
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2].replace(/[#*_`]/g, '').trim(),
      slug: slugify(match[2].replace(/[#*_`]/g, '').trim()),
    });
  }

  return {
    id: slugify(fileName),
    title,
    excerpt,
    slug: slugify(fileName),
    module: module ? module.id : '00',
    moduleName: module ? module.name : '其他',
    moduleFolder: module ? module.folder : '',
    relativePath,
    tags: frontmatter.tags || [],
    created: frontmatter.created || '',
    updated: frontmatter.updated || frontmatter.created || '',
    type: frontmatter.type || 'article',
    status: frontmatter.status || 'published',
    wordCount,
    wikilinks,
    headings,
    content,
  };
}

// Main
console.log('📂 Scanning knowledge base at:', KB_ROOT);

if (!fs.existsSync(KB_ROOT)) {
  console.error('❌ Knowledge base directory not found:', KB_ROOT);
  process.exit(1);
}

const mdFiles = collectMarkdownFiles(KB_ROOT);
console.log(`📄 Found ${mdFiles.length} markdown files`);

const articles = mdFiles
  .map(f => {
    try {
      return processFile(f);
    } catch (err) {
      console.warn(`⚠️  Error processing ${f}:`, err.message);
      return null;
    }
  })
  .filter(Boolean);

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Write the JSON
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(articles, null, 2), 'utf-8');
console.log(`✅ Wrote ${articles.length} articles to ${OUTPUT_FILE}`);

// Write modules metadata
const modulesFile = path.join(OUTPUT_DIR, 'modules.json');
const modulesData = Object.entries(MODULES).map(([folder, info]) => ({
  ...info,
  folder,
  count: articles.filter(a => a.moduleFolder === folder).length,
}));
fs.writeFileSync(modulesFile, JSON.stringify(modulesData, null, 2), 'utf-8');
console.log(`✅ Wrote modules metadata to ${modulesFile}`);

// Write tags index
const tagsMap = {};
for (const article of articles) {
  for (const tag of article.tags) {
    if (!tagsMap[tag]) tagsMap[tag] = [];
    tagsMap[tag].push(article.id);
  }
}
const tagsFile = path.join(OUTPUT_DIR, 'tags.json');
fs.writeFileSync(tagsFile, JSON.stringify(tagsMap, null, 2), 'utf-8');
console.log(`✅ Wrote ${Object.keys(tagsMap).length} tags to ${tagsFile}`);
