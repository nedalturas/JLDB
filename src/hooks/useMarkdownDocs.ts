import { useState, useEffect } from 'react';

export interface DocArticle {
  id: string;
  title: string;
  content: string;
  order?: number;
  category?: string;
}

export function useMarkdownDocs() {
  const [articles, setArticles] = useState<DocArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMarkdownFiles = async () => {
      try {
        setLoading(true);
        setError(null);

        // Import all markdown files from the docs directory
        const markdownModules = import.meta.glob('/src/docs/*.md', { 
          query: '?raw',
          import: 'default'
        });

        const loadedArticles: DocArticle[] = [];

        for (const [path, moduleLoader] of Object.entries(markdownModules)) {
          try {
            const content = await moduleLoader() as string;
            
            // Extract filename without extension for ID
            const filename = path.split('/').pop()?.replace('.md', '') || '';
            
            // Parse frontmatter if it exists
            const { frontmatter, content: articleContent } = parseFrontmatter(content);
            
            const article: DocArticle = {
              id: filename,
              title: frontmatter.title || formatTitle(filename),
              content: articleContent,
              order: frontmatter.order || 999,
              category: frontmatter.category || 'General'
            };

            loadedArticles.push(article);
          } catch (err) {
            console.warn(`Failed to load markdown file ${path}:`, err);
          }
        }

        // Sort articles by order, then by title
        loadedArticles.sort((a, b) => {
          if (a.order !== b.order) {
            return (a.order || 999) - (b.order || 999);
          }
          return a.title.localeCompare(b.title);
        });

        setArticles(loadedArticles);
      } catch (err) {
        console.error('Error loading markdown files:', err);
        setError(err instanceof Error ? err.message : 'Failed to load documentation');
      } finally {
        setLoading(false);
      }
    };

    loadMarkdownFiles();
  }, []);

  return { articles, loading, error };
}

// Parse frontmatter from markdown content
function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content };
  }

  const frontmatterText = match[1];
  const articleContent = match[2];
  
  // Simple YAML-like parsing for frontmatter
  const frontmatter: Record<string, any> = {};
  
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      const cleanValue = value.replace(/^["']|["']$/g, '');
      
      // Convert to number if it's a number
      if (/^\d+$/.test(cleanValue)) {
        frontmatter[key] = parseInt(cleanValue, 10);
      } else {
        frontmatter[key] = cleanValue;
      }
    }
  });

  return { frontmatter, content: articleContent };
}

// Format filename to readable title
function formatTitle(filename: string): string {
  return filename
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}