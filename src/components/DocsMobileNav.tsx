import { useState, useMemo } from 'react';
import {
  Drawer,
  TextInput,
  Badge,
  ActionIcon,
  Button,
  Group,
  Text,
  Tooltip,
  Box,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconMenu2,
  IconChevronLeft,
  IconChevronRight,
  IconSearch,
  IconX,
  IconBook,
  IconCheck,
  IconArticleOff,
} from '@tabler/icons-react';
import { DocArticle } from '../hooks/useMarkdownDocs';
import { getArticleIcon, getCategoryIcon } from '../utils/docsIcons';
import classes from './DocsMobileNav.module.css';

interface DocsMobileNavProps {
  articles: DocArticle[];
  loading?: boolean;
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export function DocsMobileNav({
  articles,
  loading,
  activeSection,
  onSectionChange,
}: DocsMobileNavProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Find current article and position
  const currentIndex = useMemo(() => {
    return articles.findIndex((a) => a.id === activeSection);
  }, [articles, activeSection]);

  const currentArticle = articles[currentIndex] || articles[0];
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex >= 0 && currentIndex < articles.length - 1
      ? articles[currentIndex + 1]
      : null;

  // Filter articles inside Drawer
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

  const handleSelect = (sectionId: string) => {
    onSectionChange(sectionId);
    close();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  if (loading || articles.length === 0) {
    return null;
  }

  const categoryEntries = Object.entries(groupedArticles);

  return (
    <>
      <Box className={classes.mobileStickyBar} hiddenFrom="md">
        <div className={classes.mobileBarInner}>
          {/* Main button: tap to open Drawer */}
          <button
            type="button"
            className={classes.drawerTriggerBtn}
            onClick={open}
            aria-label="Open documentation navigation menu"
          >
            <span className={classes.triggerMenuIcon}>
              <IconMenu2 size={20} stroke={2} />
            </span>
            <div className={classes.triggerInfo}>
              <span className={classes.triggerCategory}>
                {currentArticle?.category || 'Documentation'}
              </span>
              <span className={classes.triggerTitle}>
                {currentArticle ? currentArticle.title : 'Select Article'}
              </span>
            </div>
            <Badge size="xs" variant="light" color="primary">
              Menu
            </Badge>
          </button>

          {/* Quick prev/next navigation bar */}
          <div className={classes.quickNavActions}>
            <Tooltip label={prevArticle ? `Previous: ${prevArticle.title}` : 'First article'}>
              <ActionIcon
                variant="subtle"
                color="gray"
                size="md"
                disabled={!prevArticle}
                onClick={() => prevArticle && onSectionChange(prevArticle.id)}
                aria-label="Previous documentation article"
              >
                <IconChevronLeft size={18} />
              </ActionIcon>
            </Tooltip>

            <span className={classes.counterBadge}>
              {currentIndex >= 0 ? `${currentIndex + 1}/${articles.length}` : ''}
            </span>

            <Tooltip label={nextArticle ? `Next: ${nextArticle.title}` : 'Last article'}>
              <ActionIcon
                variant="subtle"
                color="gray"
                size="md"
                disabled={!nextArticle}
                onClick={() => nextArticle && onSectionChange(nextArticle.id)}
                aria-label="Next documentation article"
              >
                <IconChevronRight size={18} />
              </ActionIcon>
            </Tooltip>
          </div>
        </div>
      </Box>

      {/* Slide-out Documentation Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        position="left"
        size="320px"
        zIndex={1000000}
        hiddenFrom="md"
        title={
          <Group gap="xs">
            <IconBook size={18} style={{ color: 'var(--mantine-color-primary-6)' }} />
            <Text fw={700} size="sm">
              Documentation
            </Text>
            <Badge size="xs" variant="light" color="primary">
              {articles.length} {articles.length === 1 ? 'doc' : 'docs'}
            </Badge>
          </Group>
        }
      >
        <div className={classes.drawerSearch}>
          <TextInput
            placeholder="Search articles..."
            size="sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            leftSection={<IconSearch size={16} stroke={1.8} />}
            rightSection={
              searchQuery ? (
                <ActionIcon
                  size="sm"
                  variant="subtle"
                  color="gray"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                >
                  <IconX size={14} />
                </ActionIcon>
              ) : null
            }
          />
        </div>

        <div className={classes.drawerScroll}>
          {categoryEntries.length === 0 ? (
            <div className={classes.drawerEmpty}>
              <IconArticleOff size={32} stroke={1.5} opacity={0.6} />
              <Text size="sm" fw={500}>
                No articles match "{searchQuery}"
              </Text>
              <Button
                size="xs"
                variant="light"
                color="primary"
                onClick={handleClearSearch}
              >
                Clear filter
              </Button>
            </div>
          ) : (
            categoryEntries.map(([category, categoryArticles]) => (
              <div key={category} className={classes.drawerCategory}>
                <div className={classes.drawerCategoryTitle}>
                  <span className={classes.drawerCategoryLabel}>
                    {getCategoryIcon(category, 13)}
                    {category}
                  </span>
                  <Badge size="xs" variant="outline" color="gray">
                    {categoryArticles.length}
                  </Badge>
                </div>

                {categoryArticles.map((article) => {
                  const isActive = activeSection === article.id;
                  return (
                    <button
                      key={article.id}
                      type="button"
                      className={classes.drawerItem}
                      data-active={isActive ? 'true' : undefined}
                      onClick={() => handleSelect(article.id)}
                    >
                      <div className={classes.drawerItemLeft}>
                        <span className={classes.drawerItemIcon}>
                          {getArticleIcon(article.id, article.category, 16)}
                        </span>
                        <span className={classes.drawerItemText}>
                          {article.title}
                        </span>
                      </div>
                      {isActive && (
                        <IconCheck
                          size={16}
                          style={{
                            color: 'var(--mantine-color-primary-6)',
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className={classes.drawerFooter}>
          <Button fullWidth variant="light" color="gray" size="sm" onClick={close}>
            Close Menu
          </Button>
        </div>
      </Drawer>
    </>
  );
}
