import { Stack, NavLink, Paper, Select, Badge } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useMarkdownDocs } from '../hooks/useMarkdownDocs';
import classes from './DocsSidebar.module.css';

interface DocsSidebarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export function DocsSidebar({ activeSection, onSectionChange }: DocsSidebarProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { articles, loading } = useMarkdownDocs();

  // Group articles by category
  const groupedArticles = articles.reduce((acc, article) => {
    const category = article.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(article);
    return acc;
  }, {} as Record<string, typeof articles>);

  if (loading) {
    return (
      <Paper shadow="sm" p="md" radius="md" className={classes.sidebar}>
        <div>Loading menu...</div>
      </Paper>
    );
  }

  if (isMobile) {
    return (
      <Paper shadow="sm" p="md" mb="xl" radius="md">
        <Select
          label="Navigate to section"
          placeholder="Choose a documentation section"
          data={articles.map(article => ({
            value: article.id,
            label: article.title
          }))}
          value={activeSection}
          onChange={(value) => value && onSectionChange(value)}
          searchable
        />
      </Paper>
    );
  }

  return (
    <Paper shadow="sm" p="md" radius="md" className={classes.sidebar}>
      <Stack gap="md">
        {Object.entries(groupedArticles).map(([category, categoryArticles]) => (
          <div key={category}>
            {Object.keys(groupedArticles).length > 1 && (
              <Badge variant="light" size="sm" mb="xs">
                {category}
              </Badge>
            )}
            <Stack gap="xs">
              {categoryArticles.map((article) => (
                <NavLink
                  key={article.id}
                  label={article.title}
                  active={activeSection === article.id}
                  onClick={() => onSectionChange(article.id)}
                  className={classes.navLink}
                />
              ))}
            </Stack>
          </div>
        ))}
      </Stack>
    </Paper>
  );
}