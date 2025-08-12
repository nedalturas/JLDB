import { Paper, Button, Drawer, Text } from '@mantine/core';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { IconMenu2, IconTool, IconList } from '@tabler/icons-react';
import classes from './ToolsSidebar.module.css';

interface Tool {
  id: string;
  title: string;
  category: string;
  description?: string;
}

interface ToolsSidebarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

const tools: Tool[] = [
  {
    id: 'calculator',
    title: 'Service Calculator',
    category: 'Utilities',
    description: 'Calculate service costs and estimates'
  },
  {
    id: 'converter',
    title: 'Unit Converter',
    category: 'Utilities',
    description: 'Convert between different units'
  },
  {
    id: 'qr-generator',
    title: 'QR Code Generator',
    category: 'Generators',
    description: 'Generate QR codes for WhatsApp links'
  },
  {
    id: 'link-shortener',
    title: 'Link Shortener',
    category: 'Generators',
    description: 'Shorten long URLs'
  },
  {
    id: 'text-formatter',
    title: 'Text Formatter',
    category: 'Text Tools',
    description: 'Format and clean text content'
  },
  {
    id: 'markdown-preview',
    title: 'Markdown Preview',
    category: 'Text Tools',
    description: 'Preview markdown content'
  },
  {
    id: 'color-picker',
    title: 'Color Picker',
    category: 'Design',
    description: 'Pick and convert colors'
  },
  {
    id: 'image-optimizer',
    title: 'Image Optimizer',
    category: 'Design',
    description: 'Optimize images for web'
  }
];

export function ToolsSidebar({ activeSection, onSectionChange }: ToolsSidebarProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);

  // Group tools by category
  const groupedTools = tools.reduce((acc, tool) => {
    const category = tool.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tool);
    return acc;
  }, {} as Record<string, Tool[]>);

  // Get current tool title for mobile button
  const currentTool = tools.find(tool => tool.id === activeSection);

  const handleSectionChange = (sectionId: string) => {
    onSectionChange(sectionId);
    if (isMobile) {
      close();
    }
  };

  const renderDesktopMenu = () => {
    return (
      <div>
        <div className={classes.tocHeader}>
          <IconList size={16} className={classes.tocIcon} />
          Available Tools
        </div>
        
        {Object.entries(groupedTools).map(([category, categoryTools]) => (
          <div key={category} className={classes.categorySection}>
            {Object.keys(groupedTools).length > 1 && (
              <div className={classes.categoryTitle}>
                {category}
              </div>
            )}
            {categoryTools.map((tool) => (
              <div
                key={tool.id}
                className={classes.navLink}
                data-active={activeSection === tool.id || undefined}
                onClick={() => handleSectionChange(tool.id)}
              >
                {tool.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderMobileMenu = () => {
    return (
      <div className={classes.drawerContent}>
        {Object.entries(groupedTools).map(([category, categoryTools]) => (
          <div key={category}>
            {Object.keys(groupedTools).length > 1 && (
              <div className={classes.drawerCategoryTitle}>
                {category}
              </div>
            )}
            {categoryTools.map((tool) => (
              <div
                key={tool.id}
                className={classes.drawerNavLink}
                data-active={activeSection === tool.id || undefined}
                onClick={() => handleSectionChange(tool.id)}
              >
                {tool.title}
              </div>
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
            rightSection={<IconTool size={16} />}
          >
            <Text truncate>
              {currentTool ? currentTool.title : 'Select Tool'}
            </Text>
          </Button>
        </Paper>

        <Drawer
          opened={opened}
          onClose={close}
          title={
            <div className={classes.tocHeader}>
              <IconList size={16} className={classes.tocIcon} />
              Available Tools
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