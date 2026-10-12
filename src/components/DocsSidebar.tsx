import { useState, useMemo } from 'react';
import {
  Text,
  TextInput,
  Badge,
  ActionIcon,
  Button,
  Loader,
  Stack,
  Tooltip,
} from '@mantine/core';
import {
  IconSearch,
  IconX,
  IconList,
  IconChevronRight,
  IconArticleOff,
} from '@tabler/icons-react';
import { useMarkdownDocs, DocArticle } from '../hooks/useMarkdownDocs';
import { getArticleIcon, getCategoryIcon } from '../utils/docsIcons';
import classes from './DocsSidebar.module.css';

interface DocsSidebarProps {
  articles?: DocArticle[];
  loading?: boolean;
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export function DocsSidebar({
  articles: propArticles,
  loading: propLoading,
  activeSection,
  onSectionChange,
}: DocsSidebarProps) {
  const fallbackDocs = useMarkdownDocs();
  const articles = propArticles ?? fallbackDocs.articles;
  const loading = propLoading ?? fallbackDocs.loading;

  const [searchQuery, setSearchQuery] = useState('');

  // Filter articles by search query
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles;
    const query = searchQuery.toLowerCase().trim();
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        (article.category && article.category.toLowerCase().includes(query)) ||
        article.id.toLowerCase().includes(query)
    );
  }, [articles, searchQuery]);

  // Group filtered articles by category
  const groupedArticles = useMemo(() => {
    return filteredArticles.reduce((acc, article) => {
      const category = article.category || 'General';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(article);
      return acc;
    }, {} as Record<string, DocArticle[]>);
  }, [filteredArticles]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className={classes.sidebarCard}>
        <div className={classes.sidebarHeader}>
          <div className={classes.headerTitleRow}>
            <span className={classes.headerTitle}>
              <IconList size={16} className={classes.headerIcon} />
              Documentation
            </span>
          </div>
        </div>
        <Stack align="center" justify="center" py="xl" gap="sm">
          <Loader size="sm" />
          <Text size="xs" c="dimmed">
            Loading articles...
          </Text>
        </Stack>
      </div>
    );
  }

  const categoryEntries = Object.entries(groupedArticles);
  const totalCount = articles.length;

  return (
    <nav className={classes.sidebarCard} aria-label="Documentation navigation">
      <div className={classes.sidebarHeader}>
        <div className={classes.headerTitleRow}>
          <span className={classes.headerTitle}>
            <IconList size={16} className={classes.headerIcon} />
            Documentation
          </span>
          <Badge size="sm" variant="light" color="primary" radius="sm">
            {totalCount} {totalCount === 1 ? 'doc' : 'docs'}
          </Badge>
        </div>

        <div className={classes.searchWrapper}>
          <TextInput
            placeholder="Search docs..."
            size="xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            leftSection={<IconSearch size={14} stroke={1.8} />}
            rightSection={
              searchQuery ? (
                <ActionIcon
                  size="xs"
                  variant="subtle"
                  color="gray"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                >
                  <IconX size={12} />
                </ActionIcon>
              ) : null
            }
          />
        </div>
      </div>

      <div className={classes.scrollArea}>
        {categoryEntries.length === 0 ? (
          <div className={classes.emptySearch}>
            <IconArticleOff size={28} stroke={1.5} opacity={0.6} />
            <Text size="xs" fw={500}>
              No docs match "{searchQuery}"
            </Text>
            <Button
              size="compact-xs"
              variant="subtle"
              color="primary"
              onClick={handleClearSearch}
            >
              Clear filter
            </Button>
          </div>
        ) : (
          categoryEntries.map(([category, categoryArticles]) => (
            <div key={category} className={classes.categorySection}>
              <div className={classes.categoryHeader}>
                <span className={classes.categoryLabel}>
                  <span className={classes.categoryIcon}>
                    {getCategoryIcon(category, 13)}
                  </span>
                  {category}
                </span>
                <Badge size="xs" variant="outline" color="gray" radius="xl">
                  {categoryArticles.length}
                </Badge>
              </div>

              {categoryArticles.map((article) => {
                const isActive = activeSection === article.id;
                return (
                  <button
                    key={article.id}
                    type="button"
                    className={classes.navItem}
                    data-active={isActive ? 'true' : undefined}
                    onClick={() => onSectionChange(article.id)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {isActive && <span className={classes.activeIndicator} />}
                    <span className={classes.navItemIcon}>
                      {getArticleIcon(article.id, article.category, 15)}
                    </span>
                    <span className={classes.navItemText}>
                      {article.title}
                    </span>
                    {isActive && (
                      <Tooltip label="Current article" position="right" withArrow>
                        <IconChevronRight size={14} style={{ opacity: 0.7 }} />
                      </Tooltip>
                    )}
                  </button>
                );
              })}
            </div>
          ))
        )}
      </div>
    </nav>
  );
}