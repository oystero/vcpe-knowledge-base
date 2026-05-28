/**
 * Content utility functions for loading and querying article data.
 */

import articlesData from '../data/articles.json';
import modulesData from '../data/modules.json';
import tagsData from '../data/tags.json';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  module: string;
  moduleName: string;
  moduleFolder: string;
  relativePath: string;
  tags: string[];
  created: string;
  updated: string;
  type: string;
  status: string;
  wordCount: number;
  wikilinks: string[];
  headings: { level: number; text: string; slug: string }[];
  content: string;
}

export interface Module {
  id: string;
  name: string;
  icon: string;
  description: string;
  folder: string;
  count: number;
}

export const articles: Article[] = articlesData as Article[];
export const modules: Module[] = modulesData as Module[];
export const tags: Record<string, string[]> = tagsData as Record<string, string[]>;

/**
 * Get all unique tags with counts
 */
export function getTagCounts(): { tag: string; count: number }[] {
  return Object.entries(tags)
    .map(([tag, ids]) => ({ tag, count: ids.length }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get article by slug
 */
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}

/**
 * Get articles by module
 */
export function getArticlesByModule(moduleId: string): Article[] {
  return articles.filter(a => a.module === moduleId);
}

/**
 * Get articles by tag
 */
export function getArticlesByTag(tag: string): Article[] {
  const articleIds = tags[tag] || [];
  return articles.filter(a => articleIds.includes(a.id));
}

/**
 * Get related articles based on shared tags and wikilinks
 */
export function getRelatedArticles(article: Article, limit = 5): Article[] {
  const scores: Map<string, number> = new Map();

  for (const other of articles) {
    if (other.id === article.id) continue;

    let score = 0;

    // Shared tags
    const sharedTags = article.tags.filter(t => other.tags.includes(t));
    score += sharedTags.length * 2;

    // Wikilink connections (bidirectional)
    if (article.wikilinks.includes(other.title)) score += 3;
    if (other.wikilinks.includes(article.title)) score += 3;

    // Same module
    if (article.module === other.module) score += 1;

    if (score > 0) {
      scores.set(other.id, score);
    }
  }

  return Array.from(scores.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id]) => articles.find(a => a.id === id))
    .filter(Boolean) as Article[];
}

/**
 * Build slug map for wikilink resolution
 */
export function buildSlugMap(): Map<string, string> {
  const map = new Map<string, string>();
  for (const article of articles) {
    map.set(article.title, article.slug);
    // Also map by filename without extension
    const fileName = article.relativePath.replace(/\.md$/, '').split(/[/\\]/).pop();
    if (fileName && fileName !== article.title) {
      map.set(fileName, article.slug);
    }
  }
  return map;
}

/**
 * Get statistics for the knowledge base
 */
export function getStats() {
  const totalWords = articles.reduce((sum, a) => sum + a.wordCount, 0);
  const totalTags = Object.keys(tags).length;
  const uniqueWikilinks = new Set(articles.flatMap(a => a.wikilinks)).size;

  return {
    totalArticles: articles.length,
    totalModules: modules.length,
    totalWords,
    totalTags,
    uniqueWikilinks,
    avgWordCount: Math.round(totalWords / articles.length),
  };
}

/**
 * Get graph data for D3 visualization
 */
export function getGraphData() {
  const nodes = articles.map(a => ({
    id: a.id,
    title: a.title,
    module: a.module,
    moduleName: a.moduleName,
    tags: a.tags,
    wordCount: a.wordCount,
  }));

  const links: { source: string; target: string; strength: number }[] = [];
  const linkSet = new Set<string>();

  for (const article of articles) {
    for (const linkTitle of article.wikilinks) {
      const target = articles.find(
        a => a.title === linkTitle || a.slug === linkTitle
      );
      if (target) {
        const key = [article.id, target.id].sort().join('---');
        if (!linkSet.has(key)) {
          linkSet.add(key);
          links.push({
            source: article.id,
            target: target.id,
            strength: 1,
          });
        }
      }
    }
  }

  return { nodes, links };
}
