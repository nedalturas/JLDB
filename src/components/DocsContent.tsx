import { useMemo } from 'react';
import {
  Text,
  Alert,
  Loader,
  Stack,
  Badge,
  Group,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconArrowRight,
  IconClock,
  IconChevronRight,
  IconInfoCircle,
} from '@tabler/icons-react';
import { useMarkdownDocs, DocArticle } from '../hooks/useMarkdownDocs';
import { MarkdownRenderer } from './MarkdownRenderer';
import { calculateReadTime, getArticleIcon } from '../utils/docsIcons';
import classes from './DocsContent.module.css';

interface DocsContentProps {
  articles?: DocArticle[];
  loading?: boolean;
  error?: string | null;
  activeSection: string;
  onSectionChange?: (sectionId: string) => void;
}

export function DocsContent({
  articles: propArticles,
  loading: propLoading,
  error: propError,
  activeSection,
  onSectionChange,
}: DocsContentProps) {
  const fallbackDocs = useMarkdownDocs();
  const articles = propArticles ?? fallbackDocs.articles;
  const loading = propLoading ?? fallbackDocs.loading;
  const error = propError ?? fallbackDocs.error;

  const currentIndex = useMemo(() => {
    return articles.findIndex((article) => article.id === activeSection);
  }, [articles, activeSection]);

  const currentArticle = articles[currentIndex] || articles.find((a) => a.id === activeSection);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex >= 0 && currentIndex < articles.length - 1
      ? articles[currentIndex + 1]
      : null;

  const readTime = useMemo(() => {
    return currentArticle ? calculateReadTime(currentArticle.content) : 1;
  }, [currentArticle]);

  if (loading) {
    return (
      <div className={classes.contentCard}>
        <Stack align="center" justify="center" py={80} gap="md">
          <Loader size="lg" />
          <Text c="dimmed">Loading documentation...</Text>
        </Stack>
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.contentCard}>
        <Alert color="red" title="Error loading documentation">
          {error}
        </Alert>
      </div>
    );
  }

  if (!currentArticle) {
    return (
      <div className={classes.contentCard}>
        <Alert
          color="yellow"
          title="Article not found"
          icon={<IconInfoCircle size={20} />}
        >
          The requested documentation article could not be found. Please select an
          article from the navigation sidebar.
        </Alert>
      </div>
    );
  }

  return (
    <article className={classes.contentCard} aria-label={currentArticle.title}>
      {/* Top Breadcrumbs and Meta */}
      <div className={classes.articleMetaBar}>
        <div className={classes.breadcrumbRow}>
          <Text size="xs" fw={500} c="dimmed">
            Docs
          </Text>
          <IconChevronRight size={12} style={{ opacity: 0.6 }} />
          <Badge size="xs" variant="light" color="primary">
            {currentArticle.category || 'General'}
          </Badge>
          <IconChevronRight size={12} style={{ opacity: 0.6 }} />
          <Text size="xs" fw={600} truncate maw={240}>
            {currentArticle.title}
          </Text>
        </div>

        <div className={classes.metaPills}>
          <Group gap={4}>
            <IconClock size={13} style={{ opacity: 0.6 }} />
            <Text size="xs" c="dimmed">
              {readTime} min read
            </Text>
          </Group>
        </div>
      </div>

      {/* Main Markdown Content */}
      <MarkdownRenderer content={currentArticle.content} />

      {/* Bottom Next / Previous Article Navigation */}
      {(prevArticle || nextArticle) && (
        <div className={classes.articleFooter}>
          <div className={classes.navCardsGrid}>
            {prevArticle ? (
              <button
                type="button"
                className={classes.navCard}
                onClick={() => onSectionChange?.(prevArticle.id)}
                aria-label={`Previous article: ${prevArticle.title}`}
              >
                <div className={classes.navCardSub}>
                  <IconArrowLeft size={13} />
                  <span>Previous</span>
                </div>
                <div className={classes.navCardTitle}>
                  {getArticleIcon(prevArticle.id, prevArticle.category, 16)}
                  <span>{prevArticle.title}</span>
                </div>
              </button>
            ) : (
              <div /> /* Empty placeholder for 2-column grid alignment */
            )}

            {nextArticle && (
              <button
                type="button"
                className={`${classes.navCard} ${classes.navCardRight} ${
                  !prevArticle ? classes.navCardOnlyRight : ''
                }`}
                onClick={() => onSectionChange?.(nextArticle.id)}
                aria-label={`Next article: ${nextArticle.title}`}
              >
                <div className={classes.navCardSub}>
                  <span>Next</span>
                  <IconArrowRight size={13} />
                </div>
                <div className={classes.navCardTitle}>
                  <span>{nextArticle.title}</span>
                  {getArticleIcon(nextArticle.id, nextArticle.category, 16)}
                </div>
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  );
}