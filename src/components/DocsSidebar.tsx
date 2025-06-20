import { useState } from 'react';
import { Stack, NavLink, Paper, Select } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classes from './DocsSidebar.module.css';

export interface DocSection {
  id: string;
  title: string;
  icon?: string;
}

interface DocsSidebarProps {
  sections: DocSection[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export function DocsSidebar({ sections, activeSection, onSectionChange }: DocsSidebarProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return (
      <Paper shadow="sm" p="md" mb="xl" radius="md">
        <Select
          label="Navigate to section"
          placeholder="Choose a documentation section"
          data={sections.map(section => ({
            value: section.id,
            label: section.title
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
      <Stack gap="xs">
        {sections.map((section) => (
          <NavLink
            key={section.id}
            label={section.title}
            active={activeSection === section.id}
            onClick={() => onSectionChange(section.id)}
            className={classes.navLink}
          />
        ))}
      </Stack>
    </Paper>
  );
}