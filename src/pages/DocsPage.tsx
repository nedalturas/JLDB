import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, Container, ActionIcon, Transition, Affix, Tooltip } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconArrowUp } from '@tabler/icons-react';
import { DocsSidebar } from '../components/DocsSidebar';
import { DocsMobileNav } from '../components/DocsMobileNav';
import { DocsContent } from '../components/DocsContent';
import { AdminButton } from '../components/AdminButton';
import { useMarkdownDocs } from '../hooks/useMarkdownDocs';

function DocsPage() {
  const { articles, loading, error } = useMarkdownDocs();
  const [searchParams, setSearchParams] = useSearchParams();
  const [scroll, scrollTo] = useWindowScroll();

  const docParam = searchParams.get('doc');
  const [activeSection, setActiveSection] = useState(docParam || '');

  // Initialize or synchronize active section with URL query param
  useEffect(() => {
    if (!loading && articles.length > 0) {
      if (docParam && articles.some((a) => a.id === docParam)) {
        setActiveSection(docParam);
      } else {
        // If no doc in URL or doc not found, default to first article
        const firstId = articles[0].id;
        setActiveSection(firstId);
        setSearchParams({ doc: firstId }, { replace: true });
      }
    }
  }, [articles, loading, docParam, setSearchParams]);

  const handleSectionChange = useCallback(
    (sectionId: string) => {
      setActiveSection(sectionId);
      setSearchParams({ doc: sectionId });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [setSearchParams]
  );

  return (
    <>
      {/* Sticky Mobile Navigation Header & Drawer (hidden on desktop) */}
      <DocsMobileNav
        articles={articles}
        loading={loading}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      <Container size="xl" py={{ base: 'md', md: 'xl' }}>
        <Grid gutter={{ base: 'md', md: 'xl' }}>
          {/* Desktop Navigation Sidebar (hidden on mobile) */}
          <Grid.Col span={{ base: 12, md: 3.5, lg: 3 }} visibleFrom="md">
            <DocsSidebar
              articles={articles}
              loading={loading}
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
            />
          </Grid.Col>

          {/* Main Documentation Content (full width on mobile, right column on desktop) */}
          <Grid.Col span={{ base: 12, md: 8.5, lg: 9 }}>
            <DocsContent
              articles={articles}
              loading={loading}
              error={error}
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
            />
          </Grid.Col>
        </Grid>
      </Container>

      {/* Floating Scroll-to-Top Button */}
      <Affix position={{ bottom: 76, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 280}>
          {(transitionStyles) => (
            <Tooltip label="Back to top" position="left" withArrow>
              <ActionIcon
                style={{ ...transitionStyles, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
                size="lg"
                radius="xl"
                variant="filled"
                color="primary"
                onClick={() => scrollTo({ y: 0 })}
                aria-label="Scroll to top of documentation"
              >
                <IconArrowUp size={18} />
              </ActionIcon>
            </Tooltip>
          )}
        </Transition>
      </Affix>

      <AdminButton />
    </>
  );
}

export default DocsPage;