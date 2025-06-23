import { Paper, Button, Drawer, Text } from '@mantine/core';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { IconMenu2, IconBook, IconList } from '@tabler/icons-react';
import { useMarkdownDocs } from '../hooks/useMarkdownDocs';
import classes from './DocsSidebar.module.css';

interface DocsSidebarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export function DocsSidebar({ activeSection, onSectionChange }: DocsSidebarProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
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

  // Get current article title for mobile button
  const currentArticle = articles.find(article => article.id === activeSection);

  const handleSectionChange = (sectionId: string) => {
    onSectionChange(sectionId);
    if (isMobile) {
      close();
    }
  };

  const renderDesktopMenu = () => {
    if (loading) {
      return (
        <div style={{ padding: '16px' }}>
          <Text size="sm" c="dimmed">Loading menu...</Text>
        </div>
      );
    }

    return (
      <div>
        <div className={classes.tocHeader}>
          <IconList size={16} className={classes.tocIcon} />
          Table of contents
        </div>
        
        {Object.entries(groupedArticles).map(([category, categoryArticles]) => (
          <div key={category} className={classes.categorySection}>
            {Object.keys(groupedArticles).length > 1 && (
              <div className={classes.categoryTitle}>
                {category}
              </div>
            )}
            {categoryArticles.map((article) => (
              <a
                key={article.id}
                href="#"
                className={classes.navLink}
                data-active={activeSection === article.id || undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleSectionChange(article.id);
                }}
              >
                {article.title}
              </a>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderMobileMenu = () => {
    if (loading) {
      return (
        <div style={{ padding: '16px' }}>
          <Text size="sm" c="dimmed">Loading menu...</Text>
        </div>
      );
    }

    return (
      <div className={classes.drawerContent}>
        {Object.entries(groupedArticles).map(([category, categoryArticles]) => (
          <div key={category}>
            {Object.keys(groupedArticles).length > 1 && (
              <div className={classes.drawerCategoryTitle}>
                {category}
              </div>
            )}
            {categoryArticles.map((article) => (
              <a
                key={article.id}
                href="#"
                className={classes.drawerNavLink}
                data-active={activeSection === article.id || undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleSectionChange(article.id);
                }}
              >
                {article.title}
              </a>
            ))}
          </div>
        ))}
      </div>
    );
  };

  if (isMobile) {
    return (
      <>
        <Paper shadow="sm" p="md" mb="xl" radius="md">
          <Button
            variant="light"
            leftSection={<IconMenu2 size={18} />}
            onClick={open}
            fullWidth
            justify="space-between"
            rightSection={<IconBook size={16} />}
          >
            <Text truncate>
              {currentArticle ? currentArticle.title : 'Select Documentation'}
            </Text>
          </Button>
        </Paper>

        <Drawer
          opened={opened}
          onClose={close}
          title={
            <div className={classes.tocHeader}>
              <IconList size={16} className={classes.tocIcon} />
              Table of contents
            </div>
          }
          size="sm"
          position="left"
          zIndex={1000000}
        >
          {renderMobileMenu()}
        </Drawer>
      </>
    );
  }

  return (
    <Paper shadow="sm" radius="md" className={classes.sidebar}>
      {renderDesktopMenu()}
    </Paper>
  );
}