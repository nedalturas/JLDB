import { Burger, Container, Group, Text, Drawer, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import classes from './HeaderSimple.module.css';

const links = [
  { link: '/', label: 'Database' },
  { link: '/docs', label: 'Docs' },
  { link: '/tools', label: 'Tools' },
];

export function HeaderSimple() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const location = useLocation();

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.link}
      data-active={location.pathname === link.link || undefined}
      onClick={close}
    >
      {link.label}
    </Link>
  ));

  const mobileItems = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.mobileLink}
      data-active={location.pathname === link.link || undefined}
      onClick={close}
    >
      {link.label}
    </Link>
  ));

  return (
    <>
      <header className={classes.header}>
        <Container size="md" className={classes.inner}>
          <Link to="/" className={classes.logo}>
            <Text fw={700} size="lg" component="span">JLDB</Text>
          </Link>
          
          <Group gap="sm">
            <Group gap={5} visibleFrom="xs">
              {items}
            </Group>
            <ThemeToggle />
            <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          </Group>
        </Container>
      </header>

      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Group justify="space-between" style={{ width: '100%' }}>
            <Link to="/" className={classes.logo} onClick={close}>
              <Text fw={700} size="lg" component="span">JLDB</Text>
            </Link>
            <ThemeToggle />
          </Group>
        }
        hiddenFrom="xs"
        zIndex={1000000}
      >
        <Stack gap="md">
          {mobileItems}
        </Stack>
      </Drawer>
    </>
  );
}