import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const KB_ROOT = path.resolve(process.cwd(), '..');

export interface KbArticle {
  slug: string;
  title: string;
  module: string;
  moduleLabel: string;
  tags: string[];
  created: string;
  updated: string;
  content: string;
  excerpt: string;
  wordCount: number;
  links: string[];
  filePath: string;
}

const MODULE_MAP: Record<string, string> = {
  '00-基础概念': '00', '01-投资流程': '01', '02-估值方法': '02',
  '03-法律与条款': '03', '04-行业赛道': '04', '05-尽职调查': '05',
  '06-投后管理': '06', '07-退出策略': '07', '08-中国VC-PE实务': '08',
  '09-风险与组合': '09', '10-案例库': '10', '11-工具与资源': '11',
};

export function getAllArticles(): KbArticle[] {
  const articles: KbArticle[] = [];
  
  for (const [dirName, moduleCode] of Object.entries(MODULE_MAP)) {
    const dirPath = path.join(KB_ROOT, dirName);
    if (!fs.existsSync(dirPath)) continue;
    
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);
      
      const title = data.title || content.match(/^#\s+(.+)/m)?.[1] || file.replace('.md', '');
      const links = [...content.matchAll(/\[\[([^\]]+)\]\]/g)].map(m => m[1]);
      const excerpt = content.replace(/^#[^\n]*\n/m, '').substring(0, 200).trim();
      
      articles.push({
        slug: `${dirName}/${file.replace('.md', '')}`,
        title,
        module: moduleCode,
        moduleLabel: dirName,
        tags: data.tags || [],
        created: data.created || '',
        updated: data.updated || '',
        content,
        excerpt,
        wordCount: content.length,
        links,
        filePath,
      });
    }
  }
  
  return articles;
}

export function getArticleBySlug(slug: string): KbArticle | undefined {
  const articles = getAllArticles();
  return articles.find(a => a.slug === slug);
}

export function getModules(): { code: string; label: string; count: number }[] {
  const articles = getAllArticles();
  return Object.entries(MODULE_MAP).map(([label, code]) => ({
    code,
    label,
    count: articles.filter(a => a.module === code).length,
  }));
}

export function searchArticles(query: string): KbArticle[] {
  const articles = getAllArticles();
  const q = query.toLowerCase();
  return articles.filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.content.toLowerCase().includes(q) ||
    a.tags.some(t => t.toLowerCase().includes(q))
  ).sort((a, b) => {
    const aTitle = a.title.toLowerCase().includes(q) ? 10 : 0;
    const bTitle = b.title.toLowerCase().includes(q) ? 10 : 0;
    return bTitle - aTitle;
  });
}
