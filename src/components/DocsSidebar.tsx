import { Stack, NavLink, Paper, Button, Drawer, Badge, Text } from '@mantine/core';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { IconMenu2, IconBook } from '@tabler/icons-react';
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

  const renderMenuContent = () => {
    if (loading) {
      return (
        <div>Loading menu...</div>
      );
    }

    return (
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
                  onClick={() => handleSectionChange(article.id)}
                  className={classes.navLink}
                />
              ))}
            </Stack>
          </div>
        ))}
      </Stack>
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
            <Text fw={600} size="lg">
              Documentation
            </Text>
          }
          size="sm"
          position="left"
          zIndex={1000000}
        >
          <Paper p="sm">
            {renderMenuContent()}
          </Paper>
        </Drawer>
      </>
    );
  }

  return (
    <Paper shadow="sm" p="md" radius="md" className={classes.sidebar}>
      {renderMenuContent()}
    </Paper>
  );
}