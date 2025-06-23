import { ActionIcon, useMantineColorScheme, Tooltip } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tooltip 
      label={isDark ? 'Switch to light mode' : 'Switch to dark mode'} 
      position="bottom"
      withArrow
    >
      <ActionIcon
        onClick={() => toggleColorScheme()}
        variant="subtle"
        size="lg"
        aria-label="Toggle color scheme"
        style={{
          transition: 'all 0.2s ease',
        }}
      >
        {isDark ? (
          <IconSun 
            size={20} 
            stroke={1.5}
            style={{ 
              color: 'var(--mantine-color-yellow-4)',
              transition: 'transform 0.2s ease',
            }}
          />
        ) : (
          <IconMoon 
            size={20} 
            stroke={1.5}
            style={{ 
              color: 'var(--mantine-color-blue-6)',
              transition: 'transform 0.2s ease',
            }}
          />
        )}
      </ActionIcon>
    </Tooltip>
  );
}