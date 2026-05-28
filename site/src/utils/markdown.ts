import MarkdownIt from 'markdown-it';

/**
 * Process Obsidian-style wikilinks [[target]] and [[target|label]]
 * into standard markdown links.
 */
export function processWikilinks(content: string, slugMap: Map<string, string>): string {
  return content.replace(
    /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,
    (_match, target, label) => {
      const display = label || target;
      const slug = slugMap.get(target);
      if (slug) {
        return `[${display}](/articles/${slug}/)`;
      }
      // If we can't resolve the link, still make it clickable to search
      return `[${display}](/search/?q=${encodeURIComponent(target)})`;
    }
  );
}

/**
 * Process Obsidian callout blocks: > [!type] title
 */
export function processCallouts(content: string): string {
  return content.replace(
    /^>\s*\[!([\w-]+)\]\s*(.*)$/gm,
    (_match, type, title) => {
      const typeMap: Record<string, string> = {
        tip: '💡',
        info: 'ℹ️',
        warning: '⚠️',
        danger: '🚨',
        note: '📝',
        quote: '💬',
        important: '❗',
        question: '❓',
      };
      const icon = typeMap[type] || '📌';
      return `<blockquote class="callout callout-${type}"><div class="callout-title">${icon} ${title}</blockquote>`;
    }
  );
}

/**
 * Convert markdown to HTML
 */
export function markdownToHtml(content: string): string {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: false,
  });

  // Custom table rendering with wrapper
  const defaultTableOpen = md.renderer.rules.table_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };
  const defaultTableClose = md.renderer.rules.table_close || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.table_open = function(tokens, idx, options, env, self) {
    return '<div class="table-wrapper"><table';
  };
  md.renderer.rules.table_close = function(tokens, idx, options, env, self) {
    return '</table></div>';
  };

  // Add id to headings
  md.renderer.rules.heading_open = function(tokens, idx, options, env, self) {
    const token = tokens[idx];
    const nextToken = tokens[idx + 1];
    if (nextToken && nextToken.children && nextToken.children.length > 0) {
      const text = nextToken.children
        .filter(t => t.type === 'text' || t.type === 'code_inline')
        .map(t => t.content)
        .join('');
      const slug = text
        .toLowerCase()
        .replace(/[^\w一-鿿]+/g, '-')
        .replace(/^-+|-+$/g, '');
      token.attrSet('id', slug);
    }
    return self.renderToken(tokens, idx, options);
  };

  return md.render(content);
}

/**
 * Format a date string for display
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

/**
 * Estimate reading time in minutes
 */
export function readingTime(wordCount: number): number {
  // Chinese reading speed ~400 chars/min
  return Math.max(1, Math.ceil(wordCount / 400));
}

/**
 * Format word count for display
 */
export function formatWordCount(count: number): string {
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}万字`;
  }
  return `${count}字`;
}
